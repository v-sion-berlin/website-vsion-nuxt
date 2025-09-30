<template>
  <nav class="vertical-menu">
    <ul>
      <li
        v-for="item in menuItems"
        :key="item.key"
        :data-text="item.i18nKey"
        :class="{ active: activeItem === item.key }"
        v-on="!canHover ? { click: () => toggleItem(item.key) } : {}"
        :style="`--bg-color: ${item.color}`"
      >
        <span>{{ item.label }}</span>

        <div class="marquee">
          <div class="marquee__inner">
            <span v-for="i in repeatCount" :key="`${item.key}-a-${i}`">
              {{ item.i18nKey }}
              <img :src="Arrow" alt="→" />
            </span>
            <span v-for="i in repeatCount" :key="`${item.key}-b-${i}`">
              {{ item.i18nKey }}
              <img :src="Arrow" alt="→" />
            </span>
          </div>
        </div>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import Arrow from "~/assets/Arrow.svg";
import { onBeforeUnmount, onMounted, ref } from "vue";

interface List {
  list_studio: string;
  list_news: string;
  list_sport: string;
  list_code: string;
  list_interaction: string;
  list_operations: string;
  list_storytelling: string;
  list_infographics: string;
}
const props = defineProps<{
  page: List;
}>();

const { t } = useI18n();
const activeItem = ref<string | null>(null);
const repeatCount = 10;
const canHover = ref(false);

function toggleItem(key: string) {
  if (canHover) return;
  activeItem.value = activeItem.value === key ? null : key;
}

function handleClickOutside(e: MouseEvent) {
  if (!(e.target as HTMLElement).closest(".vertical-menu")) {
    activeItem.value = null;
  }
}

onMounted(() => {
  canHover.value = window.matchMedia("(hover: hover)").matches;

  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});

const menuItems = [
  {
    key: "code",
    i18nKey: props.page.list_code,
    label: "Code & Control",
    color: "#ff9f1c",
  },
  {
    key: "interaction",
    i18nKey: props.page.list_interaction,
    label: "Interaction",
    color: "#9b5de5",
  },
  {
    key: "operations",
    i18nKey: props.page.list_operations,
    label: "Operations",
    color: "#f15bb5",
  },
  {
    key: "sport",
    i18nKey: props.page.list_sport,
    label: "Sport",
    color: "#00b894",
  },
  {
    key: "news",
    i18nKey: props.page.list_news,
    label: "News",
    color: "#0d6efd",
  },
  {
    key: "studio",
    i18nKey: props.page.list_studio,
    label: "Studio & Videowalls",
    color: "#ff153e",
  },
  {
    key: "infographics",
    i18nKey: props.page.list_infographics,
    label: "Infographics",
    color: "#ffd166",
  },
  {
    key: "storytelling",
    i18nKey: props.page.list_storytelling,
    label: "Storytelling",
    color: "#06d6a0",
  },
];
</script>

<style>
.vertical-menu {
  background-color: #000;
  width: 100%;
  max-width: 100%;
  margin-top: 2rem;
}

.vertical-menu ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.vertical-menu li {
  position: relative;
  overflow: hidden;
  isolation: isolate;
  color: #fff;
  font-family: "Montserrat", sans-serif;
  font-size: clamp(20px, 4vw, 40px);
  font-weight: 500;
  line-height: clamp(28px, 5vw, 56px);
  padding: clamp(2rem, 3vw, 3rem) clamp(1rem, 5vw, 19.125rem)
    clamp(2rem, 3vw, 3rem) clamp(1rem, 5vw, 5.625rem);
  border-style: solid;
  border-color: #222;
  border-width: 1px 0;
  cursor: pointer;
}

/* Background animation */
.vertical-menu li::before {
  content: "";
  position: absolute;
  inset: 0;
  background: var(--bg-color);
  transform: scaleY(0);
  transform-origin: bottom;
  border-radius: 80% 80% 0% 0% / 80% 80% 0% 0%;
  transition:
    transform 0.6s cubic-bezier(1, 0, 0.175, 1),
    border-radius 0.6s cubic-bezier(0.65, 0, 0.35, 1);
  z-index: 0;
}
/* safari */
.vertical-menu li.active::before {
  transform: scaleY(1);
  border-radius: 0;
}

.vertical-menu li:hover::before {
  transform: scaleY(1);
  border-radius: 0;
}

/* Text + arrow marquee */
.vertical-menu .marquee {
  position: absolute;
  top: 50%;
  left: 0;
  display: flex;
  width: max-content;
  min-width: 200%;
  white-space: nowrap;
  gap: 2rem;
  transform: translateY(120%);
  opacity: 0;
  z-index: 1;
  transition:
    transform 0.5s ease,
    opacity 0.3s ease;
  overflow: hidden;
}

.vertical-menu .marquee__inner {
  display: flex;
  gap: 2rem;
  animation: marquee 90s linear infinite;
  will-change: transform;
  backface-visibility: hidden;
  transform: translateZ(0);
}

.vertical-menu .marquee span {
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
  will-change: transform;
  font-size: clamp(20px, 4vw, 40px);
  font-style: italic;
  font-weight: 300;
  color: rgba(243, 243, 243, 0.9);
  gap: 2.5rem;
}

.vertical-menu li span {
  position: relative;
  z-index: 2;
  display: inline-block;
  transition:
    transform 0.5s ease,
    opacity 0.3s ease;
}

/* Hover states */
.vertical-menu li:hover .marquee {
  opacity: 1;
  transform: translateY(-50%);
}

.vertical-menu li:hover > span {
  transform: translateY(-120%);
  opacity: 0;
}
/* safari */
.vertical-menu li.active .marquee {
  opacity: 1;
  transform: translateY(-50%);
}

.vertical-menu li.active > span {
  transform: translateY(-120%);
  opacity: 0;
}

@keyframes marquee {
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(-50%, 0, 0);
  }
}
</style>
