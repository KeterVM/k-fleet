import assert from 'node:assert/strict';
import test from 'node:test';

import { exportTripSummaryCsv } from '../src/reporting.js';

test('exports grouped normalized trip distances in vehicle-id order', () => {
  assert.equal(
    exportTripSummaryCsv([
      { vehicleId: ' van-b ', distanceKm: 4 },
      { vehicleId: 'van-a', distanceKm: 2 },
      { vehicleId: ' van-a ', distanceKm: 3.5 },
    ]),
    'vehicleId,totalDistanceKm\nvan-a,5.5\nvan-b,4',
  );
});

test('exports only the header for no trips', () => {
  assert.equal(exportTripSummaryCsv([]), 'vehicleId,totalDistanceKm');
});

test('rejects a non-array input', () => {
  assert.throws(
    () => exportTripSummaryCsv(null),
    (error) =>
      error instanceof TypeError && error.message === 'trips must be an array',
  );
});
