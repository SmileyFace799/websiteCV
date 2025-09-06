<template>
	<div>
		<p-toast/>
		<header>
			<p-button @click="toggleTheme">oi</p-button>
			<p-button label="Show sensitive information (authenticate)" @click="visible = true" />

			<p-dialog v-model:visible="visible" modal header="Authenticate yourself">
				<div class="auth-dialog">
					<span>To show sensitive information on this site, please enter an authentication token</span>
					<div style="display: grid; grid-template-columns: auto 1fr; gap: 0.25em">
						<label for="token">Token:</label>
						<p-input-text id="token" v-model="token" style="width: auto;" autocomplete="off" />
					</div>
					<div style="display: flex; gap: 0.5em;">
						<p-button type="button" label="Submit" @click="onAuthSubmit"></p-button>
						<p-button type="button" label="Cancel" severity="secondary" @click="visible = false"></p-button>
					</div>
				</div>
			</p-dialog>
		</header>
		<main class="flex-center">
			<router-view />
		</main>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { CURRENT_LANG, STR, type ValidLang } from './scripts/lang';
import { SAVE_TOKEN, USE_TOKEN } from './scripts/token';

export default defineComponent({
	data() {
		return {
			visible: false,
			token: ""
		}
	},
	methods: {
		getLang(): ValidLang {
			return CURRENT_LANG.value;
		},
		setLang(lang: ValidLang): void {
			CURRENT_LANG.value = lang
		},
		str(key: string): string {
			return STR(key);
		},
		toggleTheme(): void {
			document.documentElement.classList.contains('dark') ? document.documentElement.classList.remove('dark') : document.documentElement.classList.add('dark')
		},
		onAuthSubmit(): void {
			SAVE_TOKEN(this.token).then(r => r.code === 200
				? (r.valid
					? this.showToast('success', 'Authentication successful!', 'Sensitive content is now shown')
					: this.showToast('error', 'Authentication failed', 'Token is invalid')
				) : this.showToast('error', 'Authentication failed', `${r.code} ${r.message}`)
			);
			this.token = "";
			this.visible = false;
		},
		showToast(severity: "success" | "infi" | "warn" | "error" | "secondary" | "contrast", summary: string, detail: string, life: number = 5000) {
            this.$toast.add({severity, summary, detail, life});
        }
	},
	mounted() {
		if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
			document.documentElement.classList.add('dark')
		}
		USE_TOKEN();
	}
})
</script>

<style scoped>
html, body, p, a, div, span, button {
	font-size: 24px;
}

.auth-dialog {
	display: flex;
	flex-direction: column;
	gap: 0.5em;
}

.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: left;
}

:root {
  font-size: 18px;
}
</style>
