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

interface ListItem {
  title: string;
  color?: string;
}

const props = defineProps<{
  page: Record<string, ListItem>;
}>();

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
    i18nKey: props.page.code?.title,
    label: "Code & Control",
    color: props.page.code?.color,
  },
  {
    key: "interaction",
    i18nKey: props.page.interaction?.title,
    label: "Interaction",
    color: props.page.interaction?.color,
  },
  {
    key: "operations",
    i18nKey: props.page.operations?.title,
    label: "Operations",
    color: props.page.operations?.color,
  },
  {
    key: "sport",
    i18nKey: props.page.sport?.title,
    label: "Sport",
    color: props.page.sport?.color,
  },
  {
    key: "news",
    i18nKey: props.page.news?.title,
    label: "News",
    color: props.page.news?.color,
  },
  {
    key: "studio",
    i18nKey: props.page.studio?.title,
    label: "Studio & Videowalls",
    color: props.page.studio?.color,
  },
  {
    key: "infographics",
    i18nKey: props.page.infographics?.title,
    label: "Infographics",
    color: props.page.infographics?.color,
  },
  {
    key: "storytelling",
    i18nKey: props.page.storytelling?.title,
    label: "Storytelling",
    color: props.page.storytelling?.color,
  },
];
</script>

<style>
.vertical-menu {
  background-color: var(--color-background);
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
  color: var(--color-text);
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
