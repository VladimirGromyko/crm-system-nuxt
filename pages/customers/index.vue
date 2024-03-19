<template>
  <div class="p-10">
    <h1>Наши клиенты</h1>
    <div v-if="isLoading">Loading...</div>
    <UiTable v-else>
      <UiTableHeader>
        <UiTableRow>
          <UiTableHead class="w-[200px]">Изображение</UiTableHead>
          <UiTableHead class="w-[300px]">Наименование</UiTableHead>
          <UiTableHead class="w-[200px]">Email</UiTableHead>
          <UiTableHead>Откуда пришел</UiTableHead>
        </UiTableRow>
      </UiTableHeader>
      <UiTableBody>
        <UiTableRow v-for="customer in customers" :key="customer.$id">
          <UiTableCell>
            <NuxtLink :href="`/customers/edit/${customer.$id}`">
              <img :src="customer.avatar_url"
                   :alt="customer.name"
                   :width="50"
                   :height="50"
                   class="rounded-full"
              />
            </NuxtLink>
          </UiTableCell>
          <UiTableCell class="font-medium">{{ customer.name }}</UiTableCell>
          <UiTableCell>{{ customer.email }}</UiTableCell>
          <UiTableCell>{{ customer.from_source }}</UiTableCell>

        </UiTableRow>
      </UiTableBody>
    </UiTable>
  </div>
</template>

<script setup lang="ts">
import type {ICustomer} from "~/types/deals.types";
import {useCustomersQuery} from "~/pages/customers/useCustomersQuery";

useSeoMeta({
  title: 'Customers | CRM System'
})
const {data, isLoading} = useCustomersQuery()
const customers = computed(() => data.value?.documents as unknown as ICustomer[])

</script>

<style scoped>

</style>
