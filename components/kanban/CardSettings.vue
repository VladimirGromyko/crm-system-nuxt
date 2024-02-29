<template>
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button
          class="transition-all opacity-5 hover:opacity-100 hover:text-[#a252c8]"
        >
          <Icon
              name="iconamoon:menu-kebab-vertical-circle-light"
              class="fade-in-100 fade-out-0"
              size="35"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent class="w-56 absolute left-5 -top-12 bg-[--muted]">
        <DropdownMenuLabel class="flex align-middle">
          <Icon
              name="i-ion:settings-outline"
              class="w-1em h-1em p-1"
              size="26"
          />
          <span class="pl-2 font-bold">Settings</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator class="opacity-10 bg-[#9f66bd]"/>
        <DropdownMenuGroup>
          <DropdownMenuItem class="focus:bg-[#9f66bd] cursor-pointer flex align-middle opacity-90" @click="editHandler">
            <Icon
                name="i-tdesign:edit"
                class="w-1em h-1em p-1"
                size="26"
            />
            <span class="pl-2 italic">Edit</span>
          </DropdownMenuItem>
          <DropdownMenuItem class="focus:bg-[#9f66bd] cursor-pointer flex align-middle opacity-90">
            <Icon
                name="i-mingcute:delete-2-line"
                class="w-1em h-1em p-1"
                size="26"
            />
            <span class="pl-2 italic">Delete</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
</template>

<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const editHandler = (e: PointerEvent) => {
  
  console.log("hello :", e)
}


</script>

<style scoped>

</style>
