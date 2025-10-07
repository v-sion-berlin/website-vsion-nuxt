<script setup lang="ts">
import type { Collections } from "@nuxt/content";

const route = useRoute();
const { locale } = useI18n();
const slug = computed(() => String(route.params.slug));
const collection = computed(
  () => ("content_" + locale.value) as keyof Collections
);

const { data: rawPage } = await useAsyncData(
  route.path,
  () => {
    return queryCollection(collection.value).path(route.path).first();
  },
  {
    watch: [locale],
  }
);

const page = computed(() => {
  if (!rawPage.value) return null;
  return {
    ...rawPage.value,
    ...rawPage.value.meta,
  };
});

// if (!page.value) {
//   throw createError({
//     statusCode: 404,
//     statusMessage: "Page not found",
//     fatal: true,
//   });
// }

if (page.value?.seo) {
  useSeoMeta(page.value.seo);
}
</script>

<template>
  <!-- Special handling for About page -->
  <HeroAbout v-if="page && slug === 'about'" :page="page.meta" />

  <!-- Default renderer for all other pages -->
  <Home v-else-if="page && slug === ''" :page="page.meta" />

  <div v-else>
    <h1>Page not found</h1>
    <p>This page doesn't exist in {{ locale }} language.</p>
  </div>
  <!-- <Contact /> -->
</template>
