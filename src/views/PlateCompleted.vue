<template>
  <Navbar address="Barbosa"></Navbar>
  <div style="margin-top: 6em" />
  <PlatoCompleted :dishID="id"></PlatoCompleted>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import PlatoCompleted from "@/components/PlatoCompleted.vue";
import Plate from "@/assets/breakfast.jpeg";
export default {
    name: "PlateCompleted",
    components: { Navbar, PlatoCompleted },
    props: {
        id: {
            type: [String, Number],
            required: true,
        },
    },
};


</script>

<style scoped>

</style>