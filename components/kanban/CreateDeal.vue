<template>
  <div class="text-center mb-2">
    <button
        class="transition-all opacity-5 hover:opacity-100 hover:text-[#a252c8]"
        @click="() => isCreateForm = !isCreateForm"
    >
      <Icon v-if="isCreateForm"
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
  <template v-if="isCreateForm">
    <KanbanFormDeal :isPending="isPending"
                    :status="status"
                    :isReset="isReset"
                    @submit="createSubmit"
                    @reset="handleReset"
    />
  </template>
</template>

<script lang="ts" setup>
import type {IDealFormState} from "~/components/kanban/FormDeal.vue";
import {useCreateDealMutation} from "~/components/kanban/useKanbanQuery";
interface IProps {
  status?: string,
  refetch: Function,
  placeInStatus: number,
}
const props = defineProps<IProps>();

let isReset: boolean = false
const handleReset = () => (isReset = !isReset)

const isCreateForm = ref<boolean>(false)

const {mutate, isPending} = useCreateDealMutation({
  refetch: props.refetch ? props.refetch : null,
  handleReset
})

const createSubmit = (value: IDealFormState) => {
  value.placeInStatus = props.placeInStatus
  mutate(value)
}
</script>

<style scoped>
</style>
