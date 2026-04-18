import { createSignal } from "solid-js";
import { getRequiredAttempts } from "./calculator";

const [winRate, setWinRate] = createSignal(50);

export function useStore() {
  return {
    winRate,
    updateWinRate: (input: number) => setWinRate(input),
    attemptsFor30: () => getRequiredAttempts(winRate(), 30),
    attemptsFor50: () => getRequiredAttempts(winRate(), 50),
    attemptsFor90: () => getRequiredAttempts(winRate(), 90),
    attemptsFor99: () => getRequiredAttempts(winRate(), 99),
  };
}
