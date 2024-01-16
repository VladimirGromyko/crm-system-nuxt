<template>
  <LayoutLoader v-if="isLoadingStore.loading"/>
  <section v-else :class="{grid: authStore.isAuth}" style="min-height: 100lvh">
    <LayoutSidebar v-if="authStore.isAuth"/>
    <div>
      <slot />
    </div>
  </section>

</template>

<script lang="ts" setup>

import {useAuthStore, useIsLoadingStore} from "~/store/auth.store";
import {account} from '@/lib/utils/appwrite'

const isLoadingStore = useIsLoadingStore()
const authStore = useAuthStore()
const router = useRouter()

onMounted(async () => {
  try {
    const user = await account.get()
    if (user) {
      authStore.set(user)
    }
  } catch (errors) {
      await router.push('/login')
  } finally {
    isLoadingStore.set(false)
  }
})
</script>

<style scoped>
.grid{
  display: grid;
  grid-template-columns: 1fr 6fr;
}
.section{
  //min-height: 100lvh;
}
</style>