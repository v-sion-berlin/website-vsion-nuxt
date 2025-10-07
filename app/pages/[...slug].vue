<script setup lang="ts">
import type { HomePage, AboutPage } from "~/types/content";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { queryCollection } from "#imports";
import type { Collections } from "@nuxt/content";

const route = useRoute();
const { locale } = useI18n();

const slug = computed(() => String(route.params.slug ?? ""));

const collectionName = computed<keyof Collections | null>(() => {
  if (slug.value === "") return `home_${locale.value}` as const;
  if (slug.value === "about") return `about_${locale.value}` as const;
  else return null;
});

const { data: rawPage } = await useAsyncData(route.path, async () => {
  if (!collectionName.value) return null;
  const query = queryCollection(collectionName.value);
  const all = await query.all();
  return all[0];
});

const page = computed<HomePage | AboutPage | null>(() => {
  if (!rawPage.value) return null;
  return { ...(rawPage.value.meta ?? {}), ...(rawPage.value as any) };
});
</script>

<template>
  <HeroAbout v-if="page && slug === 'about'" :page="page as AboutPage" />
  <Home v-else-if="page && slug === ''" :page="page as HomePage" />

  <div v-else>
    <h1>Page not found</h1>
    <p>This page doesn't exist in {{ locale }} language.</p>
  </div>
</template>
