<script setup lang="ts">
import { DataItem, SimulationResult } from "@/lib/types";
import { computed } from "vue";
import { rounded } from "@/lib/utils";

import InfoDialog from "@/components/InfoDialog.vue";

// taxable income
interface Props {
  data: DataItem[];
  index: number;
  field: keyof SimulationResult;
}

const props = defineProps<Props>();

const retreiveValue = (index: number): number | null => {
  const field = props.data[index].result[props.field];
  if ("value" in field) {
    const value = field.value;
    if (typeof value !== "number") return null;
    return value;
  }
  return null;
};

const value = computed((): number | null => {
  return retreiveValue(props.index);
});

const previousValue = computed((): number | null => {
  if (props.index === 0) return null;
  return retreiveValue(props.index - 1);
});

const diff = computed((): number | null => {
  if (value.value === null || previousValue.value === null) return null;
  return value.value - previousValue.value;
});

const diffPercentage = computed((): number | null => {
  if (value.value === null || previousValue.value === null) return null;
  return rounded((value.value / previousValue.value - 1) * 100);
});
</script>

<template>
  <span class="font-semibold gap-2 flex items-center">
    <span
      class="text-sm"
      v-if="diff"
      :class="diff > 0 ? 'text-red-400' : 'text-green-400'"
      >{{ diff > 0 ? `+${rounded(diff)}€` : `-${rounded(-diff)}€` }}
    </span>
    <span v-if="diffPercentage" class="text-xs text-muted-foreground">
      {{ diffPercentage }}%</span
    >

    <InfoDialog v-if="diffPercentage">
      Diferença entre esta coluna e a anterior
    </InfoDialog>
  </span>
</template>
