import { renderHook } from "@solidjs/testing-library";
import { expect, it, describe } from "vitest";
import { useStore } from "./calculator.store";
import { getRequiredAttempts } from "./calculator";

describe("useStore", () => {
  it("updates attempts when winRate changes", () => {
    const { result } = renderHook(() => useStore());

    // Initial check (assuming 50% winRate)
    expect(result.winRate()).toBe(50);
    const initial30 = result.attemptsFor30();

    // Update winRate
    result.updateWinRate(20);

    // Verify change
    expect(result.winRate()).toBe(20);
    expect(result.attemptsFor30()).not.toBe(initial30);
    expect(result.attemptsFor30()).toStrictEqual(getRequiredAttempts(20, 30));
  });
});
