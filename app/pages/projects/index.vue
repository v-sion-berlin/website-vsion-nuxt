<script setup lang="ts">
import { queryCollection } from "#imports";
import { useI18n } from "vue-i18n";
import { withoutTrailingSlash } from "ufo";
import type { Collections } from "@nuxt/content";
import type { ContactData, Project } from "~/types/content";

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
      .then(
        (res) => res.map((p) => ({ ...p, ...(p.meta ?? {}) })) as Project[]
      ),
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

const contactData = computed<ContactData | null>(() => {
  if (!contactDataRaw.value) return null;
  return {
    ...(contactDataRaw.value.meta ?? {}),
    ...(contactDataRaw.value as any),
  };
});
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
  <Contact v-if="contactData" :page="contactData as ContactData" />
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, 400px);
  gap: 2rem;
  padding: clamp(2rem, 5vw, 4rem) clamp(1rem, 10vw, 19.125rem)
    clamp(2rem, 5vw, 4rem) clamp(1rem, 5vw, 5.625rem);
}

.project-card {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
}

.project-card:hover {
  outline: 2px solid #ff153e;
}

.project-card img {
  width: 400px;
  height: 300px;
  border-radius: 16px;
  display: block;
  object-fit: cover;
}
.project-card h2 {
  display: flex;
  position: absolute;
  bottom: 20px;
  left: 20px;
  background-color: #31313180;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  padding: 19px 32px;
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
  cursor: pointer;
  border-radius: 16px;
  color: white;
  font-size: clamp(16px, 2vw, 24px);
  width: max-content;
  margin: 0;
}
</style>
