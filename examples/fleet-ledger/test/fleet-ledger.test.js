import assert from 'node:assert/strict';
import test from 'node:test';

import {
  createTrip,
  createVehicle,
  FleetLedger,
  tripDurationMinutes,
} from '../src/fleet-ledger.js';

test('creates normalized immutable vehicle records', () => {
  const vehicle = createVehicle({ id: ' van-1 ', efficiencyKmPerLiter: 12 });

  assert.deepEqual(vehicle, { id: 'van-1', efficiencyKmPerLiter: 12 });
  assert.equal(Object.isFrozen(vehicle), true);
});

test('rejects trips for unknown vehicles', () => {
  const ledger = new FleetLedger();

  assert.throws(
    () =>
      ledger.addTrip({
        id: 'trip-1',
        vehicleId: 'missing',
        distanceKm: 10,
        startedAt: '2026-08-20T08:00:00Z',
        endedAt: '2026-08-20T08:10:00Z',
      }),
    /unknown vehicle: missing/,
  );
});

test('stores and lists trips by normalized vehicle id', () => {
  const ledger = new FleetLedger();
  ledger.addVehicle({ id: 'van-1', efficiencyKmPerLiter: 12 });
  const trip = ledger.addTrip({
    id: 'trip-1',
    vehicleId: ' van-1 ',
    distanceKm: 24,
    startedAt: '2026-08-20T08:00:00Z',
    endedAt: '2026-08-20T08:30:00Z',
  });

  assert.deepEqual(ledger.listTrips(' van-1 '), [trip]);
});

test('calculates exact whole-minute trip durations', () => {
  const trip = createTrip({
    id: 'trip-1',
    vehicleId: 'van-1',
    distanceKm: 1,
    startedAt: '2026-08-20T08:00:00Z',
    endedAt: '2026-08-20T08:02:00Z',
  });

  assert.equal(tripDurationMinutes(trip), 2);
});

test('counts a partially started minute in trip duration', () => {
  const trip = createTrip({
    id: 'trip-partial-minute',
    vehicleId: 'van-1',
    distanceKm: 1,
    startedAt: '2026-08-20T08:00:00Z',
    endedAt: '2026-08-20T08:01:01Z',
  });

  assert.equal(tripDurationMinutes(trip), 2);
});
