<template>
    <div class="dish-list">
        <div
            v-for="(dish, index) in dishes"
            :key="index"
            class="dish-item"
        >
            <img :src="dish.image" alt="Dish image" class="dish-image" />
            <div class="dish-info">
                <h3 class="dish-title">{{ dish.name }}</h3>
              <div class="dish-counter">
                    <span class="counter-item">{{ addons.length }} adiciones</span>
                </div>
                <div class="dish-actions">
                    <button @click="openEditModal(dish)" class="action-btn edit-btn">
                        ✏️
                    </button>
                    <button @click="openDeleteModal(dish)" class="action-btn delete-btn">
                        🗑️
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="editDishModal" tabindex="-1" aria-labelledby="editDishModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content bg-dark text-white">
                <div class="modal-header">
                    <h5 class="modal-title" id="editDishModalLabel">Modificar Platillo</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="form-group">
                            <label for="edit-dish-title" class="form-label">Nombre</label>
                            <input type="text" class="form-control" id="edit-dish-title" v-model="dishToEdit.name" required />
                        </div>
                        <div class="form-group">
                            <label for="edit-dish-image" class="form-label">Imagen</label>
                            <input type="file" class="form-control" id="edit-dish-image" @change="uploadImage" required />
                            <img v-if="dishToEdit.image" :src="dishToEdit.image" alt="Dish image" class="preview-image" />
                        </div>

                        <div class="form-group">
                            <div class="form-group">
                                <label for="edit-dish-addons" class="form-label">Adiciones</label>
                                <div>
                                    <span
                                        v-if="addonslength"
                                        v-for="(addon, index) in dishToEdit.addons"
                                        :key="index"
                                        class="btn btn-secondary btn-sm me-1 mb-1"
                                    >
                                        {{ addon.name }}
                                        <span @click="removeAddon(index)" class="emoji-btn">❌</span>
                                    </span>
                                    <span v-else>Ninguno</span>
                                </div>
                            </div>
                        </div>

                            <div class="form-group">
                            <label for="edit-dish-price" class="form-label">Precio</label>
                            <input type="number" class="form-control" id="edit-dish-price" v-model="dishToEdit.price" required />
                        </div>
                        <div class="form-group">
                            <label for="edit-dish-description" class="form-label">Descripción</label>
                            <textarea class="form-control" id="edit-dish-description" v-model="dishToEdit.description" required></textarea>
                        </div>
                        <div class="form-group">
                            <label for="edit-dish-category" class="form-label">Categoría</label>
                            <select class="form-control" id="edit-dish-category" v-model="dishToEdit.category" required>
                                <option value="BREAKFAST">Desayuno</option>
                                <option value="LUNCH">Almuerzo</option>
                                <option value="DINNER">Cena</option>
                                <option value="OFFER">Oferta</option>
                            </select>
                        </div>
                        <div v-show="false" class="progress" style="height: 1rem;">
                            <div
                                class="progress-bar"
                                role="progressbar"
                                :style="{ width: uploadProgress + '%' }"
                                :aria-valuenow="uploadProgress"
                                aria-valuemin="0"
                                aria-valuemax="100"
                            >
                                {{ uploadProgress }}%
                            </div>
                        </div>

                    </form>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-primary" @click="updateDish">Guardar cambios</button>

                </div>

            </div>
        </div>
    </div>


    <div class="modal fade" id="deleteDishModal" tabindex="-1" aria-labelledby="deleteDishModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content bg-dark text-white">
                <div class="modal-header">
                    <h5 class="modal-title" id="deleteDishModalLabel">Eliminar Platillo</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    ¿Está seguro de que desea eliminar este platillo?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-danger" @click="deleteDish">Eliminar</button>
                </div>
            </div>
        </div>
    </div>

    <div class="toast-container position-fixed bottom-0 end-0 p-3" style="z-index: 1100;">
        <div id="errorToast" class="toast bg-dark text-white" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
                <strong class="me-auto">Error</strong>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                {{ errorMessage }}
            </div>
        </div>
    </div>

</template>

<script>
import axios from 'axios';
import {initializeApp} from 'firebase/app';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Modal, Toast } from 'bootstrap';

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
export default {
    data() {
        return {
            dishes: [],
            dishToEdit: {},
            dishToDelete: null,
            errorMessage: '',
            uploadProgress: 0,
          addons: [],
        };
    },
    methods: {
        uploadImage(event) {
            const file = event.target.files[0];
            if (file) {
                const storageRef = storage.ref(`dishes/${file.name}`);
                const uploadTask = storageRef.put(file);

                uploadTask.on(
                    'state_changed',
                    (snapshot) => {
                        this.uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    },
                    (error) => {
                        console.error('Error subiendo la imagen:', error);
                        this.showErrorToast('Error subiendo la imagen.');
                    },
                    async () => {
                        const downloadURL = await storageRef.getDownloadURL();
                        this.dishToEdit.image = downloadURL;
                        this.uploadProgress = 0;
                    }
                );
            }
        },
        addonslength() {
            return this.dishToEdit.addons.length > 0;
        },

        removeAddon(index) {
            this.dishToEdit.addons.splice(index, 1);
        },

        async loadDishes() {
            try {
                const response = await axios.get('/api/dishes');
                this.dishes = response.data;
            } catch (error) {
                console.error('Error cargando los platillos:', error);
                this.showErrorToast('Error cargando los platillos.');
            }
        },async loadAddons(){
          try {
            const response = await axios.get('/api/addons');
            this.addons = response.data;
          } catch (error) {
            console.error('Error cargando los addons:', error);
            this.showErrorToast('Error cargando los addons.');
          }
      },
        openEditModal(dish) {
            this.dishToEdit = { ...dish };
            const editModal = new Modal(document.getElementById('editDishModal'));
            editModal.show();
        },
        async updateDish() {
            try {
                await axios.put(`/api/dishes/${this.dishToEdit.id}`, this.dishToEdit);

                const dishIndex = this.dishes.findIndex((dish) => dish.id === this.dishToEdit.id);

              this.dishes[dishIndex] = this.dishToEdit;
                const editModal = Modal.getInstance(document.getElementById('editDishModal'));
                editModal.hide();
            } catch (error) {
                console.error('Error actualizando el platillo:', error);
                this.showErrorToast('Error actualizando el platillo.');
            }
        },
        openDeleteModal(dish) {
            this.dishToDelete = dish.id;
            const deleteModal = new Modal(document.getElementById('deleteDishModal'));
            deleteModal.show();
        },
        async deleteDish() {
            try {
                 await axios.delete(`/api/dishes/${this.dishToDelete}`)
                this.dishes = this.dishes.filter((dish) => dish.id !== this.dishToDelete);


                const deleteModal = Modal.getInstance(document.getElementById('deleteDishModal'));
                deleteModal.hide();
            } catch (error) {
                console.error('Error eliminando el platillo:', error);
                this.showErrorToast('Error eliminando el platillo.');
            }
        },
        showErrorToast(message) {
            this.errorMessage = message;
            const errorToast = new Toast(document.getElementById('errorToast'));
            errorToast.show();
        },
    },
    created() {
      this.loadAddons();
        this.loadDishes();
    },
};
</script>

<style scoped>

.dish-list {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    margin-left: 20px;
}

.dish-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #222222;
    border-radius: 4px;
    padding: 16px;
    width: 450px;
}

.dish-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
    object-position: center;
    border-radius: 4px;
}

.dish-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-top: 16px;
}

.dish-title {
    font-size: 18px;
    font-weight: bold;
    margin: 0;
}

.dish-counter {
    display: flex;
    gap: 8px;
    font-size: 14px;
}

.counter-item {
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 4px;
    padding: 2px 6px;
}

.dish-actions {
    display: flex;
    gap: 8px;
}

.preview-image {
    margin-top: 8px;
    width: 100%;
    height: 200px;
    object-fit: cover;
    object-position: center;
    border-radius: 4px;
}

.action-btn {
    background-color: transparent;
    border: none;
    font-size: 24px;
    padding: 0;
    cursor: pointer;
}

.edit-btn {
    color: #007bff;
}

.delete-btn {
    color: #dc3545;
}

.emoji-btn {
    cursor: pointer;
    margin-left: 4px;
}


</style>

