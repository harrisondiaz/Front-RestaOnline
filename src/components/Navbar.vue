<template>
  <div>
    <nav class="navbar navbar-expand-lg fixed-top bg-dark" data-bs-theme="dark">
      <div class="container-fluid">
        <img src="@/components/icons/logoMain.ico" alt="Logo" width="50" height="50">
        <button class="btn navbar-brand name" @click="goto()">RestaOnline</button>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <IconMapPin :size="30" color="red"></IconMapPin>
            </li>
            <li class="nav-item item">
              {{address}}
            </li>
            <li class="nav-item">
              <IconChevronDown :size="30"></IconChevronDown>
            </li>
          </ul>
          <div class="input-group mb-3 input-group-lg search">
            <span class="input-group-text">
              <icon-chef-hat :size="15"></icon-chef-hat>
            </span>
            <input type="text" class="form-control" aria-label="Amount (to the nearest dollar)">
            <span class="input-group-text">
              <icon-search :size="15"></icon-search>
            </span>
          </div>
          <div v-if="isUser()" class="login navbar-nav me-auto d-flex align-items-center" type="button" @click="gotoURL('/users')">
            <icon-user  size="20"></icon-user>
            <p class="login mx-2 mb-0">Hola!, {{ userName }}</p>
          </div>
          <div v-else class="login navbar-nav me-auto d-flex align-items-center" type="button">
            <icon-user  size="20"></icon-user>
            <p class="login mx-2 mb-0" @click="goToLogin">Ingresar</p>
          </div>
          <div style="margin-right: 30px;margin-left: 10px"></div>
          <div class="d-flex align-items-center">
            <div class="vr"></div>
            <icon-shopping-cart @click="goCart()" size="25" type="button" class="ml-3"></icon-shopping-cart>
            <div style="margin-right: 30px;margin-left: 10px"></div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>



<script>
import { IconMapPin } from '@tabler/icons-vue';
import { IconChevronDown } from '@tabler/icons-vue';
import { IconChefHat } from '@tabler/icons-vue';
import { IconSearch } from '@tabler/icons-vue';
import { IconUser } from '@tabler/icons-vue';
import { IconShoppingCart } from '@tabler/icons-vue';
import CartShop from "@/components/CartShop.vue";
export default {
    name: "Navbar",
    components: {
        IconMapPin,
        IconChevronDown,
        IconChefHat,
        IconSearch,
        IconUser,
        IconShoppingCart,
        CartShop,
    },
    props: {
        address: String
    },
    data() {
        return {
            isAuthenticated: false,
            userName: '',
            showCartShop: false,
        };
    },
    methods: {
        goToLogin() {
            this.$router.push('/login')
        },
        goto() {
            this.$router.push('/')
        },gotoURL(path) {
            this.$router.push(path);
        },isUser() {
          console.log(localStorage.getItem("isAuthenticated"))
            if(localStorage.getItem("isAuthenticated") == "true") {
              console.log(this.userName)
                return true;
            } else {
                return false;
            }
        },
        goCart() {
          if(localStorage.getItem("isAuthenticated") == "true") {
            this.$router.push('/shopping-cart')
          }else{
            alert("Debe iniciar sesion para acceder al carrito")
            this.$router.push('/login')
          }
        }
    },
    created() {
        this.isAuthenticated = localStorage.getItem("isAuthenticated");
        this.userName = localStorage.getItem("user");
    }
}
</script>


<style scoped>
nav.navbar {
  display: block;
}

.name {
  font-size: 25px;
  font-family: "Ink Free";
}

.item {
  font-size: 15px;
}

.search {
  margin-left: 30px;
  margin-right: 5%;
}

.login {
  font-size: 15px;
  font-family: Arial;
  user-select: none;
  cursor: pointer;
  word-wrap: normal     ;
}

.login:hover {
  color: green;
}

.vr {
  border-left: 1px solid white;
  height: 24px;
  margin-left: 30px;
  margin-right: 30px;
}
</style>

  