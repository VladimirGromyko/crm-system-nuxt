<template>
  <div class="p-10">
    <h1 class="font-bold text-2xl mb-10">CRM System</h1>
    <div>
      <UiCard class="mb-3" draggable="true">
        <UiCardHeader role="button">name card</UiCardHeader>
        <UiCardContent>Company</UiCardContent>
        <UiCardFooter>Date</UiCardFooter>
      </UiCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {ICard, IColumn} from "~/components/kanban/kanban.types";

useSeoMeta({
  title: 'Home | CRM System'
})

const dragCardRef = ref<ICard |null>(null)
const sourceColumnRef = ref<IColumn | null>(null)

</script>

<style scoped>

</style>