<template>
  <section>
    <div id="headline">
      <h1>
        <div>
          <slot mdc-unwrap="p" />
          <div class="project-name">
            <slot name="project-name" mdc-unwrap="p" />
          </div>
          <img :src="imageSrc.src" class="img" v-if="imageSrc" />
          <img :src="imageSrc.src" class="blur-img" v-if="imageSrc" />
        </div>
      </h1>
      <div id="text-container-big">
        <slot name="body" />
      </div>
      <div id="text-container">
        <slot name="sub" />
      </div>
    </div>
  </section>
  <section id="table">
    <div class="table-col" v-if="tableDetails?.tasks?.length">
      <div class="table-header">{{ tableDetails.header.firstCol }}</div>
      <ul class="table-list">
        <li v-for="(task, i) in tableDetails.tasks" :key="i">{{ task }}</li>
      </ul>
    </div>

    <div class="table-col" v-if="tableDetails?.technologies?.length">
      <div class="table-header">{{ tableDetails.header.secondCol }}</div>
      <ul class="table-list">
        <li v-for="(tech, i) in tableDetails.technologies" :key="i">
          {{ tech }}
        </li>
      </ul>
    </div>
  </section>

  <section id="image-slider" v-if="sliderImages?.length">
    <div class="header">{{ sliderHeader }}</div>

    <div class="scroll-wrapper">
      <button
        class="scroll-arrow left"
        v-show="showLeftSliderArrow"
        @click="scrollLeft('.slider')"
      >
        <div class="arrow"><</div>
      </button>

      <div class="slider" ref="sliderRef">
        <div
          v-for="(slide, index) in sliderImages"
          :key="index"
          class="slide-card"
        >
          <img :src="slide.src" :alt="slide.alt" />
          <h2>{{ slide.title }}</h2>
        </div>
      </div>

      <button
        class="scroll-arrow right"
        v-show="showRightSliderArrow"
        @click="scrollRight('.slider')"
      >
        <div class="arrow">></div>
      </button>
    </div>
  </section>

  <section id="projects">
    <div class="header">{{ projectsHeader }}</div>

    <div class="scroll-wrapper">
      <button
        class="scroll-arrow left"
        v-show="showLeftProjectArrow"
        @click="scrollLeft('.grid')"
      >
        <div class="arrow"><</div>
      </button>

      <div class="grid" ref="gridRef">
        <div
          v-for="project in projects"
          :key="project.subTitle"
          class="project-card"
        >
          <NuxtLink :to="localizedPath(project.subTitle!)">
            <img
              v-if="project.coverImage"
              :src="project.coverImage.src"
              :alt="project.coverImage.alt"
            />
            <h2>{{ project.header }}</h2>
          </NuxtLink>
        </div>
      </div>

      <button
        class="scroll-arrow right"
        v-show="showRightProjectArrow"
        @click="scrollRight('.grid')"
      >
        <div class="arrow">></div>
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Collections } from "@nuxt/content";
import { withoutTrailingSlash } from "ufo";
import type { Project } from "~/types/content";

const { locale } = useI18n();

defineProps<{
  imageSrc?: { src: string; alt: string };
  tableDetails?: {
    header: { firstCol: string; secondCol: string };
    tasks?: string[];
    technologies?: string[];
  };
  projectsHeader?: string;
  sliderHeader?: string;
  sliderImages?: { src: string; alt: string; title: string }[];
}>();

function localizedPath(subTitle: string) {
  const isGerman = locale.value === "de";
  return isGerman ? `/de/projects/${subTitle}` : `/projects/${subTitle}`;
}

const { data: projects } = await useAsyncData(
  "projects",
  () =>
    queryCollection(
      withoutTrailingSlash(`projects_${locale.value}`) as keyof Collections
    )
      .where("subTitle", "<>", "projects")
      .all()
      .then(
        (res) => res.map((p) => ({ ...p, ...(p.meta ?? {}) })) as Project[]
      ),
  { watch: [locale] }
);

const sliderRef = ref<HTMLElement | null>(null);
const gridRef = ref<HTMLElement | null>(null);

const showLeftSliderArrow = ref(false);
const showRightSliderArrow = ref(false);
const showLeftProjectArrow = ref(false);
const showRightProjectArrow = ref(false);

function updateArrowVisibility(
  container: HTMLElement,
  leftRef: any,
  rightRef: any
) {
  leftRef.value = container.scrollLeft > 10;
  rightRef.value =
    container.scrollLeft + container.clientWidth < container.scrollWidth - 10;
}

function scrollLeft(selector: string) {
  const el = document.querySelector(selector);
  if (el) el.scrollBy({ left: -300, behavior: "smooth" });
}

function scrollRight(selector: string) {
  const el = document.querySelector(selector);
  if (el) el.scrollBy({ left: 300, behavior: "smooth" });
}

onMounted(() => {
  const update = () => {
    if (sliderRef.value)
      updateArrowVisibility(
        sliderRef.value,
        showLeftSliderArrow,
        showRightSliderArrow
      );
    if (gridRef.value)
      updateArrowVisibility(
        gridRef.value,
        showLeftProjectArrow,
        showRightProjectArrow
      );
  };

  const handleScroll = (e: Event) => update();
  const handleResize = () => update();

  sliderRef.value?.addEventListener("scroll", handleScroll);
  gridRef.value?.addEventListener("scroll", handleScroll);
  window.addEventListener("resize", handleResize);

  update();
  onBeforeUnmount(() => {
    sliderRef.value?.removeEventListener("scroll", handleScroll);
    gridRef.value?.removeEventListener("scroll", handleScroll);
    window.removeEventListener("resize", handleResize);
  });
});
</script>

<style scoped>
.arrow {
  display: flex;
  align-content: center;
  justify-content: center;
}
.scroll-wrapper {
  position: relative;
}

.scroll-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  background: rgba(0, 0, 0, 0.5);
  border: none;
  outline: 1px solid red;
  color: white;
  font-size: 2rem;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  cursor: pointer;
  transition: background 0.2s ease;
}

.scroll-arrow:hover {
  background: rgba(0, 0, 0, 0.8);
}

.scroll-arrow.left {
  left: 0.5rem;
}

.scroll-arrow.right {
  right: 0.5rem;
}

#projects {
  padding: 4rem clamp(0rem, 5vw, 5.625rem) 0 clamp(0rem, 5vw, 5.625rem);
}

#projects .header {
  font-size: clamp(2rem, 5vw, 50px);
  font-weight: 500;
  margin-top: 0;
  margin-bottom: 3rem;
}

.grid {
  display: flex;
  gap: 2rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none; /* hide scrollbar firefox */
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  margin-bottom: 7rem;
}

.grid::-webkit-scrollbar {
  display: none; /* hide scrollbar chrome/safari */
}

.project-card {
  flex: 0 0 320px;
  aspect-ratio: 16/10;
  border-radius: 1rem;
  overflow: hidden;
  position: relative;
  scroll-snap-align: start;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.project-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  filter: brightness(0.8);
  transition: filter 0.3s ease;
}

.project-card:hover img {
  filter: brightness(1);
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

#image-slider {
  padding: 4rem clamp(0rem, 5vw, 5.625rem);
  background-color: #000;
}

#image-slider .header {
  font-size: clamp(2rem, 5vw, 50px);
  font-weight: 500;
  margin-bottom: 3rem;
  color: #fff;
}

.slider {
  display: flex;
  gap: 2rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
}

.slider::-webkit-scrollbar {
  display: none;
}

.slide-card {
  flex: 0 0 60vw;
  aspect-ratio: 16/9;
  border-radius: 1rem;
  overflow: hidden;
  position: relative;
  scroll-snap-align: start;
  cursor: grab;
  transition: transform 0.3s ease;
}

.slide-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  filter: brightness(0.8);
  transition: filter 0.3s ease;
}

.slide-card:hover img {
  filter: brightness(1);
}

.slide-card h2 {
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

#headline {
  position: relative;
  max-width: 100%;
  padding: clamp(10rem, 12vw, 13.75rem) clamp(2rem, 20vw, 19.125rem)
    clamp(2rem, 5vw, 4rem) clamp(0rem, 5vw, 5.625rem);
  overflow-x: clip;
}

#table {
  padding: 4rem clamp(0rem, 5vw, 5.625rem) 0 clamp(0rem, 5vw, 5.625rem);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(288px, 100%), 1fr));
  gap: 7rem;
}

.table-col {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.table-header {
  align-self: flex-start;
  background: #1a1a1a;
  color: white;
  padding: 19px 32px;
  border-radius: 1rem;
  font-size: clamp(16px, 1.5vw, 20px);
  font-weight: 500;
  letter-spacing: 1px;
}

.table-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.table-list li {
  font-size: clamp(1.5rem, 1.5vw, 1.7rem);
  font-weight: 500;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding: 1.5rem 0;
  padding-left: 2rem;
}

.project-name {
  font-weight: 300;
  font-style: italic;
  padding-left: clamp(1rem, 2vw, 5rem);
  display: inline-flex;
}
.project-name * {
  font-weight: inherit;
  font-style: inherit;
  margin: 0;
}
#text-container {
  padding: 0;
  z-index: 200;
  position: relative;
}

#text-container-big {
  font-size: clamp(2rem, 2.5vw, 48px);
  line-height: clamp(2.2rem, 5vw, 64px);
  font-weight: 500;
  margin: 0;
  max-width: 100%;
  word-wrap: break-word;
  z-index: 200;
  position: relative;
}

.blur-img {
  position: absolute;
  left: 100%;
  width: clamp(400px, 50vw, 764px);
  z-index: -200;
}

.img {
  z-index: -100;
  position: absolute;
  left: 100%;
  width: clamp(80px, 10vw, 137px);
}
.blur-img {
  transform: translate(-40%, 0%);
  z-index: -150;
  filter: blur(20px);
}
</style>
