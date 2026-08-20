import assert from 'node:assert/strict';
import test from 'node:test';

import { estimateFuelCost, summarizeDistance } from '../src/reporting.js';

test('summarizes trip distance', () => {
  assert.equal(
    summarizeDistance([{ distanceKm: 12.5 }, { distanceKm: 7.5 }]),
    20,
  );
});

test('estimates fuel cost for a vehicle trip set', () => {
  const trips = [{ distanceKm: 120 }, { distanceKm: 30 }];
  const vehicle = { efficiencyKmPerLiter: 12 };

  assert.equal(estimateFuelCost(trips, vehicle, 1.8), 22.5);
});

test('rounds only the final fuel cost, not intermediate liters', () => {
  const trips = [{ distanceKm: 17 }];
  const vehicle = { efficiencyKmPerLiter: 12 };

  assert.equal(estimateFuelCost(trips, vehicle, 1.8), 2.55);
});

test('rejects invalid fuel prices', () => {
  assert.throws(
    () => estimateFuelCost([], { efficiencyKmPerLiter: 12 }, 0),
    /fuel price must be a positive number/,
  );
});
