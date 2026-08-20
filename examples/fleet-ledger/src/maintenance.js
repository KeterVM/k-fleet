import { normalizeId, requirePositiveNumber } from './validation.js';

function requireNonNegativeNumber(value, label) {
  if (typeof value !== 'number' || !Number.isFinite(value) || value < 0) {
    throw new TypeError(`${label} must be a non-negative number`);
  }

  return value;
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
  const differenceKm = currentOdometerKm - nextServiceKm;

  return Object.freeze({
    vehicleId: plan.vehicleId,
    due: currentOdometerKm >= nextServiceKm,
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
