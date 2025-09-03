<template>
	<div>
		<header><button @click="toggleTheme">oi</button></header>
		<main class="flex-center" style="text-align: left;">
			<router-view />
		</main>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { CURRENT_LANG, STR, type ValidLangs } from './scripts/lang';

export default defineComponent({
	methods: {
		getLang(): ValidLangs {
			return CURRENT_LANG.value;
		},
		setLang(lang: ValidLangs): void {
			CURRENT_LANG.value = lang
		},
		str(key: string): string {
			return STR(key);
		},
		toggleTheme(): void {
			document.documentElement.classList.contains('dark') ? document.documentElement.classList.remove('dark') : document.documentElement.classList.add('dark')
		}
	},
	mounted() {
		if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
			document.documentElement.classList.add('dark')
		}
	}
})
</script>

<style scoped>
html, body, p, a, div, span, button {
	font-size: 24px;
}

.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

:root {
  font-size: 18px;
}
</style>
