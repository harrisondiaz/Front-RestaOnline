<template>
<navbar/>
  <div style="margin-top: 6em"/>
<cart-shop/>
</template>

<script>

import {defineComponent} from "vue";
import Navbar from "@/components/Navbar.vue";
import CartShop from "@/components/CartShop.vue";

export default defineComponent({
  components: {CartShop, Navbar}
})
</script>

<style scoped>
.holi{
  margin: 10%;
}
</style>