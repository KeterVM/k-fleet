import { normalizeId, requirePositiveNumber } from './validation.js';

function requireNonNegativeNumber(value, label) {
  if (typeof value !== 'number' || !Number.isFinite(value) || value < 0) {
    throw new TypeError(`${label} must be a non-negative number`);
  }

  return value;
}

function parseCanonicalDecimal(value) {
  const match = String(value).match(
    /^(-?)(\d+)(?:\.(\d+))?(?:e([+-]?\d+))?$/i,
  );
  const [, sign, whole, fraction = '', exponent = '0'] = match;
  const coefficient = BigInt(`${whole}${fraction}`) * (sign ? -1n : 1n);

  return {
    coefficient,
    scale: fraction.length - Number(exponent),
  };
}

function decimalSumEquals(left, right, expected) {
  // Preserve the canonical decimal intent of Number inputs only when deciding
  // exact threshold equality; ordinary ordering remains strict.
  const values = [left, right, expected].map(parseCanonicalDecimal);
  const commonScale = Math.max(...values.map((value) => value.scale));
  const scaled = values.map(
    (value) =>
      value.coefficient * 10n ** BigInt(commonScale - value.scale),
  );

  return scaled[0] + scaled[1] === scaled[2];
}

export function createMaintenancePlan({
  vehicleId,
  serviceIntervalKm,
  lastServiceKm,
}) {
  return Object.freeze({
    vehicleId: normalizeId(vehicleId, 'vehicle id'),
    serviceIntervalKm: requirePositiveNumber(
      serviceIntervalKm,
      'service interval',
    ),
    lastServiceKm: requireNonNegativeNumber(lastServiceKm, 'last service'),
  });
}

export function maintenanceStatus(plan, currentOdometerKm) {
  requireNonNegativeNumber(currentOdometerKm, 'current odometer');

  if (currentOdometerKm < plan.lastServiceKm) {
    throw new TypeError('current odometer cannot be before last service');
  }

  const nextServiceKm = plan.lastServiceKm + plan.serviceIntervalKm;

  if (!Number.isFinite(nextServiceKm)) {
    throw new TypeError('next service must be a finite number');
  }

  if (nextServiceKm <= plan.lastServiceKm) {
    throw new TypeError('next service must advance beyond last service');
  }

  const differenceKm = decimalSumEquals(
    plan.lastServiceKm,
    plan.serviceIntervalKm,
    currentOdometerKm,
  )
    ? 0
    : currentOdometerKm - nextServiceKm;

  return Object.freeze({
    vehicleId: plan.vehicleId,
    due: differenceKm >= 0,
    nextServiceKm,
    remainingKm: Math.max(0, -differenceKm),
    overdueKm: Math.max(0, differenceKm),
  });
}

export function listDueMaintenance(plans, odometerByVehicle) {
  return plans
    .map((plan) => maintenanceStatus(plan, odometerByVehicle[plan.vehicleId]))
    .filter((status) => status.due)
    .sort(
      (left, right) =>
        right.overdueKm - left.overdueKm ||
        left.vehicleId.localeCompare(right.vehicleId),
    );
}
