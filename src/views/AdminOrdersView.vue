<template>
  <admin-narvar/>
  <div>
    <h1 class="text-center">Pedidos</h1>
  </div>
  <table class="table">
    <thead class="table-dark">
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Nombre Cliente</th>
      <th scope="col">Plato</th>
      <th scope="col">Estado</th>
      <th scope="col">Total</th>
      <th scope="col">Acciones</th>
    </tr>
    </thead>
    <tbody>
    <tr class="table-dark" v-for="order in orders" :key="order.order_id">
      <th scope="row">{{ order.order_id }}</th>
      <td>{{ order.customer_first_name }} {{order.customer_last_name}}</td>
      <td>{{ order.dish_name }}</td>
      <td>
        <select class="form-select" v-model="order.statusInSpanish" @change="changeOrderStatus(order)">
          <option value="Pendiente">Pendiente</option>
          <option value="Preparándose">Preparando</option>
          <option value="Enviado">Enviado</option>
          <option value="Entregado">Entregado</option>
          <option value="Cancelado">Cancelado</option>
        </select>
      </td>
      <td>{{ order.total }}</td>
      <td>
        <button class="btn btn-danger" @click="deleteOrder(order.order_id)">Eliminar</button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>

import AdminNarvar from "@/components/AdminNarvar.vue";
import axios from "axios";
import { useToast } from 'vue-toastification';

export default {
  name: "AdminOrders",
  components: {
    AdminNarvar,
  },
  data() {
    return {
      orders: null,
      orderStatusTranslations: {
        PENDING: 'Pendiente',
        PREPARING: 'Preparándose',
        SENT: 'Enviado',
        DELIVERED: 'Entregado',
        CANCELED: 'Cancelado'
      },
      orderStatusTranslationsReverse: {
        Pendiente: 'PENDING',
        Preparándose: 'PREPARING',
        Enviado: 'SENT',
        Entregado: 'DELIVERED',
        Cancelado: 'CANCELED'
      },
    };
  },
  methods: {
    async fetchOrders() {
      const toast = useToast();

      try {
        const response = await axios.get("/api/orders");
        this.orders = response.data.map(order => ({
          ...order,
          statusInSpanish: this.orderStatusTranslations[order.status]
        }));
        console.log(this.orders)
      } catch (error) {
        toast.error("Hubo un error al obtener los datos del platillo.");
      }
    },
    async changeOrderStatus(order) {
      const toast = useToast();

      if (window.confirm('¿Estás seguro de que quieres cambiar el estado de esta orden?')) {
        try {
          const statusInEnglish = this.orderStatusTranslationsReverse[order.statusInSpanish];
          const response = await axios.put(`/api/orders/${order.order_id}`, {
            id: order.order_id,
            status: statusInEnglish
          });

          toast.success("El estado de la orden ha sido actualizado correctamente.");

          this.fetchOrders();
        } catch (error) {
          toast.error("Hubo un error al cambiar el estado de la orden.");
        }
      }
    },
    async deleteOrder(orderId) {
      const toast = useToast();

      if (window.confirm('¿Estás seguro de que quieres eliminar esta orden?')) {
        try {
          const response = await axios.delete(`/api/orders/${orderId}`);

          toast.success("La orden ha sido eliminada correctamente.");

          this.fetchOrders();
        } catch (error) {
          toast.error("Hubo un error al eliminar la orden.");
        }
      }
    }
  },
  mounted() {
    this.fetchOrders();
  },
};
</script>


<style scoped>
.table {
  margin-top: 20px;
}
</style>
