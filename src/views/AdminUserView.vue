<template>
    <admin-narvar></admin-narvar>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <h1>Usuarios</h1>
                <table class="table table-dark">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Correo electrónico</th>
                        <th>Fecha de registro</th>
                        <th>Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="user in users" :key="user.id">
                        <td>{{ user.id }}</td>
                        <td>{{ user.first_name }}</td>
                        <td>{{ user.last_name }}</td>
                        <td>{{ user.email }}</td>
                        <td>{{ user.registration_date }}</td>
                        <td>
                            <button class="btn btn-danger" @click="confirmDelete(user.id)">
                                Eliminar
                            </button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import AdminNarvar from "@/components/AdminNarvar.vue";
import axios from "axios";

export default {
    data() {
        return {
            users: [],
        };
    },
    components: { AdminNarvar },
    async mounted() {
        await this.fetchUsers();
    },
    methods: {
        async fetchUsers() {
            try {
                const response = await axios.get("/api/users");
                this.users = response.data;
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        },
        confirmDelete(id) {
            if (confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
                this.deleteUser(id);
            }
        },
        async deleteUser(id) {
            try {
                await axios.delete(`/api/users/${id}`);
                this.fetchUsers();
            } catch (error) {
                console.error("Error deleting user:", error);
                alert("No se pudo eliminar el usuario. Por favor, inténtalo de nuevo.");
            }
        },
    },
};
</script>

<style scoped>
h1 {
    text-align: center;
}
</style>
