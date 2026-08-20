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
