<template>
  <form @submit="onSubmit" class="form">
    <UiInput
        placeholder="Наименование"
        v-model="name"
        :nameAttrs="nameAttrs"
        type="text"
        class="input"
    />
    <UiInput
        placeholder="Сумма"
        v-model="price"
        :priceAttrs="priceAttrs"
        type="text"
        class="input"
    />
    <UiInput
        placeholder="Email"
        v-model="customerEmail"
        :customerEmailAttrs="customerEmailAttrs"
        type="text"
        class="input"
        :disabled="initDeal?.isEdit"
    />
    <UiInput
        placeholder="Компания"
        v-model="customerName"
        :customerNameAttrs="customerNameAttrs"
        type="text"
        class="input"
        :disabled="initDeal?.isEdit"
    />
    <button class="btn" :disabled="isPending">
      {{isPending ? 'Loading...' : initDeal?.isEdit ? 'Change' : 'Add'}}
    </button>
    <span v-if="initDeal?.isEdit" class="float-right">
      <button  class="btn" :disabled="isPending" @click="() => emit('openForm', initDeal?.isEdit)">Cancel</button>
    </span>
  </form>

</template>

<script lang="ts" setup>

import type {IDeal} from "~/types/deals.types";
import {useForm} from "vee-validate";
import type {ICardFormTrigger} from "~/pages/index.vue";

export interface IDealFormState extends Pick<IDeal, 'name' | 'price'> {
  customer: {
    email: string,
    name: string
  }
  status: string,
  placeInStatus: number
}
const emit = defineEmits(["submit", "reset", "openForm"]);
interface IProps {
  status?: string,
  isPending?: boolean,
  isReset?: boolean,
  initDeal?: ICardFormTrigger,
}
const props = defineProps<IProps>();

const {handleSubmit, defineField, handleReset} = useForm<IDealFormState>({
  initialValues: {
    status: props.status
  }
})

const [name, nameAttrs] = defineField('name')
const [price, priceAttrs] = defineField('price')
const [customerEmail, customerEmailAttrs] = defineField('customer.email')
const [customerName, customerNameAttrs] = defineField('customer.name')

const onSubmit = handleSubmit(values => {
  if (props.initDeal) {
    values.status = props.initDeal?.status ?? ''
    values.placeInStatus = props.initDeal?.placeInStatus ?? 0
    emit("openForm", props.initDeal?.isEdit)
  }
  emit("submit", values)
})
watch(() => props.isReset, (res) => {
  if (res) {
    handleReset()
    emit("reset")
  }
})

onMounted(()=> {
  if (props.initDeal) {
    name.value = props.initDeal?.name ?? ''
    price.value = props.initDeal?.price ?? 0
    customerEmail.value = props.initDeal?.email ?? ''
    customerName.value = props.initDeal?.companyName ?? ''
  }
})

</script>

<style scoped>
.input {
  @apply border-[#161c26] mb-2 placeholder:text-[#748092]
  focus:border-border transition-colors
}
.btn {
  @apply text-xs border py-1 px-2 rounded border-[#161c26]
  hover:border-[#482c65] transition-colors text-[#aebed5]
  hover:text-white;
}
.form {
  @apply mb-3 block;
  animation: show 0.3s ease-in-out;
}
@keyframes show {
  from {
    @apply border-[#a252c83d];
    transform: translateY(-35px);
    opacity: 0.4;
  }
  90% {
    @apply border-[#a252c83d]
  }
  to {
    @apply border-transparent;
    transform: translateY(0);
    opacity: 1;
  }
}

</style>
