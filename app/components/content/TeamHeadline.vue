<template>
  <section>
    <h1>
      <span class="cursiv">{{ teamTransformed.cursivWord1 }}</span>
      {{ teamTransformed.headerLine1 }}
      <span class="cursiv">{{ teamTransformed.cursivWord2 }}</span>
      {{ teamTransformed.headerLine2 }}
    </h1>
    <h1>
      <span class="cursiv">{{ teamTransformed.cursivWord1 }}</span>
      {{ teamTransformed.headerLine1 }}
      <span class="cursiv">{{ teamTransformed.cursivWord2 }}</span>
      {{ teamTransformed.headerLine2 }}
    </h1>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
const { locale } = useI18n();
const route = useRoute();
const slug = computed(() => String(route.params.slug ?? ""));

const { data: team } = await useAsyncData(
  `team-${locale.value}-1`,
  () => {
    return queryCollection(`team_${locale.value}`).first();
  },
  { watch: [locale, slug] }
);

const teamTransformed = computed<any>(() => {
  if (!team.value) return null;
  return { ...(team.value.meta ?? {}), ...(team.value as any) };
});
</script>

<style scoped>
section {
  padding: clamp(10rem, 12vw, 13.75rem) 0 clamp(2rem, 5vw, 4rem)
    clamp(0rem, 5vw, 5.625rem);
  overflow: hidden;
}

h1 {
  white-space: nowrap;
}

h1:nth-of-type(1) {
  transform: translateX(clamp(10vw, 23vw, 30vw));
}

h1:nth-of-type(2) {
  transform: translateX(clamp(-77vw, -77vw, -15vw));
}

.cursiv {
  font-style: italic;
  font-weight: 300;
  word-break: break-all;
}

@media (max-width: 575px) {
  h1 {
    white-space: unset;
  }

  h1:nth-of-type(1) {
    transform: unset;
  }

  h1:nth-of-type(2) {
    transform: unset;
    display: none;
  }
}
</style>
