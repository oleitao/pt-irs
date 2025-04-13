import { ComputedRef, Ref } from "vue";

export type IRSRank = {
  max?: number;
  normalRate: number;
  averageRate: number | null;
};

export type SimulationResult = {
  irsRanks: IRSRank[];
  taxableIncome: Ref<number>;
  normalRank: ComputedRef<IRSRank>;
  normalRankIndex: ComputedRef<number>;
  averageRank: ComputedRef<IRSRank>;
  normalRate: ComputedRef<number>;
  normalRate100: ComputedRef<number>;
  averageRate: ComputedRef<number>;
  averageRate100: ComputedRef<number>;
  normalRateIncome: ComputedRef<number>;
  averageRateIncome: ComputedRef<number>;
  normalRateTax: ComputedRef<number>;
  averageRateTax: ComputedRef<number>;
  taxToPay: ComputedRef<number>;
};

export type DataItem = {
  header: string;
  result: SimulationResult;
};
