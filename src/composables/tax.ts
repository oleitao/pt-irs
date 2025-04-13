// mouse.js
import { computed, Ref } from "vue";
import { IRSRank, SimulationResult } from "../lib/types";
import { rounded } from "../lib/utils";

// by convention, composable function names start with "use"
export function useTax(
  taxableIncome: Ref<number>,
  irsRanks: IRSRank[],
): SimulationResult {
  // ranks
  const normalRank = computed((): IRSRank => {
    return irsRanks.find((rank) => {
      if (rank.max) {
        return taxableIncome.value <= rank.max;
      }
      return true;
    })!;
  });
  const normalRankIndex = computed((): number => {
    return irsRanks.indexOf(normalRank.value);
  });
  const averageRank = computed((): IRSRank => {
    return irsRanks[normalRankIndex.value - 1];
  });

  // rates
  const normalRate = computed((): number => {
    return normalRank.value.normalRate / 100;
  });

  // rates
  const normalRate100 = computed((): number => {
    return rounded(normalRate.value * 100);
  });

  const averageRate = computed((): number => {
    const rank = averageRank.value;
    return rank ? (rank.averageRate ? rank.averageRate / 100 : 0) : 0;
  });

  const averageRate100 = computed((): number => {
    return rounded(averageRate.value * 100);
  });

  // income
  const normalRateIncome = computed((): number => {
    return taxableIncome.value - averageRateIncome.value;
  });
  const averageRateIncome = computed((): number => {
    return averageRank.value?.max || 0;
  });

  // taxes
  const normalRateTax = computed((): number => {
    return normalRateIncome.value * normalRate.value;
  });
  const averageRateTax = computed((): number => {
    return averageRateIncome.value * averageRate.value;
  });

  const taxToPay = computed((): number => {
    return averageRateTax.value + normalRateTax.value;
  });

  // expose managed state as return value
  return {
    irsRanks,
    taxableIncome,
    normalRank,
    normalRankIndex,
    averageRank,
    normalRate,
    normalRate100,
    averageRate,
    averageRate100,
    normalRateIncome,
    averageRateIncome,
    normalRateTax,
    averageRateTax,
    taxToPay,
  };
}
