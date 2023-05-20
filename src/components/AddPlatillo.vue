<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card text-bg-dark">
                    <div class="card-header text-center bg-dark text-light">
                        <h2>Agregar nuevo platillo</h2>
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="submitForm">
                            <div class="form-group mb-3">
                                <label class="form-label" for="nombre">Nombre del platillo</label>
                                <input type="text" class="form-control" id="nombre" v-model="dish.name" required />
                            </div>

                            <div class="form-group mb-3">
                                <label for="descripcion" class="form-label">Descripción</label>
                                <textarea class="form-control" id="descripcion" rows="3" v-model="dish.description" required></textarea>
                            </div>

                            <div class="form-group mb-3">
                                <label for="imagen" class="form-label">Imagen</label>
                                <input type="file" class="form-control" id="imagen" accept="image/*" @change="onFileSelected" required />
                            </div>

                            <div class="form-group mb-3">
                                <label for="precio" class="form-label">Precio</label>
                                <input type="number" class="form-control" id="precio" min="0" step="0.01" v-model="dish.price" required />
                            </div>

                            <div class="form-group mb-3">
                                <label for="categoria" class="form-label">Categoría</label>
                                <select class="form-control" id="categoria" v-model="dish.category" required>
                                    <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
                                </select>
                            </div>

                            <div class="form-group mb-3">
                                <label for="addons" class="form-label">Adicionales</label>
                                <select
                                    class="form-control"
                                    id="addons"
                                    v-model="nuevoAddon"
                                >
                                    <option disabled value="">Selecciona un adicional</option>
                                    <option v-for="addon in dish.addons" :key="addon.id" :value="addon">{{ addon.name }}</option>
                                </select>
                                <button @click.prevent="agregarAddon" class="btn btn-info mt-2">Agregar  adicional</button>
                                <ul class="list-group mt-2">
                                    <li
                                        v-for="(addon, index) in addons"
                                        :key="index"
                                        class="list-group-item d-flex justify-content-between align-items-center"
                                    >
                                        {{ addon.name }}
                                        <button @click.prevent="eliminarAddon(index)" class="btn btn-danger btn-sm">Eliminar</button>
                                    </li>
                                </ul>
                            </div>




                            <button type="submit" class="btn btn-dark border">Agregar platillo</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <toast-component :show="showError" :text="errorMessage" type="error"></toast-component>
    <toast-component :show="showSuccess" :text="successMessage" type="success"></toast-component>

</template>

<script>
import axios from "axios";
import {initializeApp} from 'firebase/app';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import ToastComponent from '@/components/ToastComponent.vue';

const firebaseConfig = {
    apiKey: "AIzaSyA4je8Hj4YE7QdXc45JxFKMrIc5SA18d84",
    authDomain: "restaonline-77461.firebaseapp.com",
    projectId: "restaonline-77461",
    storageBucket: "restaonline-77461.appspot.com",
    messagingSenderId: "835150019775",
    appId: "1:835150019775:web:adfb916bd5c185d9cd9a0a"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const categoryTranslations = {
    "Desayuno": "BREAKFAST",
    "Almuerzo": "LUNCH",
    "Cena": "DINNER",
    "Oferta": "OFFER"
};
export default {
    data() {
        return {
            dish: {
                name: "",
                description: "",
                image: null,
                price: "",
                category: null,
                addons:[],
                nuevoAddon: "",
            },
            categories: Object.keys(categoryTranslations),
            addons:[],
            showError: false,
            errorMessage: '',
            showSuccess: false,
            successMessage: '',
        };
    },
    methods: {
        onFileSelected(event) {
            this.dish.image = event.target.files[0];
            console.log('Archivo de imagen seleccionado:', this.dish.image);
        },
        async submitForm() {
            try {
                if (!this.dish.image) {
                    throw new Error("No se seleccionó ninguna imagen.");
                }


                const storageRef = ref(storage);
                const imageName = `${Date.now()}-${this.dish.image.name}`;
                const imageRef = ref(storageRef, `images/${imageName}`);
                const snapshot = await uploadBytesResumable(imageRef, this.dish.image);
                this.dish.image = await getDownloadURL(snapshot.ref);

                const imageUrl = await getDownloadURL(imageRef);
                console.log('URL de la imagen:', imageUrl);
                this.dish.image = imageUrl;

                this.dish.category = categoryTranslations[this.dish.category];

                const dishResponse = await axios.post('api/dishes', this.dish);
                const dishId = dishResponse.data.id;

                this.successMessage = 'El platillo se ha agregado con éxito';
                this.showSuccess = true;
                setTimeout(() => {
                    this.showSuccess = false;
                }, 5000);
                this.$router.push('/admin/products');
            } catch (error) {
                console.error(error);
                if (error.message === "No se seleccionó ninguna imagen.") {
                    this.errorMessage = 'No se seleccionó ninguna imagen. Por favor, selecciona una imagen antes de agregar el platillo.';
                } else {
                    this.errorMessage = 'Ocurrió un error al agregar el platillo. Por favor, inténtalo de nuevo.';
                }
                this.showError = true;
                setTimeout(() => {
                    this.showError = false;
                }, 5000);
            }
        },
        agregarAddon() {
            if (this.nuevoAddon) {
                this.addons.push(this.nuevoAddon);
                this.dish.nuevoAddon = null;
            }
        },
        eliminarAddon(index) {
            this.addons.splice(index, 1);
        },
        async fetchAddons() {
            try {
                const response = await axios.get('/api/addons');
                this.dish.addons = response.data;
            } catch (error) {
                console.error(error);
            }
        },
    },created() {
        this.fetchAddons();
    },components: {
        ToastComponent,
    },
};
</script>


<style scoped>
.card {
    font-size: 1.1rem;
}
</style>
