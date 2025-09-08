import { createApp } from 'vue';
import './style.css';
import 'flag-icons/css/flag-icons.min.css';
import App from './App.vue';
import Aura from '@primeuix/themes/aura';
import PrimeVue from 'primevue/config';
import router from './router';
import ToastService from 'primevue/toastservice';

import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import Divider from 'primevue/divider';
import InputText from 'primevue/inputtext';
import Panel from 'primevue/panel';
import Select from 'primevue/select'
import Toast from 'primevue/toast';
import Tree from 'primevue/tree';

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
.component('InputText', InputText)
.component('Panel', Panel)
.component('Select', Select)
.component('Toast', Toast)
.component('Tree', Tree)
.mount('#app')
