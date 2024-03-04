<template>
    <UiDropdownMenu>
      <UiDropdownMenuTrigger as-child>
        <Button
          class="transition-all opacity-5 hover:opacity-100 hover:text-[#a252c8]"
          @click="setAutoPlacement"
        >
          <Icon
              name="iconamoon:menu-kebab-vertical-circle-light"
              class="fade-in-100 fade-out-0"
              size="35"
          />
        </Button>
      </UiDropdownMenuTrigger>
      <UiDropdownMenuContent :class="cn('w-56 absolute bg-[--muted]', place)">
        <UiDropdownMenuLabel class="flex align-middle">
          <Icon
              name="i-ion:settings-outline"
              class="w-1em h-1em p-1"
              size="26"
          />
          <span class="pl-2 font-bold">Settings</span>
        </UiDropdownMenuLabel>
        <UiDropdownMenuSeparator class="opacity-10 bg-[#9f66bd]"/>
        <UiDropdownMenuGroup>
          <UiDropdownMenuItem class="focus:bg-[#9f66bd] cursor-pointer flex align-middle opacity-90" @click="editHandler">
            <Icon
                name="i-tdesign:edit"
                class="w-1em h-1em p-1"
                size="26"
            />
            <span class="pl-2 italic">Edit</span>
          </UiDropdownMenuItem>
          <UiDropdownMenuItem class="focus:bg-[#9f66bd] cursor-pointer flex align-middle opacity-90">
            <Icon
                name="i-mingcute:delete-2-line"
                class="w-1em h-1em p-1"
                size="26"
            />
            <span class="pl-2 italic">Delete</span>
          </UiDropdownMenuItem>
        </UiDropdownMenuGroup>
      </UiDropdownMenuContent>
    </UiDropdownMenu>
</template>

<script setup lang="ts">
import {cn} from "~/lib/utils";
const place = ref('left-5 -top-8')
const setAutoPlacement = (e: PointerEvent)=> {
  const innerWidth = e.view?.innerWidth
  const innerHeight = e.view?.innerHeight
  if (innerWidth && innerHeight) {
    if (e.screenY + 80 <= innerHeight) {
      if (e.x + 100 > innerWidth ) {
        place.value = 'right-5 -top-10'
      }
    } else {
      if (e.x + 100 > innerWidth ) {
        place.value = 'right-5 bottom-0'
      } else {
        place.value = 'left-5 bottom-0'
      }
    }
  }
}

const editHandler = (e: PointerEvent) => {

  console.log("hello :", e)
}


</script>

<style scoped>

</style>
