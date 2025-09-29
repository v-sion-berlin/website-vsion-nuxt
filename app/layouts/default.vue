<script setup lang="ts">
import Contact from "~/components/Contact.vue";
import Header from "~/components/Header.vue";
</script>

<template>
  <div>
    <Header />
    <slot />
    <Contact />
  </div>
</template>
