<template>
<admin-narvar></admin-narvar>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h1 class="text-center">Bienvenido al panel de administración</h1>
      </div>
    </div>
  </div>

</template>

<script>
import AdminNarvar from "@/components/AdminNarvar.vue";

export default {
    name: "AdminView",
    components: {AdminNarvar}
}
</script>

<style scoped>

</style>