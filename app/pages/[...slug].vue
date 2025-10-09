<script setup lang="ts">
import type { HomePage, AboutPage, ContactData } from "~/types/content";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { queryCollection } from "#imports";
import type { Collections } from "@nuxt/content";
import { withoutTrailingSlash } from "ufo";

const route = useRoute();
const { locale } = useI18n();

const slug = computed(() => String(route.params.slug ?? ""));

const collectionName = computed<keyof Collections | null>(() => {
  if (slug.value === "") return `home_${locale.value}` as const;
  if (slug.value === "about") return `about_${locale.value}` as const;
  else return null;
});

const { data: rawPage } = await useAsyncData(
  route.path,
  async () => {
    if (collectionName.value !== null) {
      return queryCollection(
        withoutTrailingSlash(collectionName.value) as keyof Collections
      ).first();
    }
    return null;
  },
  { watch: [locale] }
);

const { data: contactDataRaw } = await useAsyncData(
  `contact-data`,
  () =>
    queryCollection(
      withoutTrailingSlash(`contact_${locale.value}`) as keyof Collections
    ).first(),
  { watch: [locale] }
);

const page = computed<HomePage | AboutPage | null>(() => {
  if (!rawPage.value) return null;
  return { ...(rawPage.value.meta ?? {}), ...(rawPage.value as any) };
});

const contactData = computed<ContactData | null>(() => {
  if (!contactDataRaw.value) return null;
  return {
    ...(contactDataRaw.value.meta ?? {}),
    ...(contactDataRaw.value as any),
  };
});
</script>

<template>
  <HeroAbout v-if="page?.type === 'about'" :page="page as AboutPage" />
  <Home v-else-if="page?.type === 'home'" :page="page as HomePage" />

  <div v-else-if="!page">
    <h1>Page not found</h1>
    <p>This page doesn't exist in {{ locale }} language.</p>
  </div>
  <Contact v-if="contactData" :page="contactData as ContactData" />
</template>
