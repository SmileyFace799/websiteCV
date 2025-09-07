import { createRouter, createWebHistory } from 'vue-router'

import Home from '../components/Main.vue'

export default createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{ path: '/', name: 'Home', component: Home },
	]
})