<script setup lang="ts">
import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";
import { onClickOutside } from "@vueuse/core";
import Menu from "~/assets/Menu.svg";

const { locale } = useI18n();
const route = useRoute();
const router = useRouter();

const props = withDefaults(defineProps<{ mobile?: boolean }>(), {
  mobile: false,
});

const menuRef = ref<HTMLElement | null>(null);
const showDropdown = ref(false);
const currentPage = ref("Menu");
const currentLang = ref(locale.value as "en" | "de");

const pagesByLang: Record<"en" | "de", { name: string; path: string }[]> = {
  en: [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
  ],
  de: [
    { name: "Startseite", path: "/" },
    { name: "Über uns", path: "/about" },
    { name: "Dienstleistungen", path: "/services" },
    { name: "Kontakt", path: "/contact" },
  ],
};

const pages = ref(pagesByLang[currentLang.value]);

function toggleDropdown() {
  showDropdown.value = !showDropdown.value;
}

function navigate(path: string) {
  const page = pages.value.find((p) => p.path === path);
  if (page) currentPage.value = page.name;

  router.push(path);
  showDropdown.value = false;
}

watch(
  () => route.path,
  (path) => {
    const page = pages.value.find((p) => p.path === path);
    currentPage.value = page ? page.name : "Menu";
  },
  { immediate: true }
);

watch(locale, (newLocale) => {
  currentLang.value = newLocale as "en" | "de";
  pages.value = pagesByLang[currentLang.value];
  const page = pages.value.find((p) => p.path === route.path);
  currentPage.value = page ? page.name : "Menu";
});

onClickOutside(menuRef, () => {
  showDropdown.value = false;
});
</script>

<template>
  <div ref="menuRef" class="page-menu" :class="{ mobile: props.mobile }">
    <!-- Menu button -->
    <div class="menu-item" @click="toggleDropdown">
      <span class="glow-white">{{ currentPage }}</span>
      <img v-if="!props.mobile" :src="Menu" class="menu-icon" />
      <span v-else class="arrow">{{ showDropdown ? "▲" : "▼" }}</span>
    </div>

    <!-- Dropdown -->
    <div v-if="showDropdown" class="dropdown">
      <div
        v-for="page in pages"
        :key="page.path"
        class="dropdown-item"
        @click="navigate(page.path)"
      >
        <span>{{ page.name }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-menu.mobile .dropdown {
  position: static;
  margin-top: 0;
  background-color: transparent;
  backdrop-filter: none;
  border-radius: 0;
}
.arrow {
  margin-left: auto;
}

span {
  filter: drop-shadow(0 0 8px white);
}

.page-menu {
  position: relative;
  display: inline-block;
  font-family: "Montserrat", sans-serif;
}

.menu-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 19px 32px;
  background-color: #31313180;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  font-weight: 500;
  cursor: pointer;
  border-radius: 16px;
  user-select: none;
  min-width: 160px;
  width: auto;
}

.menu-item:hover {
  background-color: #5552527b;
}

.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #31313180;
  backdrop-filter: blur(8px);
  border-radius: 16px;
  margin-top: 8px;
  overflow: hidden;
  z-index: 50;
  min-width: 100%;
}

.dropdown-item {
  padding: 19px 32px;
  cursor: pointer;
  white-space: nowrap;
  font-size: clamp(0.85rem, 1.5vw, 1rem);
}

.dropdown-item:hover {
  background-color: #5552527b;
}
</style>
