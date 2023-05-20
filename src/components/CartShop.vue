
<template>
  <back-button @click="()=>this.$router.push('/')"/>
  <div class="master-container" >
    <div class="card cart">
      <label class="title">Tu carrito</label>
      <div v-if="items.length == 0 " class="card">
        <div class="alert alert-danger" role="alert">No tienes ningun producto en tu carrito</div>
      </div>
      <div class="products" v-for="item in this.items">
        <div v-if="items.length > 0 " class="product">
          <img :src="item.dish.image" class="img" :alt="item.dish.name">
          <div>
            <span>{{item.dish.name}}</span>
            <p>{{item.beverage.name}}</p>
          </div>
          <div class="quantity">
            <button @click="minus(item)">
              <svg fill="none" viewBox="0 0 24 24" height="14" width="14" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" stroke="#47484b" d="M20 12L4 12"></path>
              </svg>
            </button>
            <label>{{item.counter}}</label>
            <button @click="plus(item)">
              <svg fill="none" viewBox="0 0 24 24" height="14" width="14" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" stroke="#47484b" d="M12 4V20M20 12H4"></path>
              </svg>
            </button>
            <button class="btn " @click="remove(item)">🗑️</button>
          </div>
          <label class=" price small">${{calculate(item)}}</label>

        </div>

      </div>
    </div>
    <div class="card coupons">
      <label class="title">Dirección</label>
      <div class="form-floating">
        <input type="text" placeholder="Dirección" class="form-control" v-model="direction" id="direction" required>
        <label for="direction" >Dirección</label>
      </div>
      <label class="title">Metodo de Pago</label>
        <div class="form-floating">
        <select class="form-select" v-model="this.pays" id="pay">
          <option v-for="pays in this.pay" :value="pays">{{pays}}</option>
         </select>
          <label for="pay" >Seleccione el tipo de pago,</label>
        </div >
      <label class="title">Numero de contacto: </label>
      <div class="form-floating">

          <input type="text" placeholder="Celular" id="phone" class="form-control" v-model="phone" required>
          <label for="phone" >+57</label>
      </div>
    </div>
    <div class="card checkout">
      <label class="title">Checkout</label>
      <div class="details">
        <span>Tu subtotal:</span>
        <span>${{subtotal()}}</span>
        <span>Costo del envio:</span>
        <span>${{shiping}}</span>
      </div>
      <div class="checkout--footer">
        <label class="price"><sup>$</sup>{{total()}}</label>
        <button class="btn checkout-btn" @click="finish()">Pagar</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios  from "axios";
import BackButton from "@/components/BackButton.vue";
export default {
  name: "CartShop",
  components: {BackButton},
  data() {
    return {
      items: null,
      shiping: 2500,
      pay:["Efectivo","Tarjeta","Paypal","Mercado Pago","PSE","Nequi","Daviplata"],
      pays: "",
      direction: "",
      phone: "",
      user: null,
      addon: null,
    };
  },
  methods: {
    loadProduct() {
      this.items = JSON.parse(localStorage.getItem("cart"),"dish");
      for (const item in this.items) {
        console.log(this.items[item].dish.image);
      }
    },
    subtotal(){
      let total = 0;
      for (const item in this.items) {
        total += this.items[item].dish.price * this.items[item].counter;
      }
      return total;
    },
    counterItems() {
      const map = {};
      if(this.items !== null){
      this.items.forEach(item => {
        if (map[item.dish.id]) {
          if(map[item.dish.id].counter < 1) {
            map[item.dish.id].counter++;
          }
        } else {
          map[item.dish.id] = {
            dish: item.dish,
            beverage: item.beverage,
            counter: item.counter
          };
        }
      });
    }

      this.items = Object.values(map);
      console.log(this.items);
    },
    total(){
      if(this.items.length > 0){
        return this.subtotal() + this.shiping;
      }else{
        return 0;
      }
    },
    calculate(item){
      return item.dish.price * item.counter;
    },
    plus(item){
      for (const i in this.items) {
        if (this.items[i].dish.id == item.dish.id) {
          this.items[i].counter++;
        }
      }
      localStorage.setItem("cart", JSON.stringify(this.items));
    },
    minus(item){
      for (const i in this.items) {
        if (this.items[i].dish.id == item.dish.id && this.items[i].counter > 0) {
          this.items[i].counter--;
        }
      }
      localStorage.setItem("cart", JSON.stringify(this.items));
    },remove(item){
      if(confirm('¿Estás seguro de que quieres eliminar este artículo?')) {
        let index = this.items.findIndex(i => i.dish.id == item.dish.id);
        if (index !== -1) {
          this.items.splice(index, 1);
        }
        localStorage.setItem("cart", JSON.stringify(this.items));
      }
    },
    finish(){
      if(this.pays == "Seleccione el tipo de pago" || this.pays == "" || this.direction == "" || this.phone == ""){
        alert("Seleccione un metodo de pago, una dirección de envio y un numero de contacto");
        return;
      }else{
        
        print(this);
        try{
          this.createdOrder()
        }finally {
          this.sendTelegramNotification("Nuevo Pedido: \n" + this.notifyOrderCreation() + "Dirección: " + this.direction + "\nMetodo de pago: " + this.pays);
          localStorage.setItem("cart", JSON.stringify([]));
        }

      }
    },
    notifyOrderCreation() {
      let phrase = "";
      for (const item in this.items) {
        phrase += `\n Plato:${this.items[item].dish.name}\nCantidad: ${this.items[item].counter}\n`;
      }
      return phrase;
    },
    sendTelegramNotification(message) {
      const chatId = "272628414";
      const botToken = "6271165402:AAEy3xIW4IzCmJxovr9yd15GjFJHHWJVxz4";
      const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

      axios.post(url, {
        chat_id: chatId,
        text: message,
      })
          .then(response => {
            console.log("Mensaje enviado con éxito");
          })
          .catch(error => {
            console.error("Ocurrió un error al enviar el mensaje", error);
          });
    },
    async createdOrder(){
      try{
        const response = await axios.post("/api/orders", {
          "userId": this.user.id,
          "delivery_address": this.direction,
          "contact_phone": this.phone,
          "status": "PENDING",
          "total": this.total(),
          "orderDetails": this.getDishes(),
          "orderAddons": this.addon,
        });
        console.log(response.data);
        alert("Pedido creado con exito");
      }catch (e) {
        if (e.response && e.response.status === 400) {
          console.error(`Error al crear el pedido`);
        } else {
          console.error('Hubo un error al crear el pedido:', e);
        }
      }
    },getDishes(){
      let dishes = [];
      for (const item in this.items) {
        dishes.push({
          "dish_id": this.items[item].dish.id,
          "quantity": this.items[item].counter,
          "unit_price": this.items[item].dish.price,
          "total_price": this.items[item].dish.price * this.items[item].counter,
          "modification": "",
        });
      }
      console.log(dishes);
      return dishes;
    },async addons(){

      for (const item in this.items) {
        if(this.items[item].beverage !== null){
          this.addon.push({
            "addon_id": this.getAddon(this.items[item].beverage.name)!== null? this.getAddon(this.items[item].beverage.name) : 1,
            "addon_price": 6000,
          });
        }
      }

    },async getAddon(addonName) {
      try {
        const response = await axios.get(`/api/addons/${addonName}`);
        console.log(response.data.id)
        return response.data.id;

      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.error(`Addon con nombre ${addonName} no encontrado`);
        } else {
          console.error('Hubo un error al obtener el addon:', error);
        }
      }
    },
    async getuser(email){
      try {
        const response = await axios.get(`/api/users/${email}`);
        this.user = response.data;

      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.error(`Usuario con email ${email} no encontrado`);
        } else {
          console.error('Hubo un error al obtener el usuario:', error);
        }
      }
    },

  },created() {
    this.loadProduct();
    this.counterItems();
    this.getuser(localStorage.getItem("email"));
    this.addons();
  }, computed(){

  }
}
</script>

<style scoped>
.img{
  width: 60px;
  height: 60px;
  border-radius: 10px;
  margin-right: 10px;
}
.master-container{
  display: flex;
  justify-content: center;
  grid-template-columns: auto;
  gap: 50px;
}

.card {
  width: 400px;
  height: 100%;
  background: #FFFFFF;
  -webkit-box-shadow: 0px 187px 75px rgba(0, 0, 0, 0.01), 0px 105px 63px rgba(0, 0, 0, 0.05), 0px 47px 47px rgba(0, 0, 0, 0.09), 0px 12px 26px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 187px 75px rgba(0, 0, 0, 0.01), 0px 105px 63px rgba(0, 0, 0, 0.05), 0px 47px 47px rgba(0, 0, 0, 0.09), 0px 12px 26px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1);
}

.title {
  width: 100%;
  height: 40px;
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  padding-left: 20px;
  border-bottom: 1px solid #efeff3;
  font-weight: 700;
  font-size: 11px;
  color: #000000;
}

/* cart */
.cart {
  border-radius: 19px 19px 19px 19px;
}

.cart .products {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  padding: 10px;
}

.cart .products .product{
  display: grid;
  grid-template-columns: 60px 1fr 80px 1fr;
  gap: 20px;
}

.cart .products .product span{
  font-size: 13px;
  font-weight: 600;
  color: #47484b;
  margin-bottom: 8px;
  display: block;
}

.cart .products .product p{
  font-size: 11px;
  font-weight: 600;
  color: #7a7c81;
}

.cart .quantity{
  height: 30px;
  display: flex;
  grid-template-columns: 1fr 1fr 1fr;
  margin: auto;
  background-color: #ffffff;
  border: 1px solid #e5e5e5;
  border-radius: 7px;
  -webkit-filter: drop-shadow(0px 1px 0px #efefef)
  drop-shadow(0px 1px 0.5px rgba(239, 239, 239, 0.5));
  filter: drop-shadow(0px 1px 0px #efefef)
  drop-shadow(0px 1px 0.5px rgba(239, 239, 239, 0.5));
}

.cart .quantity label{
  width: 20px;
  height: 30px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  padding-bottom: 2px;
  font-size: 15px;
  font-weight: 700;
  color: #47484b;
}

.cart .quantity button{
  width: 30px;
  height: 30px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  border: 0;
  outline: none;
  background-color: transparent;
  padding-bottom: 2px;
}

.card .small{
  font-size: 15px;
  margin: 0 0 auto auto;
}

.card .small sup{
  font-size: px;
}

/* coupons */
.coupons{
  border-radius: 7px;
}

.coupons form{
  display: grid;
  grid-template-columns: 1fr 80px;
  gap: 10px;
  padding: 10px;
}

.input_field {
  height: 36px;
  padding: 0 0 0 12px;
  border-radius: 5px;
  outline: none;
  border: 1px solid #e5e5e5;
  -webkit-filter: drop-shadow(0px 1px 0px #efefef)
  drop-shadow(0px 1px 0.5px rgba(239, 239, 239, 0.5));
  filter: drop-shadow(0px 1px 0px #efefef)
  drop-shadow(0px 1px 0.5px rgba(239, 239, 239, 0.5));
  -webkit-transition: all 0.3s cubic-bezier(0.15, 0.83, 0.66, 1);
  transition: all 0.3s cubic-bezier(0.15, 0.83, 0.66, 1);
}

.input_field:focus {
  border: 1px solid transparent;
  -webkit-box-shadow: 0px 0px 0px 2px #242424;
  box-shadow: 0px 0px 0px 2px #242424;
  background-color: transparent;
}

.coupons form button{
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  padding: 10px 18px;
  gap: 10px;
  width: 100%;
  height: 36px;
  background: -webkit-gradient(linear, left top, left bottom, from(#4480FF), color-stop(50%, #115DFC), to(#0550ED));
  background: linear-gradient(180deg, #4480FF 0%, #115DFC 50%, #0550ED 100%);
  -webkit-box-shadow: 0px 0.5px 0.5px #EFEFEF, 0px 1px 0.5px rgba(239, 239, 239, 0.5);
  box-shadow: 0px 0.5px 0.5px #EFEFEF, 0px 1px 0.5px rgba(239, 239, 239, 0.5);
  border-radius: 5px;
  border: 0;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  color: #ffffff;
}

/* Checkout */
.checkout{
  border-radius: 9px 9px 19px 19px;
}

.checkout .details{
  display: grid;
  grid-template-columns: 3fr 1fr;
  padding: 10px;
  gap: 5px;
}

.checkout .details span{
  font-size: 13px;
  font-weight: 600;
}

.checkout .details span:nth-child(odd){
  font-size: 11px;
  font-weight: 700;
  color: #707175;
  margin: auto auto auto 0;
}

.checkout .details span:nth-child(even){
  font-size: 13px;
  font-weight: 600;
  color: #47484b;
  margin: auto 0 auto auto;
}

.checkout .checkout--footer {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  border-radius: 0px 0px 20px 20px;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  padding: 10px 10px 10px 20px;
  background-color: #efeff3;
}

.price {
  position: relative;
  font-size: 22px;
  color: #2B2B2F;
  font-weight: 900;
}

.price sup {
  font-size: 13px;
}

.price sub {
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  position: absolute;
  font-size: 11px;
  color: #5F5D6B;
  bottom: 5px;
  display: inline-block;
}



.checkout .checkout-btn {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  width: 150px;
  height: 36px;
  background: -webkit-gradient(linear, left top, left bottom, from(#4480FF), color-stop(50%, #115DFC), to(#0550ED));
  background: linear-gradient(180deg, #4480FF 0%, #115DFC 50%, #0550ED 100%);
  -webkit-box-shadow: 0px 0.5px 0.5px #EFEFEF, 0px 1px 0.5px rgba(239, 239, 239, 0.5);
  box-shadow: 0px 0.5px 0.5px #EFEFEF, 0px 1px 0.5px rgba(239, 239, 239, 0.5);
  border-radius: 7px;
  border: 0;
  outline: none;
  color: #ffffff;
  font-size: 18px;
  font-weight: 600;
  -webkit-transition: all 0.3s cubic-bezier(0.15, 0.83, 0.66, 1);
  transition: all 0.3s cubic-bezier(0.15, 0.83, 0.66, 1);
}


@media screen and (max-width: 700px) {
  .checkout .details{
    grid-template-columns: 1fr;
  }
  .checkout .details span:nth-child(odd){
    margin: auto;
  }
  .checkout .details span:nth-child(even){
    margin: auto;
  }
  .checkout .checkout--footer {
    padding: 10px;
  }

}


@media only screen and (max-width: 1150px) {
  .master-container{
    display: grid;
    padding: 20px;
    gap: 20px;
  }



  .card {
    width: 100%;
    box-sizing: border-box;
  }

  .cart .products .product{
    display: flex;
    flex-direction: column;
  }

  .input_field, .coupons form button {
    width: 100%;
  }
}

@media print {
  body {
    width: 650px;
    margin: 0 auto;
  }

  .master-container {
    box-sizing: border-box;
    padding: 20px;
    width: 100%;
  }

  .card {
    box-sizing: border-box;
    width: 100%;
  }

  .cart .products {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    padding: 10px;
  }

  .cart .products .product {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .cart .quantity {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 30px;
  }

  .price, .price sup, .price sub {
    box-sizing: border-box;
    width: 100%;
  }
}

</style>
