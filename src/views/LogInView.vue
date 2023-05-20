<template>
  <router-link to="/">
    <back-button/>
  </router-link>
  <div class="full">
    <log-in @auth-error="handleAuthError" />
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
import LogIn from "@/components/LogIn.vue";
import BackButton from "@/components/BackButton.vue";
import { IconArrowNarrowLeft } from '@tabler/icons-vue';
import { Toast } from 'bootstrap';

export default {
  name: "LogInView",
  components: {
    LogIn,
    IconArrowNarrowLeft,
    BackButton,
  },
  data() {
    return {
      errorMessage: '',
    };
  },
  methods: {
    handleAuthError(message) {
      this.errorMessage = message;
      const errorToast = new Toast(document.getElementById('errorToast'));
      errorToast.show();
    },
  },
};
</script>

<style scoped>
.back{
  position: static;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
</style>
