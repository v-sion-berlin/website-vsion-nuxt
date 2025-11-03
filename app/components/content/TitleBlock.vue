<template>
  <section id="hero">
    <div id="headline">
      <div class="headline-content">
        <h1 :class="{ 'text-right': textPos === 'r' }">
          <slot v-if="$slots.default" mdc-unwrap="p" />
        </h1>
        <div class="description">
          <slot name="description" />
        </div>
      </div>

      <div
        class="image-wrapper"
        :class="{
          'image-right': imagePos === 'tr',
          'image-left': imagePos !== 'tr',
        }"
      >
        <img :src="imageSrc.src" v-if="imageSrc" class="main-img" />
        <img :src="imageSrc.src" v-if="imageSrc" class="blur-img" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  imageSrc?: { src: string; alt: string };
  imagePos?: string;
  textPos?: string;
}>();
</script>

<style scoped>
.image-wrapper {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
  pointer-events: none;
}

.text-right {
  display: flex;
  text-align: right;
  position: relative;
  right: -10%;
  justify-content: end;
}

.text-right > * {
  padding: 0;
  margin: 0;
  width: clamp(250px, 60vw, 1000px);
}

.text-right {
  text-wrap-style: pretty;
}

h1 #hero {
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

.headline-content {
  position: relative;
  z-index: 1;
  display: flex;
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

.image-right .main-img {
  position: absolute;
  top: 10%;
  right: -10%;
  width: clamp(20vw, 30vw, 450px);
  z-index: -1;
  transform: translateY(0);
}

.image-right .blur-img {
  position: absolute;
  top: -55%;
  right: 10%;
  width: clamp(20vw, 30vw, 450px);
  filter: blur(20px);
  z-index: -2;
}

.image-left .main-img {
  position: absolute;
  top: 20%;
  left: -21%;
  width: clamp(20vw, 50vw, 700px);
  z-index: -1;
}

.image-left .blur-img {
  position: absolute;
  top: -19%;
  left: 20%;
  width: clamp(20vw, 50vw, 700px);
  filter: blur(20px);
  z-index: -2;
}
</style>
