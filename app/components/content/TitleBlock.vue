<template>
  <section id="hero">
    <div id="headline">
      <h1>
        <div>
          <span :class="textPos === 'r' ? 'text-right' : ''">
            <slot />
          </span>
          <div class="image-wrapper">
            <img
              :src="imageSrc.src"
              :class="imagePos === 'tr' ? 'img-top-right' : 'img-top-left'"
              v-if="imageSrc"
            />
            <img
              :src="imageSrc.src"
              :class="
                imagePos === 'tr' ? 'blur-img-top-right' : 'blur-img-top-left'
              "
              v-if="imageSrc"
            />
          </div>
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
  imagePos?: string;
  textPos?: string;
}>();
</script>

<style scoped>
.image-wrapper {
  position: relative;
  width: 100%;
  height: auto;
  overflow: visible;
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
  width: clamp(250px, 45vw, 1000px);
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

.description {
  margin-top: 2rem;
  color: var(--color-text);
  font-size: clamp(16px, 1.5vw, 32px);
  font-family: Montserrat, sans-serif;
  font-weight: 400;
  max-width: 70%;
  line-height: 1.6;
}

.img-top-right {
  z-index: -100;
  position: absolute;
  left: 100%;
  width: clamp(250px, 30vw, 480px);
  transform: translate(-10%, -70%);
}

.blur-img-top-right {
  position: absolute;
  left: 100%;
  width: clamp(250px, 30vw, 480px);
  z-index: -200;
  transform: translate(-60%, -100%);
  filter: blur(20px);
}

.img-top-left,
.blur-img-top-left {
  position: absolute;
}

.img-top-left {
  z-index: -100;
  left: -10%;
  top: clamp(40%, 30vw, 60%);
  width: clamp(200px, 60vw, 900px);
  transform: translate(-25%, -75%);
}

.blur-img-top-left {
  z-index: -200;
  left: 0%;
  top: 45%;
  width: clamp(200px, 60vw, 900px);
  transform: translate(30%, -100%);
  filter: blur(20px);
}
</style>
