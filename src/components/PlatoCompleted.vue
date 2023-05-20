<template>
  <back-button @click="()=>this.$router.push('/')"/>
    <div v-if="dish" class="dish-container">
        <div class="left-side">
            <img :src="dish.image" alt="Dish" />
        </div>
        <div class="right-side">
            <h2>{{ dish.name }}</h2>
            <p>{{ dish.description }}</p>
            <h3>Opciones de personalización:</h3>
            <div class="customization-options">
                <div v-for="(option, index) in dish.addons" :key="index" class="option">
                    <input
                        type="checkbox"
                        :id="`option-${index}`"
                        v-model="option.selected"
                    />
                    <label :for="`option-${index}`">{{ option.label }}</label>
                </div>
            </div>
            <p class="h6">Selecciona:</p>
            <select v-model="selectedBeverage" class="beverage-select">
                <option v-for="(beverage, index) in addons" :key="index" :value="beverage">
                    {{ beverage.name }}
                </option>
            </select>
            <div class="buttons">
                <add-car-shopping @click="addToCart"/>
                <ShoppingBTN @click="buyNow"/>
            </div>
        </div>
    </div>
    <div v-else>
        <p>Error: No se ha proporcionado información sobre el platillo.</p>
    </div>
</template>

<script>
import axios from 'axios';
import ShoppingBTN from "@/components/ShoppingBTN.vue";
import AddCarShopping from "@/components/AddCarShopping.vue";
import BackButton from "@/components/BackButton.vue";
import { useToast } from 'vue-toastification';
export default {
    name: "PlatoCompleted",
    props: {
        dishID: {
            type: [Number,String],
            required: true,
        },
    },
    data() {
        return {
          dish: null,
            selectedBeverage: "",
          addons: null,
        };
    },
    methods: {
      async fetchDish() {
        try {
          const response = await axios.get(`/api/dishes/${this.dishID}`);
          this.dish = response.data;
        } catch (error) {
          console.error('Hubo un error al obtener los datos del platillo:', error);
        }
      },async fetchAddons(){
        try {
        const response = await axios.get('/api/addons');
        this.addons = response.data;

        }catch (error) {
          console.error('Hubo un error al obtener los datos del platillo:', error);
        }

      },
        addToCart() {
          const toast = useToast();
            if(localStorage.getItem("isAuthenticated")=='true'  ){
            console.log("Añadir al carrito");
            let cart = JSON.parse(localStorage.getItem("cart"));
            if (!cart) {
                cart = [];
            }
            cart.push({
                dish: this.dish,
                beverage: this.selectedBeverage,
                counter : 1,
            });
            localStorage.setItem("cart", JSON.stringify(cart));
            toast.success("Se ha añadido al carrito");
            }else{
                toast.error("Debes iniciar sesión para poder comprar");
                this.$router.push("/login");
            }
        },
        buyNow() {
          const toast = useToast();
          if(localStorage.getItem("isAuthenticated")=='true'){

            console.log("Comprar ahora");

          let cart = JSON.parse(localStorage.getItem("cart"));
          if (!cart) {
            cart = [];
          }
          cart.push({
            dish: this.dish,
            beverage: this.selectedBeverage,
          });
          localStorage.setItem("cart", JSON.stringify(cart));
          this.$router.push("/shopping-cart");
          toast.success("Se ha añadido al carrito");
          }else{
            toast.error("Debes iniciar sesión para poder comprar");
            this.$router.push("/login");
          }
        },
    },
    components: {
      BackButton,
        ShoppingBTN,
        AddCarShopping
    },
    created() {
      this.fetchDish();
      this.fetchAddons();
      console.log();
    }
};
</script>

<style scoped>
.dish-container {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 1rem;
    max-width: 1200px;
    margin: 0 auto;
}

.left-side {
    width: 50%;
    padding-right: 1rem;
}

.right-side {
    width: 50%;
    padding-left: 1rem;
}

img {
    width: 100%;
    object-fit: cover;
    border-radius: 8px;
}

h2 {
    margin-top: 0;
    margin-bottom: 0.5rem;
    font-size: 2rem;
}

h3 {
    font-size: 1.5rem;
}

.customization-options {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.option {
    display: flex;
    align-items: center;
}

.beverage-select {
    display: block;
    width: 100%;
    padding: 0.5rem;
    margin-top: 0.5rem;
    font-size: 1rem;
    border-radius: 4px;
}

.buttons {
    margin-top: 1rem;
    display: flex;
    gap: 1rem;
}

button {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    cursor: pointer;
    border-radius: 4px;
    border: none;
    outline: none;
    transition: background-color 0.3s;
}

.cart-btn {
    background-color: #f1c40f;
    color: #ffffff;
}

.cart-btn:hover {
    background-color: #d4ad0c;
}
.buy-btn {
    background-color: #2ecc71;
    color: #ffffff;
}

.buy-btn:hover {
    background-color: #28a745;
}

@media (max-width: 767px) {
    .dish-container {
        flex-direction: column;
    }

    .left-side,
    .right-side {
        width: 100%;
    }

    .left-side {
        padding-right: 0;
        margin-bottom: 1rem;
    }

    .right-side {
        padding-left: 0;
    }
}
</style>