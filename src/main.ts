import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import 'boxicons/css/boxicons.min.css';
import './assets/main.css';
import 'vue-toastification/dist/index.css';
import Toast from "vue-toastification";
import axios from "axios";

// @ts-ignore
const toastOptions = {
    transition: "Vue-Toastification__bounce",
    maxToasts: 3,
    newestOnTop: true,
    position: "top-right",
    timeout: 3000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: false,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: true,
    closeButton: "button",
    icon: true,
    rtl: false
};

//axios.defaults.baseURL = 'http://localhost:3030/';
axios.defaults.baseURL = 'https://back-restaonline-production.up.railway.app';

const app = createApp(App);

app.use(router);
app.use(Toast, toastOptions)


app.mount('#app');
