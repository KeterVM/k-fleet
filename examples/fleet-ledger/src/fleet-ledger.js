import { normalizeId, requirePositiveNumber } from './validation.js';

export function createVehicle({ id, efficiencyKmPerLiter }) {
  return Object.freeze({
    id: normalizeId(id, 'vehicle id'),
    efficiencyKmPerLiter: requirePositiveNumber(
      efficiencyKmPerLiter,
      'vehicle efficiency',
    ),
  });
}

export function createTrip({ id, vehicleId, distanceKm, startedAt, endedAt }) {
  const start = new Date(startedAt);
  const end = new Date(endedAt);

  if (!Number.isFinite(start.getTime()) || !Number.isFinite(end.getTime())) {
    throw new TypeError('trip timestamps must be valid dates');
  }

  if (end <= start) {
    throw new TypeError('trip end must be after trip start');
  }

  return Object.freeze({
    id: normalizeId(id, 'trip id'),
    vehicleId: normalizeId(vehicleId, 'vehicle id'),
    distanceKm: requirePositiveNumber(distanceKm, 'trip distance'),
    startedAt: start.toISOString(),
    endedAt: end.toISOString(),
  });
}

export function tripDurationMinutes(trip) {
  const milliseconds =
    new Date(trip.endedAt).getTime() - new Date(trip.startedAt).getTime();

  return Math.ceil(milliseconds / 60_000);
}

export class FleetLedger {
  #vehicles = new Map();
  #trips = new Map();

  addVehicle(input) {
    const vehicle = createVehicle(input);

    if (this.#vehicles.has(vehicle.id)) {
      throw new Error(`vehicle already exists: ${vehicle.id}`);
    }

    this.#vehicles.set(vehicle.id, vehicle);
    return vehicle;
  }

  addTrip(input) {
    const trip = createTrip(input);

    if (!this.#vehicles.has(trip.vehicleId)) {
      throw new Error(`unknown vehicle: ${trip.vehicleId}`);
    }

    if (this.#trips.has(trip.id)) {
      throw new Error(`trip already exists: ${trip.id}`);
    }

    this.#trips.set(trip.id, trip);
    return trip;
  }

  getVehicle(id) {
    return this.#vehicles.get(normalizeId(id, 'vehicle id')) ?? null;
  }

  listTrips(vehicleId) {
    const normalizedVehicleId = normalizeId(vehicleId, 'vehicle id');
    return [...this.#trips.values()].filter(
      (trip) => trip.vehicleId === normalizedVehicleId,
    );
  }
}
