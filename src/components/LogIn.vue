<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card bg-dark text-white">
                    <div class="card-body form-container">
                        <transition name="swap-cards">
                            <form class="form" v-if="!showRegisterForm" @submit.prevent="login" key="login">
                                <h2 class="text-center">Iniciar sesión</h2>
                                <div class="form-group">
                                    <label for="login-email">Correo electrónico</label>
                                    <input type="email" class="form-control" id="login-email" v-model="loginEmail" required />
                                </div>
                                <div class="form-group">
                                    <label for="login-password">Contraseña</label>
                                    <input type="password" class="form-control" id="login-password" v-model="loginPassword" required />
                                </div>
                                <button type="submit" class="btn btn-primary">Iniciar sesión</button>
                                <div class="mt-3">
                                    <GoogleButton @click.native="signInWithGoogle" />

                                </div>
                                <p class="text-center mt-3">
                                    ¿No tienes cuenta? <a href="#" @click.prevent="toggleForms" class="text-primary">Registrarse</a>
                                </p>
                            </form>
                        </transition>
                        <transition name="swap-cards">
                            <div v-if="showRegisterForm" key="register">
                                <h3 class="text-center mb-3">Registro</h3>
                                <div v-show="successMessage" class="alert alert-success" role="alert">
                                    {{ successMessage }}
                                </div>
                                <div v-show="errorMessage" class="alert alert-danger" role="alert">
                                    {{ errorMessage }}
                                </div>
                                <div class="mb-3">
                                    <google-button @click="signInWithGoogle"/>
                                </div>
                                <form @submit.prevent="submitRegisterForm">
                                    <div class="form-group">
                                        <label for="register_nombre">Nombre</label>
                                        <input type="text" class="form-control" id="register_nombre" v-model="register.first_name" required />
                                    </div>
                                    <div class="form-group">
                                        <label for="register_apellido">Apellido</label>
                                        <input type="text" class="form-control" id="register_apellido" v-model="register.last_name" required />
                                    </div>
                                    <div class="form-group">
                                        <label for="register_email">Correo electrónico</label>
                                        <input type="email" class="form-control" id="register_email" v-model="register.email" required />
                                    </div>
                                    <div class="form-group">
                                        <label for="register_password">Contraseña</label>
                                        <input type="password" class="form-control" id="register_password" v-model="register.password" required @input="validatePassword" />
                                    </div>
                                    <div class="form-group">
                                        <label for="register_password_confirm">Confirmar contraseña</label>
                                        <input type="password" class="form-control" id="register_password_confirm" v-model="register.confirmPassword"                                        required @input="validatePassword" />
                                    </div>
                                    <div class="form-group">
                                        <label for="register_phone">Teléfono</label>
                                        <div class="input-group">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text">+57</span>
                                            </div>
                                            <input type="tel" class="form-control" id="register_phone" v-model="register.phone" required />
                                        </div>
                                    </div>
                                    <button type="submit" class="btn btn-primary" :disabled="!passwordValid">Registrarse</button>
                                </form>
                                <div class="text-center mt-3">
                                    <p>¿Ya estás registrado? <a href="#" @click.prevent="toggleForms">Inicia sesión</a></p>
                                </div>
                            </div>
                        </transition>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>




<script>
import axios from 'axios';
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { IconBrandGoogle } from '@tabler/icons-vue';
import GoogleButton from "@/components/GoogleButton.vue";
import { useToast } from 'vue-toastification';
const firebaseConfig = {
  apiKey: "AIzaSyA4je8Hj4YE7QdXc45JxFKMrIc5SA18d84",
  authDomain: "restaonline-77461.firebaseapp.com",
  projectId: "restaonline-77461",
  storageBucket: "restaonline-77461.appspot.com",
  messagingSenderId: "835150019775",
  appId: "1:835150019775:web:adfb916bd5c185d9cd9a0a"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

export default {
  data() {
    return {
      showRegisterForm: false,
      loginEmail: "",
      loginPassword: "",
      register: {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: ""
      }
    };
  },
  computed: {
    passwordValid() {
      return this.register.password === this.register.confirmPassword;
    }
  },
  methods: {
    async login() {
      const toast = useToast();
      try {
        const response = await axios.post('/api/login', {
          email: this.loginEmail,
          password: this.loginPassword
        });

        if (response.data.role === 'ADMINISTRATOR') {
          toast.success('Bienvenido administrador');
          this.$router.push('/admin');
        } else {
          toast.success(`Bienvenido ${response.data.first_name} ${response.data.last_name}`);
          this.$router.push('/');
          localStorage.setItem('isAuthenticated', 'true')
          localStorage.setItem('user', response.data.first_name + ' ' + response.data.last_name);
          localStorage.setItem('email', response.data.email);
        }
      } catch (error) {
        console.error('Error al iniciar sesión:', error.message);
        this.$emit('auth-error', 'Error al iniciar sesión: ' + error.message);
      }
    },
    async registerUser() {
      if (!this.passwordValid) {
        console.error('Las contraseñas no coinciden');
        return;
      }
      const toast = useToast();
      try {
        await createUserWithEmailAndPassword(auth, this.register.email, this.register.password);
        await axios.post('/api/register', {
          first_name: this.register.first_name,
          last_name: this.register.last_name,
          email: this.register.email,
          password: this.register.password,
          phone: this.register.phone
        });
        localStorage.setItem('user', this.register.first_name + ' ' + this.register.last_name);
        console.log("Usuario autenticado:", this.register);
        localStorage.setItem('isAuthenticated', true);
        localStorage.setItem('email', this.register.email);
        this.$router.push('/');
        toast.success('Usuario registrado correctamente');
      } catch (error) {
        console.error('Error al registrar el usuario:', error.message);
        this.$emit('auth-error', 'Error al registrar el usuario: ' + error.message);

      }
    },
    toggleForms() {
      this.showRegisterForm = !this.showRegisterForm;
    },
    signInWithGoogle() {
      const toast = useToast();
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
          .then(async (result) => {
            const user = result.user;
            console.log("Iniciando sesión con Google:", user);

            const response = await axios.get(`/api/users/${user.email}`);

            if (response.data.length === 0) {
              const randomPassword = Math.random().toString(36).slice(-8);
              await axios.post('/api/register', {
                first_name: user.displayName.split(' ')[0],
                last_name: user.displayName.split(' ')[1] || '',
                email: user.email,
                phone: user.phoneNumber || '',
                password: randomPassword,
              });
              console.log("Usuario autenticado:", user);
              localStorage.setItem('isAuthenticated', true);
              localStorage.setItem('user', user.displayName);
              localStorage.setItem('email', user.email);
            }

            this.$router.push('/');
            toast.success('Bienvenido ' + user.displayName);
          })
          .catch((error) => {
            console.error("Error al iniciar sesión con Google:", error);
            this.$emit('auth-error', 'Error al iniciar sesión con Google: ' + error.message);
          });
    },
    submitRegisterForm() {
      this.registerUser();
    }
  },
  mounted() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("Usuario autenticado:", user);
        localStorage.setItem('isAuthenticated', true);
        localStorage.setItem('user', user.displayName);
        localStorage.setItem('email', user.email);
        if (this.$route.path !== '/') {
          this.$router.push("/");
        }
      } else {
        console.log("Usuario no autenticado");
        localStorage.setItem('isAuthenticated', false);
      }
    });
  },
  components: {
    IconBrandGoogle,
    GoogleButton
  },
};
</script>



<style scoped>
.form {
    padding: 20px;
}

.form-group {
    margin-bottom: 15px;
}

.swap-cards-enter-active,
.swap-cards-leave-active {
    transition: all 0.5s;
    position: absolute;
    width: 100%;
}

.swap-cards-enter,
.swap-cards-leave-to {
    transform: translateX(-100%);
    opacity: 0;
}

.btn-google,
.btn-facebook {
    margin-top: 10px;
    display: inline-flex;
    align-items: center;
    gap: 5px;
    color: white;
}

.btn-google {
    background-color: #4285f4;
}

.btn-google:hover {
    background-color: #2a74d6;
}

.btn-google img {
    width: 20px;
    height: 20px;
}

.btn-facebook {
    background-color: #1877f2;
}

.btn-facebook:hover {
    background-color: #1661c9;
}

.btn-facebook img {
    width: 20px;
    height: 20px;
}


</style>
