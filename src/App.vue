<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ref, computed, Ref, watch } from "vue";
import {
  IRS_RANKS_2023,
  IRS_RANKS_2024_NEW,
  IRS_RANKS_2024_OLD,
} from "./data/irsRanks.ts";
import CurrencyEuro from "@/components/icons/CurrencyEuro.vue";
import { useTax } from "@/composables/tax";
import YearSimulation from "@/components/YearSimulation.vue";
import Table from "@/components/Table.vue";
import Footer from "@/components/Footer.vue";
import { DataItem } from "@/lib/types";
import InfoDialog from "@/components/InfoDialog.vue";
import { GithubLogoIcon } from "@radix-icons/vue";

// specific deductions - currently hardcoded but could be dynamic
const SPECIFIC_DEDUCTIONS = 4104;
// monthly income
const monthlyIncome = ref(1000);

// taxable income
const taxableIncome = ref(10000);

watch(monthlyIncome, () => {
  const result = monthlyIncome.value * 14 - SPECIFIC_DEDUCTIONS;
  taxableIncome.value = result < 0 ? 0 : result;
});

const addIncome = (value: number, income: Ref<number>) => {
  const result = income.value + value;
  income.value = result < 0 ? 0 : result;
};

const addMonthlyIncome = (value: number) => {
  addIncome(value, monthlyIncome);
};

const addTaxableIncome = (value: number) => {
  addIncome(value, taxableIncome);
};

const results2024New = useTax(taxableIncome, IRS_RANKS_2024_NEW);
const results2024Old = useTax(taxableIncome, IRS_RANKS_2024_OLD);
const results2023 = useTax(taxableIncome, IRS_RANKS_2023);

const tableData = computed((): DataItem[] => [
  {
    header: "2023",
    result: results2023,
  },

  {
    header: "2024 (actual)",
    result: results2024Old,
  },
  {
    header: "2024 (novo)",
    result: results2024New,
  },
]);
</script>

<template>
  <section class="absolute top-2 right-0">
    <Button variant="ghost">
      <a href="https://github.com/oleitao/pt-irs" target="_blank">
        <GithubLogoIcon class="w-6 h-fit"></GithubLogoIcon>
      </a>
    </Button>
  </section>
  <div class="container mx-auto my-8 md:my-24 relative">
    <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
      Simulação de IRS nos diferentes anos
    </h1>
    <p class="leading-7 [&:not(:first-child)]:mt-6 text-muted-foreground">
      Foram recentemente aprovadas os
      <a
        class="underline underline-offset-2 hover:text-neutral-600"
        href="https://eco.sapo.pt/2024/06/05/nova-coligacao-negativa-no-parlamento-esquerda-chumba-tabelas-de-irs-da-ad-com-abstencao-do-chega/"
        target="_blank"
        >novos escalões de IRS</a
      >. Este simulador permite comparar os impostos a pagar para os anos de
      2023, 2024 (actual) e 2024 (novo) com base no rendimento coletável (anual)
      ou no rendimento bruto mensal (14 meses).
    </p>
    <div
      class="flex flex-col lg:flex-row items-start justify-start py-12 gap-14"
    >
      <div class="flex flex-col items-start justify-start gap-1">
        <div
          class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-end gap-1"
        >
          <span>Rendimento bruto mensal</span>
          <InfoDialog title="Rendimento bruto mensal">
            <p>
              O rendimento bruto mensal é o valor total que recebe antes de
              descontar impostos, contribuições para a segurança social e outras
              deduções. É assumido que é trabalhor de categoria A ou H, que
              recebe 14 meses e que as deduções à coleta são de 4104€. Consulte
              <a
                class="underline underline-offset-2 hover:text-neutral-600"
                href="https://www.comparaja.pt/blog/escaloes-irs#:~:text=O%20que%20%C3%A9%20o%20rendimento,da%20tua%20categoria%20de%20rendimentos."
                target="_blank"
                >este artigo</a
              >
              para mais informações.
            </p>
          </InfoDialog>
        </div>
        <div
          class="flex flex-col md:flex-row gap-2 items-start md:items-center"
        >
          <div class="relative w-full max-w-sm items-center">
            <Input
              type="number"
              placeholder="Rendimento coletável (€)"
              class="pl-10 touch-manipulation"
              v-model="monthlyIncome"
            />
            <span
              class="absolute start-0 inset-y-0 flex items-center justify-center px-2"
            >
              <CurrencyEuro class="size-6 text-muted-foreground"></CurrencyEuro>
            </span>
          </div>
          <div class="flex gap-1">
            <Button
              variant="outline"
              @click="addMonthlyIncome(-500)"
              :disabled="monthlyIncome <= 0"
              class="touch-manipulation"
              >- 500€</Button
            >
            <Button
              variant="outline"
              @click="addMonthlyIncome(500)"
              class="touch-manipulation"
              >+ 500€</Button
            >
          </div>
        </div>
      </div>

      <div class="flex flex-col items-start justify-start gap-1">
        <div
          class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-end gap-1"
        >
          <span>Rendimento coletável (anual)</span>
          <InfoDialog title="Rendimento coletável (anual)">
            <p>
              O Rendimento coletável (anual) é a diferença entre o rendimento
              bruto anual e as deduções à coleta. É o valor que serve de base
              para calcular o imposto a pagar. É assumido que é trabalhor de
              categoria A ou H, que recebe 14 meses e que as deduções à coleta
              são de 4104€. Consulte
              <a
                class="underline underline-offset-2 hover:text-neutral-600"
                href="https://www.comparaja.pt/blog/escaloes-irs#:~:text=O%20que%20%C3%A9%20o%20rendimento,da%20tua%20categoria%20de%20rendimentos."
                target="_blank"
                >este artigo</a
              >
              para mais informações.
            </p>
          </InfoDialog>
        </div>
        <div
          class="flex flex-col md:flex-row gap-2 items-start md:items-center"
        >
          <div class="relative w-full max-w-sm items-center">
            <Input
              type="number"
              placeholder="Rendimento coletável (€)"
              class="pl-10 touch-manipulation"
              v-model="taxableIncome"
            />
            <span
              class="absolute start-0 inset-y-0 flex items-center justify-center px-2"
            >
              <CurrencyEuro class="size-6 text-muted-foreground"></CurrencyEuro>
            </span>
          </div>
          <div class="flex gap-1">
            <Button
              variant="outline"
              class="touch-manipulation"
              @click="addTaxableIncome(-5000)"
              :disabled="taxableIncome <= 0"
              >- 5000€</Button
            >
            <Button
              variant="outline"
              @click="addTaxableIncome(5000)"
              class="touch-manipulation"
              >+ 5000€</Button
            >
          </div>
        </div>
      </div>
    </div>
    <Table :data="tableData"></Table>
    <div class="my-12">
      <p class="leading-7 [&:not(:first-child)]:mt-6">
        Resultados descritivos da simulação
      </p>
      <div class="flex flex-col gap-4">
        <YearSimulation
          :results="results2023"
          :year="'2023'"
          :taxableIncome="taxableIncome"
          :irsRanks="IRS_RANKS_2023"
        />
        <YearSimulation
          :results="results2024Old"
          :year="'2024 (actual)'"
          :taxableIncome="taxableIncome"
          :irsRanks="IRS_RANKS_2024_OLD"
        />
        <YearSimulation
          :results="results2024New"
          :year="'2024 (novo)'"
          :taxableIncome="taxableIncome"
          :irsRanks="IRS_RANKS_2024_NEW"
        />
      </div>
    </div>
  </div>
  <Footer></Footer>
</template>
