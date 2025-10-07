<script setup lang="ts">
import type { HomePage } from "~/types/content";

const props = defineProps<{
  page: HomePage;
}>();
</script>

<template>
  <Hero :page="{ hero: page.hero, heroImage: page.heroImage }" />
  <Interview
    :page="{
      interview_header: page.interview_header,
      interview_body: page.interview_body,
      interview_body_part_2: page.interview_body_part_2,
      interview_source_text: page.interview_source_text,
      interview_watch_text: page.interview_watch_text,
    }"
  />
  <TexBlockLive
    :page="{
      textblock_live_header: page.textblock_live_header,
      textblock_live_body: page.textblock_live_body,
    }"
  />
  <TexBlockLeistungen
    :page="{
      textblock_leistungen_header: page.textblock_leistungen_header,
      textblock_leistungen_body: page.textblock_leistungen_body,
    }"
  />
  <List
    :page="{
      list_studio: page.list_studio,
      list_news: page.list_news,
      list_sport: page.list_sport,
      list_code: page.list_code,
      list_interaction: page.list_interaction,
      list_operations: page.list_operations,
      list_storytelling: page.list_storytelling,
      list_infographics: page.list_infographics,
    }"
  />
  <TexBlockMarken
    :page="{
      textblock_marken_header: page.textblock_marken_header,
      textblock_marken_body: page.textblock_marken_body,
    }"
  />
  <TexBlockAnspruch
    :page="{
      textblock_anspruch_header: page.textblock_anspruch_header,
      textblock_anspruch_body: page.textblock_anspruch_body,
      textblock_anspruch_button: page.textblock_anspruch_button,
      textblock_anspruch_button_soon: page.textblock_anspruch_button_soon,
    }"
  />
  <!-- <Contact
    :page="{
      contact_header: page.contact_header,
      contact_button: page.contact_button,
      contact_button_copied: page.contact_button_copied,
    }"
  /> -->
</template>
