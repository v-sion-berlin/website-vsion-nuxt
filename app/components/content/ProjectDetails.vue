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
  <section id="table">
    <div class="table-col" v-if="table?.tasks?.length">
      <div class="table-header">Unsere Aufgaben</div>
      <ul class="table-list">
        <li v-for="(task, i) in table.tasks" :key="i">{{ task }}</li>
      </ul>
    </div>

    <div class="table-col" v-if="table?.technologies?.length">
      <div class="table-header">Technologien</div>
      <ul class="table-list">
        <li v-for="(tech, i) in table.technologies" :key="i">{{ tech }}</li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  imageSrc?: string;
  table?: {
    tasks?: string[];
    technologies?: string[];
  };
}>();
</script>

<style scoped>
#headline {
  position: relative;
  max-width: 100%;
  padding: clamp(10rem, 12vw, 13.75rem) clamp(2rem, 20vw, 19.125rem)
    clamp(2rem, 5vw, 4rem) clamp(0rem, 5vw, 5.625rem);
  overflow-x: hidden;
}

#table {
  padding: 7.5rem clamp(0rem, 5vw, 5.625rem) 0 clamp(0rem, 5vw, 5.625rem);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(288px, 100%), 1fr));
  gap: 7rem;
}

.table-col {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.table-header {
  align-self: flex-start;
  background: #1a1a1a;
  color: white;
  padding: 19px 32px;
  border-radius: 1rem;
  font-size: clamp(16px, 1.5vw, 20px);
  font-weight: 500;
  letter-spacing: 1px;
}

.table-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.table-list li {
  font-size: clamp(1.5rem, 1.5vw, 1.7rem);
  font-weight: 500;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding: 1.5rem 0;
  padding-left: 2rem;
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
