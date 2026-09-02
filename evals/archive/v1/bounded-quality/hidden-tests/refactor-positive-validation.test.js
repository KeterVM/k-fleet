import assert from 'node:assert/strict';
import test from 'node:test';

import { createTrip, createVehicle } from '../src/fleet-ledger.js';
import { estimateFuelCost } from '../src/reporting.js';

test('preserves positive-number validation contracts', () => {
  assert.throws(
    () => createVehicle({ id: 'van-1', efficiencyKmPerLiter: 0 }),
    (error) =>
      error instanceof TypeError &&
      error.message === 'vehicle efficiency must be a positive number',
  );
  assert.throws(
    () =>
      createTrip({
        id: 'trip-1',
        vehicleId: 'van-1',
        distanceKm: -1,
        startedAt: '2026-08-20T08:00:00Z',
        endedAt: '2026-08-20T08:01:00Z',
      }),
    (error) =>
      error instanceof TypeError &&
      error.message === 'trip distance must be a positive number',
  );
  assert.throws(
    () =>
      estimateFuelCost(
        [{ distanceKm: 1 }],
        { efficiencyKmPerLiter: 10 },
        Number.NaN,
      ),
    (error) =>
      error instanceof TypeError &&
      error.message === 'fuel price must be a positive number',
  );
});
