<template>
  <admin-narvar/>
    <back-button @click="goto()"/>
  <add-platillo/>
</template>

<script>
import AdminNarvar from "@/components/AdminNarvar.vue";
import AddPlatillo from "@/components/AddPlatillo.vue";
import BackButton from "@/components/BackButton.vue";

export default {
    name: "AdminProductsNew",
    components: {BackButton, AdminNarvar, AddPlatillo},
    methods:{
        goto(){
            this.$router.push("/admin/products");
        }
    }
}
</script>

<style scoped>

</style>