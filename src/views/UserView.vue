<template>
  <back-button @click="goto('/')"/>
  <div class="container py-5">
    <h2 class="text-center mb-5">Administración de la cuenta</h2>


    <section class="mb-5">
      <h3>Nombres y Apellidos</h3>
      <form>
        <div class="form-group">
          <label for="riotID">Nombre del usuario </label>
          <input type="text" class="form-control" id="riotID" v-model="user.first_name" placeholder="Nombre">
        </div>
        <div class="form-group">
          <label for="lastname">Apellido del usuario </label>
          <input type="text" class="form-control" id="lastname" v-model="user.last_name" placeholder="Apellido">
        </div>

        <button type="submit" class="btn btn-dark mt-3">Guardar Cambios</button>
      </form>
    </section>


    <section class="mb-5">
      <h3>Información Personal</h3>
      <form>
        <div class="form-group">
          <label for="email">Correo Electrónico</label>
          <input type="email" class="form-control" id="email" placeholder="Correo Electrónico" v-model="user.email">
        </div>

        <button type="submit" class="btn btn-dark mt-3">Guardar y Verificar</button>
      </form>
    </section>


    <section class="mb-5">
      <h3>Contraseña</h3>
      <form>
        <div class="form-group">
          <label for="password">Contraseña</label>
          <input type="password" class="form-control" id="password" placeholder="Contraseña">
        </div>
        <div class="form-group">
          <label for="confirmpassword">Confirmar contraseña</label>
          <input type="password" class="form-control" id="confirmpassword" placeholder="Confirmar contraseña">
        </div>
        <!-- Continue with the rest of your fields -->
        <button type="submit" class="btn btn-dark mt-3">Guardar Cambios</button>
      </form>
    </section>


    <div class="text-center">
      <button type="button" class="btn btn-danger" @click="logout">Cerrar Sesión</button>
    </div>
  </div>
</template>

<script>
import { useToast } from "vue-toastification";
import axios from 'axios';
import { getAuth, signOut } from "firebase/auth";
import BackButton from "@/components/BackButton.vue";

export default {
  components: { BackButton },
  data() {
    return {
      user: null,
      email: null,
      password: null,
      confirmPassword: null,
      errors: {},
    };
  },

  methods: {
    async fetchUser() {
      try {
        const response = await axios.get(`/api/users/${this.email}`);
        this.user = response.data;
        console.log(this.user)
      } catch (error) {
        this.toast.error('Error al recuperar los datos del usuario.');
        console.error(error);
      }
    },
    async updateUserName() {
      try {
        await axios.put(`/api/users/${this.user.id}/name`, {
          first_name: this.user.first_name,
          last_name: this.user.last_name,
        });
        this.toast.success('Nombre del usuario actualizado exitosamente.');
      } catch (error) {
        this.toast.error('Error al actualizar el nombre del usuario.');
        console.error(error);
      }
    },
    async updateUserEmail() {
      try {
        await axios.put(`/api/users/${this.user.id}/email`, {
          email: this.user.email,
        });
        this.toast.success('Correo electrónico del usuario actualizado exitosamente.');
      } catch (error) {
        this.toast.error('Error al actualizar el correo electrónico del usuario.');
        console.error(error);
      }
    },
    async updatePassword() {
      if (this.password !== this.confirmPassword) {
        this.errors.password = 'Las contraseñas no coinciden.';
        this.toast.error('Las contraseñas no coinciden.');
        return;
      }
      try {
        await axios.put(`/api/users/${this.user.id}/password`, {
          password: this.password,
        });
        this.toast.success('Contraseña actualizada exitosamente.');
      } catch (error) {
        this.toast.error('Error al actualizar la contraseña.');
        console.error(error);
      }
    },
    logout() {
      const auth = getAuth();
      signOut(auth)
          .then(() => {
            localStorage.removeItem("user");
            localStorage.setItem("isAuthenticated", false)
            localStorage.removeItem("email");
            this.$router.push("/login");
            this.toast.success('Has cerrado la sesión exitosamente.');
          })
          .catch((error) => {
            this.toast.error('Error al cerrar la sesión.');
            console.error("Error al cerrar sesión:", error);
          });
    },
    goto(url){
      this.$router.push(url)
    }
  },
  created() {
    this.toast = useToast();
    this.email = localStorage.getItem("email");
    this.fetchUser();
  }
};
</script>

<style scoped>
.container {
  background-color: #1F1F1F;
}

h2, h3 {
  color: #fff;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  color: #fff;
}

.form-group input {
  color: #000;
}

.btn-dark {
  background-color: #000;
  color: #fff;
}

.btn-danger {
  background-color: #ff0000;
  color: #fff;
}
</style>
