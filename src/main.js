import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'

// importar os componentes primevue aqui
import Button from 'primevue/button'
import Checkbox from 'primevue/checkbox';
import SpeedDial from 'primevue/speeddial';
import Toast from 'primevue/toast';
import Badge from 'primevue/badge';
import Avatar from 'primevue/avatar';
import InputText from 'primevue/inputtext';
import Menubar from 'primevue/menubar';

import App from './App.vue'
import router from './router'
import Ripple from 'primevue/ripple'

const app = createApp(App)

app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
  ripple: true
})

app.use(createPinia())
app.use(router)

app.directive('ripple', Ripple);

// Chamar os componentes do primevue aqui Ex:
app.component('Button', Button)
app.component('Checkbox', Checkbox)
app.component('SpeedDial', SpeedDial)
app.component('Toast', Toast)
app.component('Badge', Badge)
app.component('Avatar', Avatar)
app.component('InputText', InputText)
app.component('Menubar', Menubar)


app.mount('#app')
