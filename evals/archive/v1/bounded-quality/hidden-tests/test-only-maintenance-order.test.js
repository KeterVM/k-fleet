import assert from 'node:assert/strict';
import test from 'node:test';

import {
  createMaintenancePlan,
  listDueMaintenance,
} from '../src/maintenance.js';

test('orders equally overdue maintenance by vehicle id', () => {
  const plans = [
    createMaintenancePlan({
      vehicleId: 'van-b',
      serviceIntervalKm: 100,
      lastServiceKm: 100,
    }),
    createMaintenancePlan({
      vehicleId: 'van-a',
      serviceIntervalKm: 100,
      lastServiceKm: 100,
    }),
  ];

  assert.deepEqual(
    listDueMaintenance(plans, { 'van-a': 250, 'van-b': 250 }).map(
      (status) => status.vehicleId,
    ),
    ['van-a', 'van-b'],
  );
});
