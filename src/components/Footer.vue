<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { GithubLogoIcon } from "@radix-icons/vue";
</script>
<template>
  <footer class="py-6 md:py-0">
    <div
      class="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row"
    >
      <div
        class="text-center text-sm leading-loose text-muted-foreground md:text-left flex items-center"
      >
        <span class="inline-block">
          Feito por
          <a
            href="https://oleitao.netlify.app/"
            target="_blank"
            class="underline underline-offset-4 font-bold decoration-foreground"
          >
            Pedro Leitão
          </a>
        </span>
        <Button variant="ghost">
          <a href="https://github.com/oleitao/irs" target="_blank">
            <GithubLogoIcon class="w-6 h-fit"></GithubLogoIcon>
          </a>
        </Button>
      </div>

      <div
        class="text-center text-sm leading-loose text-muted-foreground md:text-left flex gap-5"
      >
        <span class="inline-block"> Outras ferramentas: </span>
        <a
          href="https://freelancept.netlify.app/"
          target="_blank"
          class="underline underline-offset-4 font-bold decoration-foreground"
        >
          freelancept
        </a>
        <a
          href="https://debtors.netlify.app/"
          target="_blank"
          class="underline underline-offset-4 font-bold decoration-foreground"
        >
          devedores
        </a>
      </div>
    </div>
  </footer>
</template>
