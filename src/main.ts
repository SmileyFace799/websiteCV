import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Aura from '@primeuix/themes/aura'
import PrimeVue from 'primevue/config'
import router from './router'
import ToastService from 'primevue/toastservice';

import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import Divider from 'primevue/divider';
import InputText from 'primevue/inputtext';
import Panel from 'primevue/panel';
import Toast from 'primevue/toast';
import Tree from 'primevue/tree';

createApp(App)
.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            prefix: 'p',
            darkModeSelector: '.dark', // Use 'class' for manual toggling via class
            cssLayer: false
        }
    }
})
.use(router)
.use(ToastService)
.component('p-button', Button)
.component('p-dialog', Dialog)
.component('p-divider', Divider)
.component('p-input-text', InputText)
.component('p-panel', Panel)
.component('p-toast', Toast)
.component('p-tree', Tree)
.mount('#app')
