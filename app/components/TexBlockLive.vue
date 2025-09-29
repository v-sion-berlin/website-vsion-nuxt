<template>
  <div id="text-container" style="padding-top: 0">
    <main>
      <section>
        <h2>
          {{ t("textblock_live_header") }}
          <span style="font-style: italic; font-weight: 300">easy</span>
        </h2>
        <p>
          {{ t("textblock_live_body") }}
        </p>
      </section>
    </main>
  </div>
</template>

<style>
#text-container {
  padding-top: 0;
}
</style>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>
