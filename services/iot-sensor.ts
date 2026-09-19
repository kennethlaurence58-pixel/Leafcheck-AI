export type SensorReading = {
  healthy: number;
  needsCare: number;
  critical: number;
  overallHealth: number;
  soilMoisture: number;
  soilPh: number;
  temperature: number;
  recentAlerts: number;
  updatedAt: Date;
};

export type SensorListener = (reading: SensorReading) => void;

/**
 * The transport boundary for the future IoT sensor connection.
 * Replace this no-op subscription with the device transport without changing
 * dashboard components or their data contract.
 */
export function subscribeToSensorReadings(_listener: SensorListener) {
  // The real transport will call listener whenever the device publishes a reading.
  return () => {};
}
