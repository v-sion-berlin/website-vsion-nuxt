<template>
  <section id="hero">
    <div id="headline">
      <h1>
        <slot mdc-unwrap="p" />
      </h1>
      <div class="description">
        <slot name="description" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts"></script>

<style scoped>
#hero {
  position: relative;
  min-height: max-content;
}

#headline {
  position: relative;
  max-width: 100%;
  padding: clamp(10rem, 12vw, 13.75rem) clamp(2rem, 10vw, 19.125rem)
    clamp(2rem, 5vw, 4rem) clamp(0rem, 5vw, 5.625rem);
}

.description {
  margin-top: 2rem;
  color: var(--color-text);
  font-size: clamp(16px, 1.5vw, 32px);
  font-family: Montserrat, sans-serif;
  font-weight: 400;
  max-width: 70%;
  line-height: 1.6;
}
</style>
