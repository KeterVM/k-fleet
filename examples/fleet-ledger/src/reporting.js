import { requirePositiveNumber } from './validation.js';

export function summarizeDistance(trips) {
  return trips.reduce((total, trip) => total + trip.distanceKm, 0);
}

export function estimateFuelCost(trips, vehicle, fuelPricePerLiter) {
  requirePositiveNumber(fuelPricePerLiter, 'fuel price');
  const distanceKm = summarizeDistance(trips);
  const liters = distanceKm / vehicle.efficiencyKmPerLiter;

  return Math.round(liters * fuelPricePerLiter * 100) / 100;
}
