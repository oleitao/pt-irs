<script setup lang="ts">
import { defineProps } from "vue";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { QuestionMarkIcon } from "@radix-icons/vue";
defineProps({
  title: { required: false, type: String },
});
</script>
<template>
  <Dialog>
    <DialogTrigger>
      <QuestionMarkIcon class="w-4 h-4" />
    </DialogTrigger>
    <DialogContent>
      <DialogHeader v-if="title">
        <DialogTitle>{{ title }}</DialogTitle>
      </DialogHeader>
      <slot />
    </DialogContent>
  </Dialog>
</template>
