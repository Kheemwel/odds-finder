import { describe, it, expect } from "vitest";
import { getRequiredAttempts } from "./calculator";

describe("getRequiredAttempts", () => {
  describe("Error Handling", () => {
    it("should return error for 0% win rate", () => {
      const result = getRequiredAttempts(0, 50);
      expect(result.success).toBe(false);
      if (!result.success)
        expect(result.message).toContain("between 0 and 100");
    });

    it("should return error for 100% win rate", () => {
      const result = getRequiredAttempts(100, 50);
      expect(result.success).toBe(false);
    });

    it("should return error for invalid confidence levels", () => {
      expect(getRequiredAttempts(1, 0).success).toBe(false);
      expect(getRequiredAttempts(1, 100).success).toBe(false);
    });
  });

  describe("Calculation Accuracy", () => {
    const winRate = 1; // 1% chance

    it("calculates 30% confidence correctly", () => {
      const result = getRequiredAttempts(winRate, 30);
      expect(result.success).toBe(true);
      if (result.success) expect(result.attempts).toBe(36);
    });

    it("calculates 50% confidence correctly", () => {
      const result = getRequiredAttempts(winRate, 50);
      expect(result.success).toBe(true);
      if (result.success) expect(result.attempts).toBe(69);
    });

    it("calculates 90% confidence correctly", () => {
      const result = getRequiredAttempts(winRate, 90);
      expect(result.success).toBe(true);
      if (result.success) expect(result.attempts).toBe(230);
    });

    it("calculates 99% confidence correctly", () => {
      const result = getRequiredAttempts(winRate, 99);
      expect(result.success).toBe(true);
      if (result.success) expect(result.attempts).toBe(459);
    });
  });
});
