import 'boxicons'
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useAuthStore } from '@/stores/auth'

import App from './App.vue'
import router from './router'

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)

// Créer le magasin authStore
const authStore = useAuthStore();

// Fournir le magasin authStore à l'ensemble de l'application
app.provide('authStore', authStore)

// Ajouter le magasin authStore aux propriétés globales de l'application
app.config.globalProperties.$authStore = authStore;

// Utiliser le routeur
app.use(router)

// Monter l'application
app.mount('#app')

