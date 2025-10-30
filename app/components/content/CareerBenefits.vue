<template>
  <div>
    <main>
      <section class="cards-benefits">
        <h1>
          <slot name="cardHeader" mdc-unwrap="p" />
        </h1>
        <div class="card" v-for="card in cards">
          <h2>{{ card.header }}</h2>
          <p>{{ card.body }}</p>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  cards?: { header: string; body: string }[];
}>();
</script>

<style scoped>
.cards-benefits {
  padding: clamp(2rem, 5vw, 4rem) clamp(1rem, 10vw, 19.125rem)
    clamp(2rem, 5vw, 4rem) clamp(1rem, 5vw, 5.625rem);
}
</style>
