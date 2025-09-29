<template>
  <div id="text-container">
    <main>
      <section>
        <h2>
          {{ t("textblock_leistungen_header") }}
        </h2>
        <p>
          {{ t("textblock_leistungen_body") }}
        </p>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>
