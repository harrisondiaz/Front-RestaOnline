<template>
<Navbar/>
  <div style="margin-top: 6em"/>

 <TableFood />
    <cookie-banner></cookie-banner>

</template>

<script>
import Navbar from "@/components/Navbar.vue";
import FoodPhoto from "@/components/FoodPhoto.vue";
import TableFood from "@/components/TableFood.vue";
import CookieBanner from "@/components/CookieBanner.vue";
import AddPlatillo from "@/components/AddPlatillo.vue";
import PlatoCompleted from "@/components/PlatoCompleted.vue";
import Plate from "@/assets/breakfast.jpeg"
export default {
    name: "Home",
    components: {
        Navbar,
        FoodPhoto,
        TableFood,
        CookieBanner,PlatoCompleted,AddPlatillo
    },data() {
        return {

        };
    },methods: {

    }
}
</script>

<style scoped>
FoodPhoto{
    position: sticky;
    top: 1000px;
    left: 0;

}
</style>