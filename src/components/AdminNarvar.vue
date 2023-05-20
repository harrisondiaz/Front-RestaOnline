<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <router-link to="/admin" class="navbar-brand">Dashboard</router-link>

            <button
                    class="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#adminNavbar"
                    aria-controls="adminNavbar"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="adminNavbar">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <router-link to="/admin/users" class="nav-link">Usuarios</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/admin/products" class="nav-link">Productos</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/admin/orders" class="nav-link">Pedidos</router-link>
                    </li>
                  <li class="nav-item">
                        <router-link to="/admin/informs" class="nav-link">Informes</router-link>
                    </li>
                </ul>

                <ul class="navbar-nav ml-auto">
                    <li class="nav-item">
                        <a class="nav-link" @click.prevent="logout">Cerrar sesión</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
import { getAuth, signOut } from "firebase/auth";
import { useToast } from "vue-toastification";
export default {
    methods: {
        logout() {
          const toast = useToast();
            const auth = getAuth();
            signOut(auth)
                .then(() => {
                    toast.success("Sesión cerrada correctamente");
                    this.$router.push("/login");
                })
                .catch((error) => {
                    console.error("Error al cerrar sesión:", error);
                });
        },
    },
};
</script>

<style scoped>
.navbar {
    margin-bottom: 20px;
}
</style>
