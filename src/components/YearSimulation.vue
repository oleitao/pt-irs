<script setup lang="ts">
import { defineProps } from "vue";
import { rounded } from "@/lib/utils";
import HighLight from "@/components/HighLight.vue";
import TaxRanksTable from "@/components/TaxRanksTable.vue";
import InfoDialog from "@/components/InfoDialog.vue";
import { SimulationResult } from "@/lib/types";
interface Props {
  results: SimulationResult;
  year: string;
}
defineProps<Props>();
</script>
<template>
  <section class="space-y-4 my-2">
    <div class="flex gap-2">
      <h3 class="scroll-m-20 text-xl font-semibold tracking-tight">
        Resultados para {{ year }}
      </h3>
      <InfoDialog :title="`Escalões de IRS para ${year}`">
        <TaxRanksTable
          :taxableIncome="results.taxableIncome.value"
          :rankIndex="results.normalRankIndex.value"
          :irsRanks="results.irsRanks"
        ></TaxRanksTable>
      </InfoDialog>
    </div>
    <p class="leading-7 [&:not(:first-child)]:mt-6">
      O rendimento colectável de
      <HighLight>{{ results.taxableIncome }}€</HighLight> encontra-se no
      <HighLight>{{ results.normalRankIndex.value + 1 }}</HighLight> escalão de
      IRS o que resulta numa taxa normal de
      <HighLight>{{ results.normalRate100 }}%</HighLight> aplicada sobre
      <HighLight>{{ results.normalRateIncome }}€</HighLight> ({{
        results.normalRate100
      }}% x {{ results.normalRateIncome }}€ =
      {{ rounded(results.normalRateTax.value) }}€)<span
        v-if="results.averageRate"
      >
        e numa taxa média de
        {{ results.averageRate100 }}% aplicada sobre
        <HighLight>{{ results.averageRateIncome }}€</HighLight> ({{
          results.averageRate100
        }}% x {{ results.averageRateIncome }}€ =
        {{ rounded(results.averageRateTax.value) }}€)</span
      >. O resultado é um imposto a pagar de
      <HighLight>{{ rounded(results.taxToPay.value) }}€</HighLight>.
    </p>
  </section>
</template>
