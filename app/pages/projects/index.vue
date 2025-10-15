<script setup lang="ts">
import { queryCollection } from "#imports";
import { useI18n } from "vue-i18n";
import { withoutTrailingSlash } from "ufo";
import type { Collections } from "@nuxt/content";

const { locale } = useI18n();

const { data: overview } = await useAsyncData(
  "projects-overview",
  () =>
    queryCollection(
      withoutTrailingSlash(
        `projects_overview_${locale.value}`
      ) as keyof Collections
    ).first(),
  { watch: [locale] }
);

const { data: projects } = await useAsyncData(
  "projects",
  () =>
    queryCollection(
      withoutTrailingSlash(`projects_${locale.value}`) as keyof Collections
    )
      .all()
      .then((res) => res.map((p) => ({ ...p, ...(p.meta ?? {}) }))),
  { watch: [locale] }
);
</script>

<template>
  <div v-if="overview">
    <ContentRenderer :value="overview" />
  </div>

  <section v-if="projects">
    <div class="grid">
      <div
        v-for="project in projects"
        :key="project.subTitle"
        class="project-card"
      >
        <NuxtLink :to="`/projects/${project.subTitle}`">
          <img
            v-if="project.coverImage"
            :src="project.coverImage.src"
            :alt="project.coverImage.alt"
          />
          <h2>{{ project.header }}</h2>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}
.project-card img {
  width: 100%;
  border-radius: 1rem;
  display: block;
}
.project-card h2 {
  color: white;
  font-family: Montserrat, sans-serif;
  font-size: 1.2rem;
  margin-top: 0.5rem;
}
</style>
