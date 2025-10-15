<template>
  <section>
    <div id="headline">
      <h1>
        <div>
          <slot mdc-unwrap="p" />
          <div class="project-name">
            <slot name="project-name" mdc-unwrap="p" />
          </div>
          <img :src="imageSrc" class="img" v-if="imageSrc" />
          <img :src="imageSrc" class="blur-img" v-if="imageSrc" />
        </div>
      </h1>
      <div id="text-container-big">
        <slot name="body" />
      </div>
      <div id="text-container">
        <slot name="sub" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  imageSrc?: string;
}>();
</script>

<style scoped>
#headline {
  position: relative;
  max-width: 100%;
  padding: clamp(10rem, 12vw, 13.75rem) clamp(2rem, 20vw, 19.125rem)
    clamp(2rem, 5vw, 4rem) clamp(0rem, 5vw, 5.625rem);
  overflow: hidden;
}

.project-name {
  font-weight: 300;
  font-style: italic;
  padding-left: clamp(1rem, 2vw, 5rem);
  display: inline-flex;
}
.project-name * {
  font-weight: inherit;
  font-style: inherit;
  margin: 0;
}
#text-container {
  padding: 0;
  z-index: 200;
  position: relative;
}

#text-container-big {
  font-size: clamp(2rem, 2.5vw, 48px);
  line-height: clamp(2.2rem, 5vw, 64px);
  font-weight: 500;
  margin: 0;
  max-width: 100%;
  word-wrap: break-word;
  z-index: 200;
  position: relative;
}

.blur-img {
  position: absolute;
  left: 100%;
  width: clamp(400px, 50vw, 764px);
  z-index: -200;
}

.img {
  z-index: -100;
  position: absolute;
  left: 100%;
  width: clamp(80px, 10vw, 137px);
}
.blur-img {
  transform: translate(-40%, 0%);
  z-index: -150;
  filter: blur(20px);
}
</style>
