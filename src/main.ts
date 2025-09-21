import { createApp } from 'vue';
import './style.css';
import 'flag-icons/css/flag-icons.min.css';
import 'primeicons/primeicons.css';
import App from './App.vue';
import Aura from '@primeuix/themes/aura';
import PrimeVue from 'primevue/config';
import router from './router';
import ToastService from 'primevue/toastservice';

import { Button, Dialog, Divider, Drawer, InputText, Panel, Select, Toast, Tree } from 'primevue';

createApp(App)
.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            prefix: 'p',
            darkModeSelector: '.dark',
            cssLayer: false
        }
    }
})
.use(router)
.use(ToastService)
.component('Button', Button)
.component('Dialog', Dialog)
.component('Divider', Divider)
.component('Drawer', Drawer)
.component('InputText', InputText)
.component('Panel', Panel)
.component('Select', Select)
.component('Toast', Toast)
.component('Tree', Tree)
.mount('#app')
