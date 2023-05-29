<template>
  <admin-narvar/>
  <back-button @click="goto('/admin')"/>
  <div class="addon-form">
    <h1>Añadir nuevo Adicional</h1>
    <form @submit.prevent="createAddon">
      <div class="form-group">
        <label for="addon-name">Nombre del adicional</label>
        <input v-model="addonName" id="addon-name" type="text" placeholder="Ingrese nombre del Adicional">
      </div>
      <button class="b-t-n" type="submit">Crear</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import { useToast } from 'vue-toastification';
import BackButton from "@/components/BackButton.vue";
import AdminNarvar from "@/components/AdminNarvar.vue";
export default {
  name: "AdminAddonsNew",
  components: {AdminNarvar, BackButton},
  data() {
    return {
      addonName: ''
    }
  },
  methods: {
    async createAddon() {
      const toast = useToast();
      try {
        await axios.post('/api/addons', { name: this.addonName });
        toast.success('Adicional creado correctamente');
        this.addonName = '';
      } catch (error) {
        console.error('Error creating addon:', error);
        toast.error('Error creando el adicional');
      }
    },
    goto(path) {
      this.$router.push(path);
    }
  }
}
</script>

<style scoped>
.addon-form {
  background-color: #333;
  color: #fff;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 8px;
}

h1 {
  margin-bottom: 20px;
  text-align: center;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 10px;
}

input {
  display: block;
  width: 100%;
  padding: 10px;
  border: 2px solid #555;
  border-radius: 4px;
  background-color: #444;
  color: #fff;
}

.b-t-n {
  display: block;
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #00a148;
  color: #fff;
  cursor: pointer;
}

.b-t-n:hover {
  background-color: #017328;
}
</style>
