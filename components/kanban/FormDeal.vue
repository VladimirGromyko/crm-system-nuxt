<template>
  <form v-if="isOpenForm" @submit="onSubmit" class="form">
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
    />
    <UiInput
        placeholder="Компания"
        v-model="customerName"
        :customerNameAttrs="customerNameAttrs"
        type="text"
        class="input"
    />
    <button class="btn" :disabled="isPending">
      {{isPending ? 'Загрузка...' : 'Добавить'}}
    </button>
  </form>
</template>

<script lang="ts" setup>

import type {IDeal} from "~/types/deals.types";
import {useForm} from "vee-validate";

export interface IDealFormState extends Pick<IDeal, 'name' | 'price'> {
  customer: {
    email: string,
    name: string
  }
  status: string,
  placeInStatus: number
}
const emit = defineEmits(["createSubmit", "reset"]);
const props = defineProps({
  status: {
    type: String,
    default: ''
  },
  isOpen: {
    type: Boolean,
    default: false
  },
  isPending: {
    type: Boolean,
    default: false
  },
  resetStatus: {
    type: Boolean,
    default: false
  }
})
const isOpenForm = ref<boolean>(false)
watch(() => props.isOpen, (value) => {
  isOpenForm.value = value
})

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
  emit("createSubmit", values)
})
watch(() => props.resetStatus, (reset) => {
  if (reset) {
    handleReset()
    emit("reset")
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
