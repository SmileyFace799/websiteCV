import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'

import Accordion from 'primevue/accordion'
import AccordionPanel from 'primevue/accordionpanel';
import AccordionHeader from 'primevue/accordionheader';
import AccordionContent from 'primevue/accordioncontent';
import Panel from 'primevue/panel';
import Tree from 'primevue/tree';

createApp(App)
.use(router)
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
.component('Accordion', Accordion)
.component('AccordionPanel', AccordionPanel)
.component('AccordionHeader', AccordionHeader)
.component('AccordionContent', AccordionContent)
.component('Panel', Panel)
.component('Tree', Tree)
.mount('#app')
