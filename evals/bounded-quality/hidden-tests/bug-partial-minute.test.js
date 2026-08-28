import assert from 'node:assert/strict';
import test from 'node:test';

import { createTrip, tripDurationMinutes } from '../src/fleet-ledger.js';

function durationFor(seconds) {
  const trip = createTrip({
    id: `trip-${seconds}`,
    vehicleId: 'van-1',
    distanceKm: 1,
    startedAt: '2026-08-20T08:00:00.000Z',
    endedAt: new Date(
      Date.parse('2026-08-20T08:00:00.000Z') + seconds * 1_000,
    ).toISOString(),
  });

  assert.equal(Object.isFrozen(trip), true);
  return tripDurationMinutes(trip);
}

test('rounds trip durations up to whole started minutes', () => {
  assert.equal(durationFor(60), 1);
  assert.equal(durationFor(61), 2);
  assert.equal(durationFor(119), 2);
  assert.equal(durationFor(120), 2);
});
