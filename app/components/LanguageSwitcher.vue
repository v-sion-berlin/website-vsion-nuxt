<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";

const { locale } = useI18n();

const menuRef = ref<HTMLElement | null>(null);

const props = withDefaults(
  defineProps<{
    mobile?: boolean;
  }>(),
  {
    mobile: false,
  }
);

const showDropdown = ref(false);
const currentLang = ref(locale.value.toUpperCase());
const languages = ["en", "de"];

function toggleDropdown() {
  showDropdown.value = !showDropdown.value;
}

function selectLang(lang: string) {
  locale.value = lang;
  currentLang.value = lang.toUpperCase();
  showDropdown.value = false;
}

function handleClickOutside(event: any) {
  if (!props.mobile && menuRef.value && !menuRef.value.contains(event.target)) {
    showDropdown.value = false;
  }
}

onMounted(() => {
  if (!props.mobile) document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  if (!props.mobile) document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
  <div class="language-switcher" :class="{ mobile }">
    <div class="menu-item" @click="toggleDropdown">
      <span>{{ currentLang }}</span>
      <span v-if="mobile" class="arrow">{{ showDropdown ? "▲" : "▼" }}</span>
    </div>

    <div v-if="showDropdown" class="dropdown">
      <div
        v-for="lang in languages"
        :key="lang"
        class="dropdown-item"
        @click="selectLang(lang)"
      >
        <span>{{ lang.toUpperCase() }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.language-switcher.mobile .dropdown {
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

.language-switcher {
  position: relative;
  display: inline-block;
  font-family: "Montserrat", sans-serif;
}

.menu-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 19px 32px;
  background-color: #31313180;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  font-weight: 500;
  cursor: pointer;
  border-radius: 16px;
  user-select: none;
  min-width: 20px;
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
}

.dropdown-item:hover {
  background-color: #5552527b;
}
</style>
