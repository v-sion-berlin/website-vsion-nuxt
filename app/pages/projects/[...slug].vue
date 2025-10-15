<script setup lang="ts">
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { queryCollection } from "#imports";
import { withoutTrailingSlash } from "ufo";
import type { Collections } from "@nuxt/content";

const route = useRoute();
const { locale } = useI18n();

const slug = computed(() => String(route.params.slug ?? ""));

const { data: project } = await useAsyncData(
  `project-${slug.value}`,
  async () =>
    queryCollection(
      withoutTrailingSlash(`projects_${locale.value}`) as keyof Collections
    ).first(),
  { watch: [locale, slug] }
);
console.log("Projects-Details", project.value);
</script>

<template>
  <article v-if="project">
    <ContentRenderer :value="project" class="prose max-w-none" />
  </article>

  <div v-else>
    <h1>Project not found</h1>
  </div>
</template>
