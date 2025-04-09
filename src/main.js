import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';

// importar os componentes primevue aqui
import Button from "primevue/button"

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
});

app.use(createPinia())
app.use(router)

// Chamar os componentes do primevue aqui Ex:
app.component('Button', Button)

app.mount('#app')
