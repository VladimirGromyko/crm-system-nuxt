<template>
  <div>
    <USlideover
        v-model="isLocalOpen"
        :ui="{ overlay: { background: 'bg-slate-700/40' } }"
    >
      <UCard class="flex flex-col flex-1 overflow-y-auto"
             :ui="{
                body: {base: 'flex-1'},
                ring: '',
                divide: 'divide-y divide-border',
                rounded: '',
                background: 'bg-slate-900',
             }"
      >
        <template #header>
          <KanbanSlideoverHeader/>
        </template>
        <KanbanSlideoverComments/>
      </UCard>
    </USlideover>
  </div>
</template>

<script setup lang="ts">

import {useDealSlideStore} from "~/store/dealSlide.store";

const store = useDealSlideStore()
const isLocalOpen = computed({
  get: () => store.isOpen,
  set: value => {
    store.isOpen = value
  }

})

</script>

<style scoped>

</style>