<template>
    <div class="toast-container position-fixed bottom-0 end-0 p-3" style="z-index: 1100;">
        <div
            ref="toastEl"
            class="toast"
            :class="[toastClass, darkModeClass]"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
            :data-bs-autohide="autohide"
            :data-bs-delay="delay"
        >
            <div class="toast-header">
                <strong class="me-auto">{{ title }}</strong>
                <small class="text-muted">Ahora</small>
                <button type="button" class="btn-close" @click="hideToast" aria-label="Cerrar"></button>
            </div>
            <div class="toast-body">
                {{ text }}
            </div>
        </div>
    </div>
</template>

<script>
import { Toast } from 'bootstrap';
import { ref, computed, watch } from 'vue';

export default {
    props: {
        autohide: {
            type: Boolean,
            default: true,
        },
        delay: {
            type: Number,
            default: 5000,
        },
        show: {
            type: Boolean,
            default: false,
        },
        text: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            default: 'Mensaje',
        },
        type: {
            type: String,
            default: 'info',
        },
        darkMode: {
            type: Boolean,
            default: false,
        },
    },
    setup(props) {
        const toastEl = ref(null);

        const toastClass = computed(() => {
            switch (props.type) {
                case 'success':
                    return 'bg-success';
                case 'warning':
                    return 'bg-warning';
                case 'error':
                    return 'bg-danger';
                case 'info':
                default:
                    return 'bg-info';
            }
        });

        const darkModeClass = computed(() => {
            return props.darkMode ? 'text-white' : 'text-dark';
        });

        const showToast = () => {
            const toast = new Toast(toastEl.value, {
                autohide: props.autohide,
                delay: props.delay,
            });
            toast.show();
        };

        const hideToast = () => {
            props.show = false;
        };

        watch(
            () => props.show,
            (newValue) => {
                if (newValue) {
                    showToast();
                }
            },
            { immediate: true }
        );

        return { toastEl, hideToast, toastClass, darkModeClass };
    },
};
</script>

