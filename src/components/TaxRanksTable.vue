<script setup lang="ts">
import { formatNumber } from "../lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { IRSRank } from "../lib/types";

// taxable income
interface Props {
  taxableIncome: number;
  rankIndex: number;
  irsRanks: IRSRank[];
}

const props = defineProps<Props>();
const getMin = (rankIndex: number): number | undefined | null => {
  return rankIndex === 0 ? null : props.irsRanks[rankIndex - 1].max;
};
</script>

<template>
  <div class="flex flex-col items-start justify-center">
    <p class="leading-7 [&:not(:first-child)]:mt-6 text-muted-foreground">
      O rendimento colectável <strong>{{ taxableIncome }}€</strong> encontra-se
      no <strong>{{ rankIndex + 1 }}</strong> escalão de IRS
    </p>
    <Table class="">
      <TableHeader>
        <TableRow>
          <TableHead> Rendimento colectável </TableHead>
          <TableHead>Taxa Normal (%)</TableHead>
          <TableHead>Taxa Média (%)</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow
          v-for="(taxRank, index) in irsRanks"
          :key="index"
          :class="
            index === rankIndex && 'outline-dashed outline-2 outline-offset-2  '
          "
        >
          <TableCell class="font-medium">
            <span v-if="getMin(index)">
              <span v-if="taxRank.max">
                De mais de {{ getMin(irsRanks.indexOf(taxRank)) }} - até
                {{ taxRank.max }}
              </span>
              <span v-else>
                Superior a {{ getMin(irsRanks.indexOf(taxRank)) }}
              </span>
            </span>
            <span v-else> Até {{ taxRank.max }} </span>
          </TableCell>
          <TableCell>{{ formatNumber(taxRank.normalRate, 2) }}</TableCell>
          <TableCell>{{
            taxRank.averageRate ? formatNumber(taxRank.averageRate, 3) : "-"
          }}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>
