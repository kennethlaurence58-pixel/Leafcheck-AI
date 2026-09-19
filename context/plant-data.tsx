import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import { SensorReading, subscribeToSensorReadings } from "@/services/iot-sensor";

const disconnectedReading: SensorReading = {
  healthy: 9,
  needsCare: 2,
  critical: 1,
  overallHealth: 82,
  soilMoisture: 62,
  soilPh: 6.4,
  temperature: 27,
  recentAlerts: 2,
  updatedAt: new Date(0),
};

const PlantDataContext = createContext<SensorReading>(disconnectedReading);

export function PlantDataProvider({ children }: PropsWithChildren) {
  const [reading, setReading] = useState(disconnectedReading);

  useEffect(() => subscribeToSensorReadings(setReading), []);

  return <PlantDataContext.Provider value={reading}>{children}</PlantDataContext.Provider>;
}

export function usePlantData() {
  return useContext(PlantDataContext);
}
