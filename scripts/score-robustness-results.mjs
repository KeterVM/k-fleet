import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  blindCases,
  blindRubric,
  canonicalJson,
  expectedSkills,
  protocolVersion,
  skillSourceHash,
} from "./eval-corpus-support.mjs";
import {
  fixtureBindingInstruction,
  fixtureBindingHash,
  evaluationToolFiles,
  hashCanonical,
  highRiskCaseRefs,
  judgeProtocol,
  judgeToolingHash,
  robustnessToolingHash,
  scoringToolingHash,
} from "./robustness-eval-support.mjs";

const scriptPath = fileURLToPath(import.meta.url);
const root = resolve(dirname(scriptPath), "..");
const defaultResultsPath = join(root, "evals", "robustness-current-results.json");
const corpusPath = join(root, "evals", "robustness-routing.jsonl");
const candidatePath = join(root, "evals", "catalog-description-candidate.json");
const defaultReportPath = join(root, "evals", "ROUTING_ROBUSTNESS_MATRIX_REPORT.md");
const catalogArmIds = ["arm-onyx", "arm-ivory"];

const runPlan = [
  { runId: "v2r001", scope: "full", model: "gpt-5.6-sol", reasoningConfig: "xhigh" },
  { runId: "v2r002", scope: "full", model: "gpt-5.6-terra", reasoningConfig: "medium" },
  { runId: "v2r003", scope: "full", model: "gpt-5.6-luna", reasoningConfig: "medium" },
  { runId: "v2r007", scope: "high-risk-repeat", model: "gpt-5.6-sol", reasoningConfig: "xhigh" },
  { runId: "v2r010", scope: "high-risk-repeat", model: "gpt-5.6-sol", reasoningConfig: "xhigh" },
  { runId: "v2r008", scope: "high-risk-repeat", model: "gpt-5.6-terra", reasoningConfig: "medium" },
  { runId: "v2r011", scope: "high-risk-repeat", model: "gpt-5.6-terra", reasoningConfig: "medium" },
  { runId: "v2r009", scope: "high-risk-repeat", model: "gpt-5.6-luna", reasoningConfig: "medium" },
  { runId: "v2r012", scope: "high-risk-repeat", model: "gpt-5.6-luna", reasoningConfig: "medium" },
  { runId: "v2r004", scope: "full", model: "gpt-5.6-sol", reasoningConfig: "xhigh" },
  { runId: "v2r005", scope: "full", model: "gpt-5.6-terra", reasoningConfig: "medium" },
  { runId: "v2r006", scope: "full", model: "gpt-5.6-luna", reasoningConfig: "medium" },
  { runId: "v2r013", scope: "high-risk-repeat", model: "gpt-5.6-sol", reasoningConfig: "xhigh" },
  { runId: "v2r016", scope: "high-risk-repeat", model: "gpt-5.6-sol", reasoningConfig: "xhigh" },
  { runId: "v2r014", scope: "high-risk-repeat", model: "gpt-5.6-terra", reasoningConfig: "medium" },
  { runId: "v2r017", scope: "high-risk-repeat", model: "gpt-5.6-terra", reasoningConfig: "medium" },
  { runId: "v2r015", scope: "high-risk-repeat", model: "gpt-5.6-luna", reasoningConfig: "medium" },
  { runId: "v2r018", scope: "high-risk-repeat", model: "gpt-5.6-luna", reasoningConfig: "medium" },
];

const judgePlan = [
  {
    judgeRunId: "j-sol-evaluators",
    model: "gpt-5.6-terra",
    reasoningConfig: "high",
    evaluatorModel: "gpt-5.6-sol",
  },
  {
    judgeRunId: "j-terra-evaluators",
    model: "gpt-5.6-sol",
    reasoningConfig: "xhigh",
    evaluatorModel: "gpt-5.6-terra",
  },
  {
    judgeRunId: "j-luna-evaluators",
    model: "gpt-5.6-sol",
    reasoningConfig: "xhigh",
    evaluatorModel: "gpt-5.6-luna",
  },
];

const excludedPlan = [];

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function readJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

function readJsonl(path) {
  return readFileSync(path, "utf8")
    .split("\n")
    .filter((line) => line.trim())
    .map((line) => JSON.parse(line));
}

function fileHash(path) {
  return sha256(readFileSync(path));
}

function contentHash(value) {
  return sha256(canonicalJson(value));
}

function gitFile(commit, path) {
  return execFileSync("git", ["show", `${commit}:${path}`], { cwd: root });
}

function evaluationToolingHashAtCommit(commit) {
  const hash = createHash("sha256");
  for (const file of evaluationToolFiles) {
    hash.update(`${file}\0`);
    hash.update(gitFile(commit, `scripts/${file}`));
    hash.update("\0");
  }
  return hash.digest("hex");
}

function skillSourceHashAtCommit(commit) {
  const hash = createHash("sha256");
  for (const skill of expectedSkills) {
    const prefix = `skills/${skill}/`;
    const files = execFileSync("git", ["ls-tree", "-r", "--name-only", commit, "--", `skills/${skill}`], {
      cwd: root,
      encoding: "utf8",
    }).split("\n").filter(Boolean).sort();
    for (const file of files) {
      hash.update(`${file.slice(prefix.length)}\0`.replace(/^/, `${skill}/`));
      hash.update(gitFile(commit, file).toString("utf8"));
      hash.update("\0");
    }
  }
  for (const file of ["kf-context-auditor.toml", "kf-reviewer.toml"]) {
    hash.update(`.codex/agents/${file}\0`);
    hash.update(gitFile(commit, `.codex/agents/${file}`).toString("utf8"));
    hash.update("\0");
  }
  return hash.digest("hex");
}

function phaseSequence(sequence) {
  return (sequence ?? []).filter((value, index, values) => index === 0 || value !== values[index - 1]);
}

function sameArray(left, right) {
  return canonicalJson(left) === canonicalJson(right);
}

function caseRef(index) {
  return `case-${String(index + 1).padStart(3, "0")}`;
}

function expectedCases() {
  return readJsonl(corpusPath).map((entry, index) => ({
    ...entry,
    caseRef: caseRef(index),
  }));
}

function buildJudgeInput(runs, evaluatorModel) {
  const casesByRef = new Map(expectedCases().map((entry) => [entry.caseRef, entry]));
  const observations = runs
    .filter((run) => run.data.model === evaluatorModel)
    .flatMap((run) => run.data.observations.map((observation) => ({
      runId: run.runId,
      observationContentHash: hashCanonical(observation),
      observation,
    })));
  const caseRefs = [...new Set(observations.map((entry) => entry.observation.caseRef))];
  const expectations = caseRefs.map((caseReference) => {
    const entry = casesByRef.get(caseReference);
    return {
      caseRef: caseReference,
      mustStopWhen: entry.expected.mustStopWhen,
      invariants: entry.expected.invariants,
    };
  });
  const bindings = {
    evaluatorModel,
    judgeProtocolHash: hashCanonical(judgeProtocol),
    judgeToolingHash: judgeToolingHash(root),
    observationSetHash: hashCanonical(observations),
    expectedSetHash: hashCanonical(expectations),
  };
  return {
    suite: "routing-robustness-judge-v1",
    protocolVersion,
    judgeInputHash: hashCanonical({
      protocolVersion,
      judgeProtocol,
      ...bindings,
      observations,
      expectations,
    }),
    ...bindings,
    judgeProtocol,
    observations,
    expectations,
  };
}

function catalogState() {
  const candidate = readJson(candidatePath);
  const currentDescriptions = {};
  for (const skill of Object.keys(candidate.descriptions).sort()) {
    const source = readFileSync(join(root, "skills", skill, "SKILL.md"), "utf8");
    const description = source.match(/^description:\s*(.+)$/m)?.[1];
    if (!description) throw new Error(`Missing description for ${skill}`);
    currentDescriptions[skill] = description;
  }
  const current = Object.values(currentDescriptions).reduce((sum, value) => sum + value.length, 0);
  const compact = Object.values(candidate.descriptions).reduce((sum, value) => sum + value.length, 0);
  return {
    characters: {
      current,
      candidate: compact,
      reductionCharacters: current - compact,
      reductionRatio: (current - compact) / current,
    },
    hashes: {
      current: contentHash(currentDescriptions),
      candidate: contentHash(candidate.descriptions),
    },
  };
}

function scoreMatrix(runs, judgeRuns) {
  const cases = new Map(expectedCases().map((entry) => [entry.caseRef, entry]));
  const judgments = new Map();
  for (const judgeRun of judgeRuns) {
    for (const judgment of judgeRun.data.judgments) {
      judgments.set(`${judgment.runId}\0${judgment.caseRef}`, judgment);
    }
  }

  const createScore = () => ({
    observations: 0,
    primaryPass: 0,
    composedPass: 0,
    sequencePass: 0,
    forbiddenPass: 0,
    exactSelectionPass: 0,
    stoppingPass: 0,
    invariantPass: 0,
    invariantTotal: 0,
    contractPass: 0,
  });
  const scores = {};
  const failures = [];

  for (const run of runs) {
    const armScore = scores[run.arm] ??= { overall: createScore(), byModel: {}, byScope: {} };
    const modelScore = armScore.byModel[run.data.model] ??= createScore();
    const scopeScore = armScore.byScope[run.scope] ??= createScore();
    for (const observation of run.data.observations) {
      const entry = cases.get(observation.caseRef);
      const expected = entry.expected;
      const observedSkills = new Set([
        observation.observedPrimary,
        ...(observation.observedComposed ?? []),
        ...(observation.observedSequence ?? []),
      ]);
      const checks = {
        primary: observation.observedPrimary === expected.primary,
        composed: sameArray(observation.observedComposed, expected.composed),
        sequence: sameArray(phaseSequence(observation.observedSequence), expected.sequence),
        forbidden: expected.forbidden.every((skill) => !observedSkills.has(skill)),
      };
      const exactSelection = Object.values(checks).every(Boolean);
      const judgment = judgments.get(`${run.data.runId}\0${observation.caseRef}`);
      const invariantFailures = judgment.invariants
        .filter((invariant) => !invariant.pass)
        .map((invariant) => invariant.index);
      const contractPass = exactSelection && judgment.stoppingPass && invariantFailures.length === 0;

      for (const score of [armScore.overall, modelScore, scopeScore]) {
        score.observations += 1;
        score.primaryPass += Number(checks.primary);
        score.composedPass += Number(checks.composed);
        score.sequencePass += Number(checks.sequence);
        score.forbiddenPass += Number(checks.forbidden);
        score.exactSelectionPass += Number(exactSelection);
        score.stoppingPass += Number(judgment.stoppingPass);
        score.invariantPass += judgment.invariants.filter((invariant) => invariant.pass).length;
        score.invariantTotal += judgment.invariants.length;
        score.contractPass += Number(contractPass);
      }

      if (!contractPass) {
        failures.push({
          arm: run.arm,
          runId: run.data.runId,
          model: run.data.model,
          caseRef: observation.caseRef,
          selectionFailures: Object.entries(checks)
            .filter(([, pass]) => !pass)
            .map(([name]) => name),
          stoppingPass: judgment.stoppingPass,
          invariantFailures,
        });
      }
    }
  }
  return { scores, failures };
}

function resultHash(result) {
  const clone = structuredClone(result);
  delete clone.resultHash;
  return contentHash(clone);
}

function catalogEntry(result, variant) {
  const match = Object.entries(result.catalogs).find(([, catalog]) => catalog.revealedVariant === variant);
  if (!match) throw new Error(`Missing ${variant} catalog arm`);
  return { arm: match[0], catalog: match[1], score: result.scores[match[0]] };
}

function promotionDecision(result) {
  const current = catalogEntry(result, "current").score;
  const candidate = catalogEntry(result, "candidate").score;
  const reductionPass = result.catalogCharacters.reductionRatio >= 0.3;
  const selectionFields = ["primaryPass", "composedPass", "sequencePass", "forbiddenPass", "exactSelectionPass"];
  const selectionNoRegression = selectionFields.every((field) =>
    candidate.overall[field] >= current.overall[field]);
  const currentInvariantRate = current.overall.invariantPass / current.overall.invariantTotal;
  const candidateInvariantRate = candidate.overall.invariantPass / candidate.overall.invariantTotal;
  const naturalisticStabilityPass = candidate.overall.stoppingPass >= current.overall.stoppingPass
    && candidateInvariantRate >= currentInvariantRate;
  const highRisk = candidate.byScope["high-risk-repeat"];
  const highRiskPass = highRisk.contractPass === highRisk.observations;
  const canonicalAblationEligible = reductionPass
    && selectionNoRegression
    && naturalisticStabilityPass
    && highRiskPass;
  const reasons = [];
  if (!reductionPass) reasons.push("catalog-reduction-below-30-percent");
  if (!selectionNoRegression) reasons.push("naturalistic-selection-regression");
  if (!naturalisticStabilityPass) reasons.push("naturalistic-stopping-or-invariant-regression");
  if (!highRiskPass) reasons.push("high-risk-repeat-contract-failures");
  if (canonicalAblationEligible) reasons.push("canonical-56-case-ablation-not-run");
  return {
    status: canonicalAblationEligible
      ? "candidate-qualified-for-canonical-ablation"
      : "candidate-not-promoted",
    canonicalAblationEligible,
    reductionPass,
    selectionNoRegression,
    naturalisticStabilityPass,
    highRiskPass,
    reasons,
  };
}

function fraction(value, total) {
  return `${value}/${total}`;
}

function renderReport(result) {
  const current = catalogEntry(result, "current");
  const candidate = catalogEntry(result, "candidate");
  const rows = [];
  for (const entry of [current, candidate]) {
    for (const [model, score] of Object.entries(entry.score.byModel)) {
      rows.push(`| ${entry.catalog.revealedVariant} | \`${model}\` | ${score.observations} | ${score.primaryPass} | ${score.composedPass} | ${score.sequencePass} | ${score.forbiddenPass} | ${score.exactSelectionPass} | ${fraction(score.stoppingPass, score.observations)} | ${fraction(score.invariantPass, score.invariantTotal)} | ${fraction(score.contractPass, score.observations)} |`);
    }
  }
  const scopeRows = [];
  for (const entry of [current, candidate]) {
    for (const [scope, score] of Object.entries(entry.score.byScope)) {
      scopeRows.push(`| ${entry.catalog.revealedVariant} | ${scope} | ${fraction(score.exactSelectionPass, score.observations)} | ${fraction(score.stoppingPass, score.observations)} | ${fraction(score.invariantPass, score.invariantTotal)} | ${fraction(score.contractPass, score.observations)} |`);
    }
  }
  const validObservations = result.runs.reduce((sum, run) => sum + run.data.observations.length, 0);
  const judgments = result.judgeRuns.reduce((sum, run) => sum + run.data.judgments.length, 0);
  const invariantJudgments = result.judgeRuns.reduce((sum, run) =>
    sum + run.data.judgments.reduce((inner, judgment) => inner + judgment.invariants.length, 0), 0);
  const excludedLines = result.excludedRuns.length
    ? result.excludedRuns.map((run) => `- \`${run.runId}\`: ${run.reason}; replaced by \`${run.replacementRunId}\`.`).join("\n")
    : "- No evaluator run was excluded from this matrix.";
  return `# Routing Robustness Matrix Report

Status: ${result.decision.status}

Date: ${result.evaluationDate}

Protocol: \`${result.suite}\`, eval protocol version ${result.protocolVersion}

Repository base: \`${result.repositoryBaseHash}\`

## Decision

The compact catalog candidate remains unpromoted. Canonical ablation eligibility:
\`${result.decision.canonicalAblationEligible}\`. Machine-evaluated reasons:
${result.decision.reasons.map((reason) => `\`${reason}\``).join(", ")}.

The candidate reduces the eleven always-loaded descriptions from
${result.catalogCharacters.current.toLocaleString("en-US")} to
${result.catalogCharacters.candidate.toLocaleString("en-US")} characters
(${(result.catalogCharacters.reductionRatio * 100).toFixed(1)}%). The canonical
56-case catalog ablation and cross-language artifact-quality track were not run.

## Execution

Two anonymously bound catalog fixtures received identical full and high-risk
inputs. Three model configurations each ran one 24-case full pass and two
independent eight-case high-risk repeats per arm. The matrix contains
${result.runs.length} valid evaluator runs, ${validObservations} observations,
${judgments} separately bound stopping judgments, and ${invariantJudgments}
per-invariant judgments. Every judge used a different model family from the
evaluator observations it scored.

Excluded attempts:

${excludedLines}

## Results

Exact selection requires primary, composed methods, normalized sequence, and
forbidden-skill exclusion to pass. Contract pass additionally requires the bound
post-hoc stopping judgment and every invariant to pass.

| Catalog | Model | Obs. | Primary | Composed | Sequence | Forbidden | Exact | Stopping | Invariants | Contract |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
${rows.join("\n")}
| **current total** |  | **${current.score.overall.observations}** | **${current.score.overall.primaryPass}** | **${current.score.overall.composedPass}** | **${current.score.overall.sequencePass}** | **${current.score.overall.forbiddenPass}** | **${current.score.overall.exactSelectionPass}** | **${fraction(current.score.overall.stoppingPass, current.score.overall.observations)}** | **${fraction(current.score.overall.invariantPass, current.score.overall.invariantTotal)}** | **${fraction(current.score.overall.contractPass, current.score.overall.observations)}** |
| **candidate total** |  | **${candidate.score.overall.observations}** | **${candidate.score.overall.primaryPass}** | **${candidate.score.overall.composedPass}** | **${candidate.score.overall.sequencePass}** | **${candidate.score.overall.forbiddenPass}** | **${candidate.score.overall.exactSelectionPass}** | **${fraction(candidate.score.overall.stoppingPass, candidate.score.overall.observations)}** | **${fraction(candidate.score.overall.invariantPass, candidate.score.overall.invariantTotal)}** | **${fraction(candidate.score.overall.contractPass, candidate.score.overall.observations)}** |

| Catalog | Scope | Exact | Stopping | Invariants | Contract |
| --- | --- | ---: | ---: | ---: | ---: |
${scopeRows.join("\n")}

These are descriptive counts from a small stochastic matrix, not a statistical-
significance claim.

## Evidence binding

- Skill source SHA-256: \`${result.skillSourceHash}\`
- Robustness corpus SHA-256: \`${result.corpusHash}\`
- Full blind-input SHA-256: \`${result.inputs.full.blindInputHash}\`
- High-risk blind-input SHA-256: \`${result.inputs.highRiskRepeat.blindInputHash}\`
- Evaluation-tooling SHA-256: \`${result.evaluationToolingHash}\`
- Judge-tooling SHA-256: \`${result.judgeToolingHash}\`
- Scoring-tooling SHA-256: \`${result.scoringToolingHash}\`
- Raw-observation SHA-256: \`${result.rawObservationHash}\`
- Judge-input SHA-256: \`${result.judgeInputHash}\`
- Judgment SHA-256: \`${result.judgmentHash}\`
- Frozen-result SHA-256: \`${result.resultHash}\`
- Current catalog SHA-256: \`${current.catalog.manifest.catalogHash}\`
- Candidate catalog SHA-256: \`${candidate.catalog.manifest.catalogHash}\`
- Current fixture-binding SHA-256: \`${current.catalog.manifest.fixtureBindingHash}\`
- Candidate fixture-binding SHA-256: \`${candidate.catalog.manifest.fixtureBindingHash}\`

The exact anonymous manifests, bound judge inputs, raw and excluded observations,
judgments, scores, and per-observation failures are preserved in
\`robustness-current-results.json\`. Revalidate the result and this generated
report with:

\`\`\`sh
node scripts/score-robustness-results.mjs
\`\`\`
`;
}

function assemble(matrixRoot, repositoryBaseHash) {
  const fullInputPath = join(matrixRoot, "inputs", "full.json");
  const highRiskInputPath = join(matrixRoot, "inputs", "high-risk.json");
  const fullInput = readJson(fullInputPath);
  const highRiskInput = readJson(highRiskInputPath);
  const catalogs = {};
  for (const arm of catalogArmIds) {
    const path = join(matrixRoot, `${arm}.catalog-manifest.json`);
    const manifest = readJson(path);
    catalogs[arm] = {
      revealedVariant: manifest.variant,
      manifestFileHash: fileHash(path),
      manifestContentHash: contentHash(manifest),
      manifest,
    };
  }
  const runs = runPlan.map((plan) => {
    const path = join(matrixRoot, "raw", `${plan.runId}.json`);
    const data = readJson(path);
    const matchingArms = Object.entries(catalogs)
      .filter(([, catalog]) => catalog.manifest.fixtureBindingHash === data.fixtureBindingHash)
      .map(([arm]) => arm);
    if (matchingArms.length !== 1) {
      throw new Error(`${plan.runId} fixtureBindingHash must resolve to exactly one catalog arm`);
    }
    return {
      ...plan,
      arm: matchingArms[0],
      rawFileHash: fileHash(path),
      rawContentHash: contentHash(data),
      data,
    };
  });
  const excludedRuns = excludedPlan.map((plan) => {
    const path = join(matrixRoot, "raw", `${plan.runId}.json`);
    const data = readJson(path);
    return {
      ...plan,
      rawFileHash: fileHash(path),
      rawContentHash: contentHash(data),
      data,
    };
  });
  const judgeRuns = judgePlan.map((plan) => {
    const path = join(matrixRoot, "judgments", `${plan.judgeRunId}.json`);
    const inputPath = join(matrixRoot, "judge-inputs", `${plan.judgeRunId}.json`);
    const data = readJson(path);
    const input = readJson(inputPath);
    return {
      ...plan,
      judgmentFileHash: fileHash(path),
      judgmentContentHash: contentHash(data),
      judgeInputFileHash: fileHash(inputPath),
      judgeInputContentHash: contentHash(input),
      input,
      data,
    };
  });
  const scored = scoreMatrix(runs, judgeRuns);
  const result = {
    schemaVersion: 2,
    suite: "routing-robustness-matrix-v2",
    protocolVersion,
    evaluationDate: "2026-09-01",
    repositoryBaseHash,
    skillSourceHash: fullInput.skillSourceHash,
    corpusHash: fullInput.corpusHash,
    evaluationToolingHash: fullInput.toolingHash,
    judgeToolingHash: judgeToolingHash(root),
    scoringToolingHash: scoringToolingHash(root),
    inputs: {
      full: {
        inputFileHash: fileHash(fullInputPath),
        suite: fullInput.suite,
        corpusHash: fullInput.corpusHash,
        blindInputHash: fullInput.blindInputHash,
        toolingHash: fullInput.toolingHash,
      },
      highRiskRepeat: {
        inputFileHash: fileHash(highRiskInputPath),
        suite: highRiskInput.suite,
        selectionCorpusHash: highRiskInput.corpusHash,
        fullCorpusHash: highRiskInput.fullCorpusHash,
        blindInputHash: highRiskInput.blindInputHash,
        toolingHash: highRiskInput.toolingHash,
        caseRefs: highRiskInput.cases.map((entry) => entry.caseRef),
      },
    },
    catalogs,
    catalogCharacters: catalogState().characters,
    rawObservationHash: contentHash(runs.map((run) => run.data)),
    judgeInputHash: contentHash(judgeRuns.map((run) => run.input)),
    judgmentHash: contentHash(judgeRuns.map((run) => run.data)),
    runs,
    excludedRuns,
    judgeRuns,
    scores: scored.scores,
    contractFailures: scored.failures,
    unrunTracks: [
      "canonical 56-case catalog ablation",
      "artifact implementation quality",
    ],
  };
  result.decision = promotionDecision(result);
  result.resultHash = resultHash(result);
  return result;
}

function validate(result, { checkReport = true, reportPath = defaultReportPath } = {}) {
  const failures = [];
  const cases = expectedCases();
  const casesByRef = new Map(cases.map((entry) => [entry.caseRef, entry]));
  const fullRefs = cases.map((entry) => entry.caseRef);
  const highRiskRefs = result.inputs?.highRiskRepeat?.caseRefs ?? [];
  const expectedObservationKeys = [
    "caseRef",
    "contaminationObserved",
    "mutationObserved",
    "observedComposed",
    "observedPrimary",
    "observedSequence",
    "observedStopping",
    "rationale",
  ].sort();
  const expectedRunKeys = [
    "blindInputHash",
    "contaminationObserved",
    "corpusHash",
    "evaluatorMode",
    "fixtureBindingHash",
    "model",
    "observations",
    "reasoningConfig",
    "runId",
    "skillSourceHash",
    "suite",
    "toolingHash",
  ].sort();

  if (result.schemaVersion !== 2) failures.push("schemaVersion must be 2");
  if (result.suite !== "routing-robustness-matrix-v2") failures.push("suite mismatch");
  if (result.protocolVersion !== protocolVersion) failures.push(`protocolVersion must be ${protocolVersion}`);
  if (!/^[0-9a-f]{40}$/.test(result.repositoryBaseHash ?? "")) failures.push("repositoryBaseHash must be a commit hash");
  else {
    try {
      execFileSync("git", ["cat-file", "-e", `${result.repositoryBaseHash}^{commit}`], {
        cwd: root,
        stdio: "ignore",
      });
      if (skillSourceHashAtCommit(result.repositoryBaseHash) !== result.skillSourceHash) {
        failures.push("repository base skill source does not match the evaluated source hash");
      }
      const baseCorpus = gitFile(result.repositoryBaseHash, "evals/robustness-routing.jsonl")
        .toString("utf8").split("\n").filter((line) => line.trim()).map((line) => JSON.parse(line));
      if (contentHash(baseCorpus) !== result.corpusHash) {
        failures.push("repository base corpus does not match the evaluated corpus hash");
      }
      if (evaluationToolingHashAtCommit(result.repositoryBaseHash) !== result.evaluationToolingHash) {
        failures.push("repository base tooling does not match the evaluated tooling hash");
      }
    } catch {
      failures.push("repositoryBaseHash does not resolve to a local commit");
    }
  }
  if (result.skillSourceHash !== skillSourceHash(root)) failures.push("skillSourceHash is stale");
  if (result.corpusHash !== contentHash(readJsonl(corpusPath))) failures.push("corpusHash is stale");
  if (result.evaluationToolingHash !== robustnessToolingHash(root)) failures.push("evaluationToolingHash is stale");
  if (result.judgeToolingHash !== judgeToolingHash(root)) failures.push("judgeToolingHash is stale");
  if (result.scoringToolingHash !== scoringToolingHash(root)) failures.push("scoringToolingHash is stale");
  if (result.inputs?.full?.blindInputHash !== contentHash({ fixtureBinding: fixtureBindingInstruction, rubric: blindRubric, cases: blindCases(readJsonl(corpusPath)) })) {
    failures.push("full blindInputHash is stale");
  }
  if (result.inputs?.full?.corpusHash !== result.corpusHash) failures.push("full input corpusHash mismatch");
  if (result.inputs?.highRiskRepeat?.fullCorpusHash !== result.corpusHash) failures.push("high-risk fullCorpusHash mismatch");
  if (result.inputs?.full?.toolingHash !== result.evaluationToolingHash
    || result.inputs?.highRiskRepeat?.toolingHash !== result.evaluationToolingHash) {
    failures.push("input tooling hash mismatch");
  }
  const currentCatalogState = catalogState();
  if (!sameArray(result.catalogCharacters, currentCatalogState.characters)) failures.push("catalog character counts are stale");
  if (result.catalogCharacters?.reductionRatio < 0.3) failures.push("catalog reduction is below 30%");
  if (!sameArray(highRiskRefs, highRiskCaseRefs)) failures.push("high-risk case selection is stale");
  const rawCases = readJsonl(corpusPath);
  const selectedCases = rawCases.filter((entry, index) => highRiskCaseRefs.includes(caseRef(index)));
  const selectedBlindCases = blindCases(rawCases).filter((entry) => highRiskCaseRefs.includes(entry.caseRef));
  if (result.inputs?.highRiskRepeat?.selectionCorpusHash !== contentHash(selectedCases)) {
    failures.push("high-risk selectionCorpusHash is stale");
  }
  if (result.inputs?.highRiskRepeat?.blindInputHash !== contentHash({ fixtureBinding: fixtureBindingInstruction, rubric: blindRubric, cases: selectedBlindCases })) {
    failures.push("high-risk blindInputHash is stale");
  }

  const planById = new Map(runPlan.map((plan) => [plan.runId, plan]));
  if (!Array.isArray(result.runs) || result.runs.length !== runPlan.length) {
    failures.push(`runs must contain exactly ${runPlan.length} valid runs`);
  }
  const runIds = new Set();
  const observations = new Map();
  for (const run of result.runs ?? []) {
    const plan = planById.get(run.runId);
    const prefix = `run ${run.runId ?? "<missing>"}`;
    if (!plan) {
      failures.push(`${prefix} is not in the frozen plan`);
      continue;
    }
    if (runIds.has(run.runId)) failures.push(`${prefix} is duplicated`);
    runIds.add(run.runId);
    for (const field of ["scope", "model", "reasoningConfig"]) {
      if (run[field] !== plan[field]) failures.push(`${prefix} ${field} mismatch`);
    }
    const boundCatalog = result.catalogs?.[run.arm];
    if (!boundCatalog || run.data.fixtureBindingHash !== boundCatalog.manifest?.fixtureBindingHash) {
      failures.push(`${prefix} fixture binding does not resolve to its stored arm`);
    }
    if (run.rawContentHash !== contentHash(run.data)) failures.push(`${prefix} rawContentHash mismatch`);
    if (!sameArray(Object.keys(run.data).sort(), expectedRunKeys)) failures.push(`${prefix} run schema mismatch`);
    if (run.data.runId !== run.runId) failures.push(`${prefix} nested runId mismatch`);
    if (run.data.model !== run.model || run.data.reasoningConfig !== run.reasoningConfig) {
      failures.push(`${prefix} model metadata mismatch`);
    }
    if (run.data.evaluatorMode !== "independent-blind-read-only") failures.push(`${prefix} evaluatorMode mismatch`);
    if (run.data.contaminationObserved !== false) failures.push(`${prefix} must report no top-level contamination`);
    if (run.data.skillSourceHash !== result.skillSourceHash) failures.push(`${prefix} skillSourceHash mismatch`);
    if (run.data.toolingHash !== result.evaluationToolingHash) failures.push(`${prefix} toolingHash mismatch`);
    const input = run.scope === "full" ? result.inputs.full : result.inputs.highRiskRepeat;
    const expectedRefs = run.scope === "full" ? fullRefs : highRiskRefs;
    if (run.data.suite !== input.suite) failures.push(`${prefix} suite mismatch`);
    if (run.data.corpusHash !== (run.scope === "full" ? input.corpusHash : input.selectionCorpusHash)) {
      failures.push(`${prefix} corpusHash mismatch`);
    }
    if (run.data.blindInputHash !== input.blindInputHash) failures.push(`${prefix} blindInputHash mismatch`);
    if (!sameArray(run.data.observations?.map((entry) => entry.caseRef), expectedRefs)) {
      failures.push(`${prefix} does not cover the expected cases in order`);
    }
    for (const observation of run.data.observations ?? []) {
      const key = `${run.runId}\0${observation.caseRef}`;
      if (observations.has(key)) failures.push(`${prefix} duplicates ${observation.caseRef}`);
      observations.set(key, observation);
      if (!sameArray(Object.keys(observation).sort(), expectedObservationKeys)) {
        failures.push(`${prefix} ${observation.caseRef} observation schema mismatch`);
      }
      if (!casesByRef.has(observation.caseRef)) failures.push(`${prefix} has unknown ${observation.caseRef}`);
      if (observation.mutationObserved !== false || observation.contaminationObserved !== false) {
        failures.push(`${prefix} ${observation.caseRef} must report no mutation or contamination`);
      }
      if (typeof observation.observedStopping !== "string" || !observation.observedStopping.trim()) {
        failures.push(`${prefix} ${observation.caseRef} missing observedStopping`);
      }
      if (typeof observation.rationale !== "string" || !observation.rationale.trim()) {
        failures.push(`${prefix} ${observation.caseRef} missing rationale`);
      }
    }
  }
  for (const plan of runPlan) if (!runIds.has(plan.runId)) failures.push(`missing ${plan.runId}`);
  for (const arm of catalogArmIds) {
    for (const model of ["gpt-5.6-sol", "gpt-5.6-terra", "gpt-5.6-luna"]) {
      const matching = (result.runs ?? []).filter((run) => run.arm === arm && run.model === model);
      if (matching.filter((run) => run.scope === "full").length !== 1
        || matching.filter((run) => run.scope === "high-risk-repeat").length !== 2) {
        failures.push(`${arm} ${model} must have one full run and two high-risk repeats`);
      }
    }
  }
  if (result.rawObservationHash !== contentHash((result.runs ?? []).map((run) => run.data))) {
    failures.push("rawObservationHash mismatch");
  }

  const expectedJudgeById = new Map(judgePlan.map((plan) => [plan.judgeRunId, plan]));
  const expectedJudgeKeys = [
    "evaluatorMode",
    "expectedSetHash",
    "judgeInputHash",
    "judgeProtocolHash",
    "judgeRunId",
    "judgeToolingHash",
    "judgments",
    "model",
    "observationSetHash",
    "reasoningConfig",
  ].sort();
  const expectedJudgmentKeys = [
    "caseRef",
    "invariants",
    "observationContentHash",
    "runId",
    "stoppingEvidence",
    "stoppingPass",
  ].sort();
  const judgments = new Map();
  if (!Array.isArray(result.judgeRuns) || result.judgeRuns.length !== judgePlan.length) {
    failures.push(`judgeRuns must contain exactly ${judgePlan.length} runs`);
  }
  for (const judgeRun of result.judgeRuns ?? []) {
    const plan = expectedJudgeById.get(judgeRun.judgeRunId);
    const prefix = `judge ${judgeRun.judgeRunId ?? "<missing>"}`;
    if (!plan) {
      failures.push(`${prefix} is not in the frozen plan`);
      continue;
    }
    for (const field of ["model", "reasoningConfig", "evaluatorModel"]) {
      if (judgeRun[field] !== plan[field]) failures.push(`${prefix} ${field} mismatch`);
    }
    if (judgeRun.model === judgeRun.evaluatorModel) failures.push(`${prefix} must use a different model`);
    if (judgeRun.judgmentContentHash !== contentHash(judgeRun.data)) failures.push(`${prefix} content hash mismatch`);
    if (!sameArray(Object.keys(judgeRun.data).sort(), expectedJudgeKeys)) failures.push(`${prefix} schema mismatch`);
    if (judgeRun.judgeInputContentHash !== contentHash(judgeRun.input)) failures.push(`${prefix} input content hash mismatch`);
    const expectedJudgeInput = buildJudgeInput(result.runs ?? [], judgeRun.evaluatorModel);
    if (!sameArray(judgeRun.input, expectedJudgeInput)) failures.push(`${prefix} frozen judge input is stale`);
    if (judgeRun.data.judgeRunId !== judgeRun.judgeRunId) failures.push(`${prefix} nested id mismatch`);
    if (judgeRun.data.model !== judgeRun.model || judgeRun.data.reasoningConfig !== judgeRun.reasoningConfig) {
      failures.push(`${prefix} nested model metadata mismatch`);
    }
    if (judgeRun.data.evaluatorMode !== "independent-post-hoc-read-only") failures.push(`${prefix} mode mismatch`);
    for (const field of [
      "judgeInputHash",
      "judgeProtocolHash",
      "judgeToolingHash",
      "observationSetHash",
      "expectedSetHash",
    ]) {
      if (judgeRun.data[field] !== expectedJudgeInput[field]) failures.push(`${prefix} ${field} mismatch`);
    }
    const eligibleRuns = (result.runs ?? []).filter((run) => run.model === judgeRun.evaluatorModel);
    const expectedKeys = new Set(eligibleRuns.flatMap((run) =>
      run.data.observations.map((observation) => `${run.runId}\0${observation.caseRef}`)));
    if (judgeRun.data.judgments?.length !== expectedKeys.size) {
      failures.push(`${prefix} must contain ${expectedKeys.size} judgments`);
    }
    for (const judgment of judgeRun.data.judgments ?? []) {
      const key = `${judgment.runId}\0${judgment.caseRef}`;
      if (!expectedKeys.has(key)) failures.push(`${prefix} has unexpected ${judgment.runId}/${judgment.caseRef}`);
      if (judgments.has(key)) failures.push(`${prefix} duplicates cross-judge judgment ${judgment.runId}/${judgment.caseRef}`);
      judgments.set(key, judgment);
      if (!sameArray(Object.keys(judgment).sort(), expectedJudgmentKeys)) {
        failures.push(`${prefix} ${judgment.runId}/${judgment.caseRef} judgment schema mismatch`);
      }
      const judgedObservation = observations.get(key);
      if (!judgedObservation || judgment.observationContentHash !== contentHash(judgedObservation)) {
        failures.push(`${prefix} ${judgment.runId}/${judgment.caseRef} observation hash mismatch`);
      }
      if (typeof judgment.stoppingPass !== "boolean"
        || typeof judgment.stoppingEvidence !== "string" || !judgment.stoppingEvidence.trim()) {
        failures.push(`${prefix} ${judgment.runId}/${judgment.caseRef} invalid stopping judgment`);
      }
      const entry = casesByRef.get(judgment.caseRef);
      if (!entry || judgment.invariants?.length !== entry.expected.invariants.length) {
        failures.push(`${prefix} ${judgment.runId}/${judgment.caseRef} invariant count mismatch`);
      } else {
        for (const [index, invariant] of judgment.invariants.entries()) {
          if (invariant.index !== index || typeof invariant.pass !== "boolean"
            || typeof invariant.evidence !== "string" || !invariant.evidence.trim()) {
            failures.push(`${prefix} ${judgment.runId}/${judgment.caseRef} invalid invariant ${index}`);
          } else if (invariant.evidence.includes(entry.expected.invariants[index])) {
            failures.push(`${prefix} ${judgment.runId}/${judgment.caseRef} repeats hidden invariant ${index}`);
          }
        }
      }
    }
    for (const key of expectedKeys) if (!judgments.has(key)) failures.push(`${prefix} missing ${key.replace("\0", "/")}`);
  }
  if (judgments.size !== observations.size) failures.push("every valid observation needs exactly one judgment");
  if (result.judgmentHash !== contentHash((result.judgeRuns ?? []).map((run) => run.data))) {
    failures.push("judgmentHash mismatch");
  }
  if (result.judgeInputHash !== contentHash((result.judgeRuns ?? []).map((run) => run.input))) {
    failures.push("judgeInputHash mismatch");
  }

  if (!Array.isArray(result.excludedRuns) || result.excludedRuns.length !== excludedPlan.length) {
    failures.push(`excludedRuns must contain exactly ${excludedPlan.length} invalid runs`);
  } else {
    for (const [index, excluded] of result.excludedRuns.entries()) {
      const plan = excludedPlan[index];
      if (excluded.runId !== plan.runId || excluded.replacementRunId !== plan.replacementRunId
        || excluded.reason !== plan.reason) {
        failures.push(`excluded run ${index + 1} metadata mismatch`);
      }
      if (excluded.rawContentHash !== contentHash(excluded.data)) failures.push(`excluded ${excluded.runId} hash mismatch`);
    }
  }

  const seenVariants = new Set();
  for (const arm of catalogArmIds) {
    const catalog = result.catalogs?.[arm];
    const expectedVariant = catalog?.manifest?.variant;
    if (!catalog || !new Set(["current", "candidate"]).has(expectedVariant)
      || catalog.revealedVariant !== expectedVariant || seenVariants.has(expectedVariant)) {
      failures.push(`${arm} variant mapping mismatch`);
    } else if (catalog.manifestContentHash !== contentHash(catalog.manifest)) {
      failures.push(`${arm} manifest content hash mismatch`);
    } else {
      seenVariants.add(expectedVariant);
      if (catalog.manifest.catalogHash !== currentCatalogState.hashes[expectedVariant]) {
        failures.push(`${arm} catalog hash is stale`);
      }
      if (catalog.manifest.canonicalSkillSourceHash !== result.skillSourceHash) {
        failures.push(`${arm} skill source hash mismatch`);
      }
      if (catalog.manifest.toolingHash !== result.evaluationToolingHash) {
        failures.push(`${arm} tooling hash mismatch`);
      }
      if (!sameArray(catalog.manifest.skills, expectedSkills)) {
        failures.push(`${arm} skill list mismatch`);
      }
      if (typeof catalog.manifest.fixtureBindingHash !== "string"
        || typeof catalog.manifest.skillTreeHash !== "string") {
        failures.push(`${arm} anonymous fixture binding metadata is incomplete`);
      }
      const expectedBindingHash = fixtureBindingHash({
        catalogHash: catalog.manifest.catalogHash,
        skillTreeHash: catalog.manifest.skillTreeHash,
        skillSourceHash: catalog.manifest.canonicalSkillSourceHash,
        toolingHash: catalog.manifest.toolingHash,
      });
      if (catalog.manifest.fixtureBindingHash !== expectedBindingHash) {
        failures.push(`${arm} anonymous fixture binding hash mismatch`);
      }
    }
  }
  if (!sameArray([...seenVariants].sort(), ["candidate", "current"])) {
    failures.push("catalog arms must resolve to current and candidate exactly once");
  }

  const rescored = scoreMatrix(result.runs ?? [], result.judgeRuns ?? []);
  if (!sameArray(result.scores, rescored.scores)) failures.push("scores are stale");
  if (!sameArray(result.contractFailures, rescored.failures)) failures.push("contractFailures are stale");
  if (!sameArray(result.decision, promotionDecision(result))) failures.push("promotion decision is stale");
  if (result.resultHash !== resultHash(result)) failures.push("resultHash mismatch");
  if (checkReport) {
    if (!existsSync(reportPath)) failures.push(`missing generated report ${reportPath}`);
    else if (readFileSync(reportPath, "utf8") !== renderReport(result)) failures.push("generated robustness report is stale");
  }
  return failures;
}

function parseArguments(argv) {
  const parsed = { resultsPath: defaultResultsPath, reportPath: defaultReportPath };
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--assemble") parsed.matrixRoot = resolve(argv[++index]);
    else if (argument === "--repository-base") parsed.repositoryBaseHash = argv[++index];
    else if (argument === "--output") parsed.resultsPath = resolve(argv[++index]);
    else if (argument === "--report") parsed.reportPath = resolve(argv[++index]);
    else throw new Error(`Unknown argument ${argument}`);
  }
  return parsed;
}

const options = parseArguments(process.argv.slice(2));
if (options.matrixRoot) {
  if (!options.repositoryBaseHash) throw new Error("--repository-base is required with --assemble");
  const result = assemble(options.matrixRoot, options.repositoryBaseHash);
  const failures = validate(result, { checkReport: false, reportPath: options.reportPath });
  if (failures.length) {
    for (const failure of failures) console.error(`- ${failure}`);
    process.exit(1);
  }
  writeFileSync(options.resultsPath, `${JSON.stringify(result, null, 2)}\n`);
  writeFileSync(options.reportPath, renderReport(result));
}

if (!existsSync(options.resultsPath)) throw new Error(`Missing ${options.resultsPath}`);
const results = readJson(options.resultsPath);
const failures = validate(results, { reportPath: options.reportPath });
if (failures.length) {
  console.error(`Robustness result validation failed with ${failures.length} issue(s):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

const observationCount = results.runs.reduce((sum, run) => sum + run.data.observations.length, 0);
const judgmentCount = results.judgeRuns.reduce((sum, run) => sum + run.data.judgments.length, 0);
console.log(`Robustness results valid: ${results.runs.length} runs, ${observationCount} observations, ${judgmentCount} judgments, ${results.excludedRuns.length} excluded runs.`);
for (const [arm, score] of Object.entries(results.scores)) {
  const variant = results.catalogs[arm].revealedVariant;
  console.log(`${variant}: selection ${score.overall.exactSelectionPass}/${score.overall.observations}, stopping ${score.overall.stoppingPass}/${score.overall.observations}, invariants ${score.overall.invariantPass}/${score.overall.invariantTotal}, contract ${score.overall.contractPass}/${score.overall.observations}`);
}
