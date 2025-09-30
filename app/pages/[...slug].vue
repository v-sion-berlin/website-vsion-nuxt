<script setup lang="ts">
import { withLeadingSlash } from "ufo";
import type { Collections } from "@nuxt/content";

const route = useRoute();
const { locale } = useI18n();
const slug = computed(() => withLeadingSlash(String(route.params.slug)));

const { data: page } = await useAsyncData(
  "page-" + slug.value,
  async () => {
    const collection = ("content_" + locale.value) as keyof Collections;
    const content = await queryCollection(collection).path(slug.value).first();

    return content;
  },
  {
    watch: [locale],
  }
);

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page not found",
    fatal: true,
  });
}

useSeoMeta(page.value.seo);
</script>

<template>
  <!-- Special handling for About page -->
  <HeroAbout v-if="page && slug === '/about'" :page="page.meta" />

  <!-- Default renderer for all other pages -->
  <Home v-else-if="page && slug === '/'" :page="page.meta" />

  <div v-else>
    <h1>Page not found</h1>
    <p>This page doesn't exist in {{ locale }} language.</p>
  </div>
  <!-- <Contact /> -->
</template>
