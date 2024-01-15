<template>
  <section class="grid section" style="min-height: 100lvh">
    <LayoutSidebar />
    <div>
      <slot />
    </div>
  </section>

</template>

<script lang="ts" setup>
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