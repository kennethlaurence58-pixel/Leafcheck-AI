import { AIDiagnosisRequest, AIDiagnosisResponse } from "../types/ai";

export const analyzeFoliageHealth = async (
  _request: AIDiagnosisRequest
): Promise<AIDiagnosisResponse> => {
  return {
    success: false,
    healthStatus: "unknown",
    diagnoses: [],
    recommendations: [],
    timestamp: new Date().toISOString(),
    error: "AI analysis is not connected yet. No diagnosis or measurements were created.",
  };
};
