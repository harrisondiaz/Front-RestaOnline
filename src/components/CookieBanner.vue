<template>
    <div v-if="showBanner" class="cookie-banner ">
        <div class="cookie-card text-bg-dark">
            <span class="title text-info">🍪 Notificación Sobre Cookies</span>
            <p class="description text-light">Utilizamos cookies para asegurarnos de brindarle la mejor experiencia en nuestro sitio web. <a :href="$router.resolve({ name: 'Polities' }).href" target="_blank">Leer políticas de cookies</a>. </p>
            <div class="actions">
                <button class="accept btn btn-dark " @click="acceptCookies">
                    Aceptar
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            showBanner: localStorage.getItem("cookiesAccepted")? false : true,
        };
    },
    methods: {
        acceptCookies() {
            localStorage.setItem("cookiesAccepted", true);
            this.showBanner = false;
        },goto(url){
            this.$router.push(url)
      }

    },
};
</script>

<style scoped>
.cookie-banner {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 1rem;
  z-index: 999;
}

.cookie-card {
  max-width: 320px;
  padding: 1rem;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 10px;
  -webkit-box-shadow: 20px 20px 30px rgba(0, 0, 0, .05);
  box-shadow: 20px 20px 30px rgba(0, 0, 0, .05);
}

.title {
  font-weight: 600;
  color: rgb(31 41 55);
}

.description {
  margin-top: 1rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: rgb(75 85 99);
}

.description a {
  --tw-text-opacity: 1;
  color: rgb(59 130 246);
}

.description a:hover {
  text-decoration-line: underline;
}

.actions {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  margin-top: 1rem;
  -moz-column-gap: 1rem;
  -webkit-column-gap: 1rem;
  column-gap: 1rem;
  -ms-flex-negative: 0;
  flex-shrink: 0;
}

.pref {
  font-size: 0.75rem;
  line-height: 1rem;
  color: rgb(31 41 55 );
  text-decoration-line: underline;
  -webkit-transition: all .3s cubic-bezier(0.4, 0, 0.2, 1);
  transition: all .3s cubic-bezier(0.4, 0, 0.2, 1);
  border: none;
  background-color: transparent;
}

.pref:hover {
  color: rgb(156 163 175);
}

.pref:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
}

.accept {
  font-size: 0.75rem;
  line-height: 1rem;
  background-color: rgb(17 24 39);
  font-weight: 500;
  border-radius: 0.5rem;
  color: #fff;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.625rem;
  padding-bottom: 0.625rem;
  border: none;
  -webkit-transition: all .15s cubic-bezier(0.4, 0, 0.2, 1);
  transition: all .15s cubic-bezier(0.4, 0, 0.2, 1);
}

.accept:hover {
  background-color: rgb(55 65 81);
}

.accept:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
}

@media screen and (max-width: 768px) {
  .cookie-card {
    max-width: 95%;
  }

  .actions {
    flex-direction: column;
    align-items: stretch;
  }

  .pref, .accept {
    margin: 0.5rem 0;
  }
}
</style>
