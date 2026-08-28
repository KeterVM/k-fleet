import assert from 'node:assert/strict';
import test from 'node:test';

import {
  createMaintenancePlan,
  listDueMaintenance,
  maintenanceStatus,
} from '../src/maintenance.js';

test('creates normalized immutable maintenance plans', () => {
  const plan = createMaintenancePlan({
    vehicleId: ' van-1 ',
    serviceIntervalKm: 10_000,
    lastServiceKm: 20_000,
  });

  assert.deepEqual(plan, {
    vehicleId: 'van-1',
    serviceIntervalKm: 10_000,
    lastServiceKm: 20_000,
  });
  assert.equal(Object.isFrozen(plan), true);
});

test('reports remaining distance before service is due', () => {
  const plan = createMaintenancePlan({
    vehicleId: 'van-1',
    serviceIntervalKm: 10_000,
    lastServiceKm: 20_000,
  });

  assert.deepEqual(maintenanceStatus(plan, 27_500), {
    vehicleId: 'van-1',
    due: false,
    nextServiceKm: 30_000,
    remainingKm: 2_500,
    overdueKm: 0,
  });
});

test('marks maintenance due at the exact service threshold', () => {
  const plan = createMaintenancePlan({
    vehicleId: 'van-1',
    serviceIntervalKm: 10_000,
    lastServiceKm: 20_000,
  });

  assert.deepEqual(maintenanceStatus(plan, 30_000), {
    vehicleId: 'van-1',
    due: true,
    nextServiceKm: 30_000,
    remainingKm: 0,
    overdueKm: 0,
  });
});

test('normalizes decimal rounding noise at service thresholds', () => {
  for (const [lastServiceKm, serviceIntervalKm, currentOdometerKm] of [
    [0.1, 0.2, 0.3],
    [0.1, 16.1, 16.2],
    [0.7, 0.2, 0.9],
    [1e-7, 2e-7, 3e-7],
    [Number.MIN_VALUE, Number.MIN_VALUE, 1e-323],
    [1e307, 1e307, 2e307],
  ]) {
    const plan = createMaintenancePlan({
      vehicleId: 'van-1',
      serviceIntervalKm,
      lastServiceKm,
    });
    const status = maintenanceStatus(plan, currentOdometerKm);

    assert.equal(status.due, true);
    assert.equal(status.remainingKm, 0);
    assert.equal(status.overdueKm, 0);
  }
});

test('does not treat meaningful small distances as rounding noise', () => {
  const plan = createMaintenancePlan({
    vehicleId: 'van-1',
    serviceIntervalKm: 1e-12,
    lastServiceKm: 0,
  });

  assert.deepEqual(maintenanceStatus(plan, 0.5e-12), {
    vehicleId: 'van-1',
    due: false,
    nextServiceKm: 1e-12,
    remainingKm: 0.5e-12,
    overdueKm: 0,
  });
});

test('preserves meaningful threshold differences at large magnitudes', () => {
  const plan = createMaintenancePlan({
    vehicleId: 'van-1',
    serviceIntervalKm: 100,
    lastServiceKm: 1e16,
  });

  const status = maintenanceStatus(plan, 1e16 + 98);

  assert.equal(status.due, false);
  assert.equal(status.remainingKm, 2);
  assert.equal(status.overdueKm, 0);
});

test('preserves the smallest positive maintenance interval', () => {
  const plan = createMaintenancePlan({
    vehicleId: 'van-1',
    serviceIntervalKm: Number.MIN_VALUE,
    lastServiceKm: 0,
  });

  assert.deepEqual(maintenanceStatus(plan, 0), {
    vehicleId: 'van-1',
    due: false,
    nextServiceKm: Number.MIN_VALUE,
    remainingKm: Number.MIN_VALUE,
    overdueKm: 0,
  });
});

test('lists the most overdue maintenance first', () => {
  const plans = [
    createMaintenancePlan({
      vehicleId: 'van-1',
      serviceIntervalKm: 10_000,
      lastServiceKm: 20_000,
    }),
    createMaintenancePlan({
      vehicleId: 'van-2',
      serviceIntervalKm: 8_000,
      lastServiceKm: 16_000,
    }),
  ];

  assert.deepEqual(
    listDueMaintenance(plans, { 'van-1': 31_000, 'van-2': 26_000 }),
    [
      {
        vehicleId: 'van-2',
        due: true,
        nextServiceKm: 24_000,
        remainingKm: 0,
        overdueKm: 2_000,
      },
      {
        vehicleId: 'van-1',
        due: true,
        nextServiceKm: 30_000,
        remainingKm: 0,
        overdueKm: 1_000,
      },
    ],
  );
});

test('orders equally overdue maintenance by vehicle id', () => {
  const plans = [
    createMaintenancePlan({
      vehicleId: 'van-b',
      serviceIntervalKm: 10_000,
      lastServiceKm: 20_000,
    }),
    createMaintenancePlan({
      vehicleId: 'van-a',
      serviceIntervalKm: 10_000,
      lastServiceKm: 20_000,
    }),
  ];

  assert.deepEqual(
    listDueMaintenance(plans, { 'van-a': 31_000, 'van-b': 31_000 }).map(
      (status) => status.vehicleId,
    ),
    ['van-a', 'van-b'],
  );
});

test('rejects an odometer reading before the last service', () => {
  const plan = createMaintenancePlan({
    vehicleId: 'van-1',
    serviceIntervalKm: 10_000,
    lastServiceKm: 20_000,
  });

  assert.throws(
    () => maintenanceStatus(plan, 19_999),
    /current odometer cannot be before last service/,
  );
});

test('rejects a representable odometer rollback at large magnitudes', () => {
  const plan = createMaintenancePlan({
    vehicleId: 'van-1',
    serviceIntervalKm: 100,
    lastServiceKm: 1e16,
  });

  assert.throws(
    () => maintenanceStatus(plan, 1e16 - 2),
    /current odometer cannot be before last service/,
  );
});

test('rejects a positive interval absorbed by floating-point precision', () => {
  const plan = createMaintenancePlan({
    vehicleId: 'van-1',
    serviceIntervalKm: 1,
    lastServiceKm: 1e16,
  });

  assert.throws(
    () => maintenanceStatus(plan, 1e16),
    /next service must advance beyond last service/,
  );
});

test('rejects a maintenance threshold that overflows', () => {
  const plan = createMaintenancePlan({
    vehicleId: 'van-1',
    serviceIntervalKm: Number.MAX_VALUE,
    lastServiceKm: Number.MAX_VALUE,
  });

  assert.throws(
    () => maintenanceStatus(plan, Number.MAX_VALUE),
    /next service must be a finite number/,
  );
});
