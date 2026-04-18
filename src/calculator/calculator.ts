type CalcError = { success: false; message: string };
type CalcSuccess = { success: true; attempts: number };
type CalcResult = CalcSuccess | CalcError;

/**
 * @param winRate - The individual chance per attempt (e.g., 1 for 1%)
 * @param confidence - The target cumulative probability (e.g., 99 for 99%)
 */
export function getRequiredAttempts(
  winRate: number,
  confidence: number,
): CalcResult {
  if (winRate <= 0 || winRate >= 100) {
    return { success: false, message: "Rate must be between 0 and 100" };
  }

  if (confidence <= 0 || confidence >= 100) {
    return { success: false, message: "Confidence must be between 0 and 100" };
  }

  const probability = winRate / 100;
  const threshold = confidence / 100;

  // Use Math.log1p for better precision with very small numbers
  const attempts = Math.ceil(
    Math.log(1 - threshold) / Math.log(1 - probability),
  );

  return { success: true, attempts };
}
