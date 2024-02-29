<template>
  <div class="text-center mb-2">
    <button
        class="transition-all opacity-5 hover:opacity-100 hover:text-[#a252c8]"
        @click="isOpenForm = !isOpenForm"
    >
      <Icon v-if="isOpenForm"
            name="radix-icons:arrow-up"
            class="fade-in-100 fade-out-0"
            size="35"
      />
      <Icon v-else
            name="radix-icons:plus-circled"
            class="fade-in-100 fade-out-0"
            size="35"
      />

    </button>
  </div>
  <KanbanFormDeal :isOpen="isOpenForm"
                  :isPending="isPending"
                  :status="status"
                  :resetStatus="resetStatus"
                  @createSubmit="createSubmit"
                  @reset="handleReset"
  />
</template>

<script lang="ts" setup>
import {useMutation} from "@tanstack/vue-query";
import {v4 as uuid4} from 'uuid'
import type {IDeal} from "~/types/deals.types";
import {DB} from "~/lib/utils/appwrite";
import {COLLECTION_DEALS, DB_ID} from "~/app.constants";

const isOpenForm = ref<boolean>(false)

interface IDealFormState extends Pick<IDeal, 'name' | 'price'> {
  customer: {
    email: string,
    name: string
  }
  status: string,
  placeInStatus: number
}

const props = defineProps({
  status: {
    type: String,
    default: ''
  },
  refetch: {
    type: Function
  },
  placeInStatus: {
    type: Number,
    default: 0
  }
})

let resetStatus: boolean = false
const handleReset = () => (resetStatus = !resetStatus)


const {mutate, isPending} = useMutation({
  mutationKey: ['create a new deal'],
  mutationFn: (data: IDealFormState) => DB.createDocument(DB_ID, COLLECTION_DEALS, uuid4(), data),
  onSuccess() {
    props.refetch && props.refetch()
    handleReset()
  },
})

const createSubmit = (value: any) => {
  value.placeInStatus = props.placeInStatus
  mutate(value)
}

</script>

<style scoped>
</style>
