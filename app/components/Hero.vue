<script setup lang="ts">
import { useI18n } from "vue-i18n";
const { t } = useI18n();
import mainImg from "~/assets/bg_main_top_full.png";
</script>

<template>
  <div id="hero">
    <section>
      <img :src="mainImg" class="blur-img" />
      <img :src="mainImg" class="img" />
      <h1>{{ t("hero") }}</h1>
    </section>
  </div>
</template>

<style scoped>
#hero {
  position: relative;
  min-height: clamp(450px, calc(39vh + 38vw), 100vw);
  overflow: hidden;
}

#hero section {
  position: relative;
  max-width: 100%;
  padding: clamp(10rem, 12vw, 13.75rem) clamp(2rem, 10vw, 19.125rem)
    clamp(2rem, 5vw, 4rem) clamp(0rem, 5vw, 5.625rem);
}

.img,
.blur-img {
  position: absolute;
  top: clamp(260px, 25vw, 600px);
  left: 50%;
  width: clamp(40%, 60%, 80%);
}

.img {
  transform: translateX(15%);
  z-index: -100;
}

.blur-img {
  transform: translate(-50%, -50%);
  z-index: -150;
  filter: blur(30px);
}

h1 {
  color: #ffffff;
  font-size: clamp(32px, 6vw, 124px);
  font-family: Montserrat, sans-serif;
  font-weight: 500;
  line-height: 1.2;
  margin: 0;
  z-index: 30;
  max-width: 90%;
  position: relative;
}
</style>
