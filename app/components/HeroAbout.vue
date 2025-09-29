<template>
  <div id="hero" v-if="about">
    <!-- Hero Section -->
    <section id="headline">
      <img :src="about.heroImage" class="blur-img" />
      <img :src="about.heroImage" class="img" />
      <h1>{{ t("about_hero") }}</h1>
      <h2>{{ t("about_subheader") }}</h2>
    </section>

    <!-- Cards Section -->
    <section id="card-section">
      <div class="card" v-for="card in cards" :key="card.title">
        <h3>{{ card.title }}</h3>
        <p v-html="card.address"></p>
        <p v-if="card.phone" v-html="card.phone"></p>
      </div>
    </section>

    <!-- Amtsgericht Section -->
    <section id="card-section-long">
      <div class="card">
        <p>
          Amtsgericht Berlin Charlottenburg <br />
          HRB 119 647
        </p>
      </div>
    </section>
  </div>

  <div v-else>Loading...</div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { computed } from "vue";

interface Card {
  title: string;
  address: string;
  phone?: string;
}

interface About {
  heroImage: string;
  meta: {
    cards: Card[];
  };
}

const { t } = useI18n();

const { data: aboutData } = await useAsyncData("about", async () => {
  const result = await queryCollection("about").all();
  return result as unknown as About[];
});

const about = computed<About | undefined>(() => aboutData.value?.[0]);
const cards = computed<Card[]>(() => about?.value?.meta.cards ?? []);
</script>

<style scoped>
#hero {
  position: relative;
  overflow: hidden;
  min-height: max-content;
}

#hero #headline {
  position: relative;
  max-width: 100%;
  padding: clamp(10rem, 12vw, 13.75rem) clamp(2rem, 20vw, 19.125rem)
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
  transform: translate(-50%, 50%);
  z-index: -150;
  filter: blur(30px);
}

h1 {
  color: #ffffff;
  font-size: clamp(32px, 6vw, 124px);
  font-family: Montserrat, sans-serif;
  font-weight: 500;
  margin: 0;
  z-index: 30;
  max-width: 90%;
  position: relative;
}

h2 {
  color: #ffffff;
  font-size: clamp(16px, 4vw, 100px);
  font-family: Montserrat, sans-serif;
  font-weight: 500;
  z-index: 30;
  max-width: 70%;
  position: relative;
}

h3 {
  color: #ffffff;
  font-size: clamp(16px, 2vw, 48px);
  font-family: Montserrat, sans-serif;
  font-weight: 500;
  margin: 0;
  z-index: 30;
  position: relative;
}

p {
  margin-bottom: 0;
  font-size: clamp(10px, 2vw, 32px);
}

#card-section {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  padding: clamp(10rem, 12vw, 13.75rem) clamp(2rem, 0vw, 19.125rem) 2rem
    clamp(0rem, 5vw, 5.625rem);
}

.card {
  background-color: #31313180;
  backdrop-filter: blur(8px);
  border-radius: 16px;
  padding: 48px;
  flex: 1 1 200px;
}

#card-section-long {
  display: flex;
  padding: 0 clamp(2rem, 0vw, 19.125rem) clamp(2rem, 4vw, 4rem)
    clamp(0rem, 5vw, 5.625rem);
}

#card-section-long p {
  margin: 0;
}
</style>
