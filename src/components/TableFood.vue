<template>
    <navbar address="Barbosa" ></navbar>
    <div class="main-content">

        <FoodPhoto/>
        <br />
        <div
            v-for="categoria in categories"
            :key="categoria"
            :ref="`categoria-${categoria.toLocaleUpperCase()}`"
            class="categoria"
        >
        <h2 class="text-center mb-4">{{ categoria }}</h2>
            <div class="row">
                <div
                    v-for="(item, index) in platillosPorCategoria(categoria)"
                    :key="index"
                    class="col-md-4 mb-3 d-flex align-items-stretch"
                >
                    <CardFood :dish="item"  />
                </div>
            </div>
        </div>
    </div>
    <Footer/>
</template>

<script>
import CardFood from "@/components/CardFood.vue";
import Breakfast from '@/assets/breakfast.jpeg';
import Lunch from '@/assets/Lunch.jpg';
import Dinner from '@/assets/Dinner.jpg';
import Footer from "@/components/Footer.vue";
import Navbar from "@/components/Navbar.vue";
import FoodPhoto from "@/components/FoodPhoto.vue";
import axios from "axios";
const categoryTranslations = {
    "Desayuno": "BREAKFAST",
    "Almuerzo": "LUNCH",
    "Cena": "DINNER",
    "Oferta": "OFFER"
};
export default {
    name: "TableFood",
    components: { FoodPhoto, Navbar, Footer, CardFood },
    data() {
        return {
            dishes: [],
            categories: Object.keys(categoryTranslations),
          addons: null,
        };
    },
    methods: {
      async loadAddons() {
        try {
          const response = await axios.get('/api/addons');
          this.addons = response.data;
        }catch (error) {
          console.error('Error cargando los addons:', error);
          this.showErrorToast('Error cargando los addons.');
        }
      },
        async loadDishes() {
            try {
                const response = await axios.get('/api/dishes');
                this.dishes = response.data;
            } catch (error) {
                console.error('Error cargando los platillos:', error);
                this.showErrorToast('Error cargando los platillos.');
            }
        },
        irACategoria(categoria) {
            this.$refs[`categoria-${categoria.toLocaleUpperCase()}`]?.[0]?.scrollIntoView({
                behavior: "smooth",
            });
        },
        platillosPorCategoria(categoria) {
            return this.dishes.filter(
                (dish) => dish.category === categoryTranslations[categoria]
            );
        },
      viewDish(item) {
          console.log(item)

      },
    },created() {
        this.loadDishes();
        this.loadAddons();
    },
};
</script>

<style scoped>
.main-content {
    padding: 2rem 1rem;
}

.categoria {
    margin-bottom: 2rem;
}

.text-center {
    font-weight: bold;
}

.row {
    justify-content: center;
}
.holi{
display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>