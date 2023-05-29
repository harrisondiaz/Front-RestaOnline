<template>
  <admin-narvar/>
  <div class="beet">
  <new-button text="Platillo" @click="goto('/admin/products/new')"/>
  <new-button text="Adicional" @click="goto('/admin/addons/new')"/>
  </div>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h1 class="text-center">Productos</h1>
      </div>
    </div>
  </div>
  <DishList/>
</template>

<script>
import axios  from "axios";
import AdminNarvar from "@/components/AdminNarvar.vue";
import NewButton from "@/components/NewButton.vue";
import CardFood from "@/components/CardFood.vue";
import DishList from "@/components/DishList.vue";

export default {
  name: "AdminProductsView",
  components: {
    CardFood,
    NewButton,
    AdminNarvar,
    DishList

  },
  data() {
    return {
      dish: null,

    };
  },
  mounted() {

  },
  methods: {
    goto(path) {
      this.$router.push(path);
    },
    async getDish() {
      try {
        const response = await axios.get("/api/dishes");
        this.dish = response.data;
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>

<style scoped>
.beet{
  display: flex;
}
</style>
