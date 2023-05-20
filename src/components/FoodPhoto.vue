<template>
  <div class="food-photo">
    <h2 id="food-photo-heading"> ¡Tu comida al mejor alcance!</h2>
    <div class="group" role="list" aria-labelledby="food-photo-heading">
      <div
          v-for="(image, index) in images"
          :key="index"
          class="item"
          :style="`--url: url('${image.url}');`"
          @click="expand(index)"
          ref="items"
          role="listitem"
          :aria-label="image.label"
          tabindex="0"
      >
        <div class="overlay" ref="overlays"></div>
        <div class="menu" ref="menus">
          <label>{{ image.label }}</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Fast_Food from '@/assets/Fast-Food.jpg';
import Breakfast from '@/assets/breakfast.jpeg';
import Lunch from '@/assets/Lunch.jpg';
import Dinner from '@/assets/Dinner.jpg';
import { gsap } from 'gsap';

export default {
  data() {
    return {
      images: [
        {
          url: Breakfast,
          label: "Desayuno",
        },
        {
          url: Lunch,
          label: "Almuerzo",
        },
        {
          url: Fast_Food,
          label: "Comida Rapida",
        },
      ],
      expandedIndex: -1,
    };
  },
  methods: {
    expand(index) {
      const items = this.$refs.items;
      const overlays = this.$refs.overlays;
      const menus = this.$refs.menus;

      if (this.expandedIndex === index) {
        this.expandedIndex = -1;
      } else {
        this.expandedIndex = index;
      }

      items.forEach((item, i) => {
        const overlay = overlays[i];
        const menu = menus[i];
        const isExpanded = this.expandedIndex === i;

        gsap.to(item, {
          width: isExpanded ? "25vw" : "10vw",
          duration: 2.5,
          ease: "elastic(1, .3)",
        });

        gsap.to(overlay, {
          opacity: isExpanded ? "1" : "0",
          duration: 2.5,
          ease: "elastic(1, .3)",
        });

        gsap.to(menu, {
          opacity: isExpanded ? "1" : "0",
          duration: 2.5,
          ease: "elastic(1, .3)",
        });
      });
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Rubik+Mono+One&display=swap");

h2 {
  color: #c1783a;
  text-align: center;
  font-size: 40px;
  font-weight: normal;
  letter-spacing: 2px;
  word-spacing: normal;
  line-height: 0.9;
}

.group {
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  text-align: center;
  white-space: pre-wrap;
  overflow: hidden;
}

.item {
  width: 10vw;
  height: 65vh;
  position: relative;
  background-image: var(--url);
  background-position: center;
  background-size: cover;
  margin: 1vw;
  border-radius: 3vw;
  display: inline-block;
  cursor: pointer;
}

.overlay {
  background: rgba(0, 0, 0, 0.5);
  border-radius: 3vw;
  position: absolute;
  height: 65vh;
  width: 100%;
  opacity: auto;
  background: rgba(0, 0, 0, 0.4);
}

.menu {
  position: absolute;
  left: 50%;
  bottom: 0px;
  width: 100%;
  padding-top: 20vh;
  padding-bottom: 10vh;
  border-radius: 0 0 3vw 3vw;
  transform: translateX(-50%);
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8) 50%, rgba(0, 0, 0, 0));
  opacity: 0;
}

.menu label {
  color: #cfd9db;
  display: block;
  font-size: 25px;
  text-transform: capitalize;
  overflow-x: hidden;
  text-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.5);
}

/* Ajustes para dispositivos móviles */
@media (max-width: 600px) {
  .item {
    width: 50vw;
    height: 50vh;
  }

  .overlay {
    height: 50vh;
  }

  .menu {
    padding-top: 10vh;
    padding-bottom: 5vh;
  }
}
</style>
