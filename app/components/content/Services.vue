<template>
  <section id="menu">
    <div v-if="menu?.items?.length">
      <ul>
        <li v-for="(item, i) in menu.items" :key="i">
          {{ item }}
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  imageSrc?: { src: string; alt: string };
  menu?: {
    items?: string[];
  };
}>();
</script>

<style scoped>
#menu {
  padding: 4rem clamp(0rem, 5vw, 5.625rem) 0 clamp(0rem, 5vw, 5.625rem);
  z-index: 200;
  position: relative;
}
ul {
  padding: 0;
  display: flex;
  gap: 1rem;
}

li {
  list-style-type: none;
}
</style>
