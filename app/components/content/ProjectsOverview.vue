<template>
  <section id="hero">
    <div id="headline">
      <h1>
        <div>
          <slot mdc-unwrap="p" />
          <img :src="imageSrc.src" class="img" v-if="imageSrc" />
          <img :src="imageSrc.src" class="blur-img" v-if="imageSrc" />
        </div>
      </h1>
      <div class="description">
        <slot name="description" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  imageSrc?: { src: string; alt: string };
}>();
</script>

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
  overflow-x: clip;
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

.img {
  z-index: -100;
  position: absolute;
  left: 100%;
  width: clamp(280px, 30vw, 480px);
  transform: translate(-10%, -70%);
}
.blur-img {
  position: absolute;
  left: 100%;
  width: clamp(280px, 30vw, 480px);
  z-index: -200;
  transform: translate(-60%, -100%);
  filter: blur(20px);
}
</style>
