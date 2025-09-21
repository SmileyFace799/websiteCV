<template>
	<Toast />
	<header class="top-bar" style="width: 100%;">
		<Navbar>
			<template #nav-content>
				<Button
					:label="'Sensitive info: ' + (isAuthenticated ? 'Shown' : 'Hidden')"
					@click="isAuthenticated ? clearAuthVisible = true : authVisible = true"
					variant="outlined"
					:severity="isAuthenticated ? 'success' : 'info'"
				></Button>

				<span></span> <!-- Separator element -->

				<Button @click="toggleTheme()" rounded size="large" variant="outlined" severity="contrast">
					<template #icon>
						<span class="material-icons">{{themeIsDark ? 'dark_mode' : 'light_mode' }}</span>
					</template>
				</Button>
				<Select v-model="currentLang" :options="allLangs">
					<template #value="{ value }">
						<template v-if="value">
							<span :class="['fi', 'fi-' + (value as string).slice(-2)]"></span>
							<span style="margin-left: 0.25em;">{{ langStr[currentLang][value as ValidLang] }}</span>
						</template>
						<span v-else>(No language selected)</span>
					</template>
					<template #option="{ option }">
						<template v-if="option">
							<span :class="['fi', 'fi-' + (option as string).slice(-2)]"></span>
							<span style="margin-left: 0.25em;">{{ langStr[currentLang][option as ValidLang] }}</span>
						</template>
					</template>
				</Select>
			</template>
		</Navbar>

		<Dialog v-model:visible="authVisible" modal header="Authenticate yourself">
			<div class="auth-dialog">
				<span>To show sensitive information on this site, please enter an authentication token</span>
				<div style="display: grid; grid-template-columns: auto 1fr; gap: 0.25em">
					<label for="token">Token:</label>
					<InputText id="token" v-model="token" style="width: auto;" autocomplete="off" />
				</div>
				<div style="display: flex; gap: 0.5em;">
					<Button type="button" label="Submit" @click="onAuthSubmit"></Button>
					<Button type="button" label="Cancel" severity="secondary" @click="authVisible = false"></Button>
				</div>
			</div>
		</Dialog>
		<Dialog v-model:visible="clearAuthVisible" modal header="Clear authentication">
			<div class="auth-dialog">
				<span>Do you want to clear authentication?</span>
				<div style="display: flex; gap: 0.5em;">
					<Button type="button" label="Clear" @click="onAuthClear" severity="danger"></Button>
					<Button type="button" label="Cancel" severity="secondary" @click="clearAuthVisible = false"></Button>
				</div>
			</div>
		</Dialog>
	</header>
	<main class="flex-center">
		<router-view />
	</main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ALL_LANGS, CURRENT_LANG, STR, type ValidLang } from './scripts/lang';
import { CLEAR_TOKEN, IS_AUTHENTICATED, SAVE_TOKEN, USE_TOKEN } from './scripts/token';
import windowSize from './scripts/WindowSize';
import Navbar from './components/NavBar.vue';

export default defineComponent({
	components: {
		Navbar
	},
	data() {
		return {
			authVisible: false,
			clearAuthVisible: false,
			token: "",
			themeIsDark: false,
			currentLang: CURRENT_LANG,
			langStr: {
				en_us: {
					en_us: "English (US)",
					nb_no: "Norwegian (Bokmål)",
					fr_fr: "French (France)"
				},
				nb_no: {
					en_us: "Engelsk (USA)",
					nb_no: "Norsk (Bokmål)",
					fr_fr: "Fransk (Frankrike)"
				},
				fr_fr: {
					en_us: "Anglais (US)",
    				nb_no: "Norvégien (Bokmål)",
					fr_fr: "Français (France)"
				}
			} as {[key in ValidLang]: {[key in ValidLang]: string}},
			windowSize
		}
	},
	methods: {
		setLang(lang: ValidLang): void {
			CURRENT_LANG.value = lang
		},
		str(key: string): string {
			return STR(key);
		},
		toggleTheme(forceThemeLight?: boolean): void {
			const setToLight = forceThemeLight === undefined ? this.themeIsDark : forceThemeLight;
			setToLight ? document.documentElement.classList.remove('dark') : document.documentElement.classList.add('dark');
			this.themeIsDark = !setToLight;
		},
		onAuthSubmit(): void {
			SAVE_TOKEN(this.token).then(r => r.code === 200
				? (r.valid
					? this.showToast('success', 'Authentication successful!', 'Sensitive content is now shown')
					: this.showToast('error', 'Authentication failed', 'Token is invalid')
				) : this.showToast('error', 'Authentication failed', `${r.code} ${r.message}`)
			);
			this.token = "";
			this.authVisible = false;
		},
		onAuthClear(): void {
			CLEAR_TOKEN();
			this.showToast("info", "Authentication cleared", "You are no longer authenticated");
			this.clearAuthVisible = false;
		},
		showToast(severity: "success" | "info" | "warn" | "error" | "secondary" | "contrast", summary: string, detail: string, life: number = 5000) {
            this.$toast.add({severity, summary, detail, life});
        }
	},

	computed: {
        isAuthenticated(): boolean {
			return IS_AUTHENTICATED.value;
		},
		allLangs(): ValidLang[] {
			return ALL_LANGS();
		},
    },

	mounted() {
		if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
			this.toggleTheme(false);
		}
		USE_TOKEN();
		windowSize.startTracking();
	},
	unmounted() {
		windowSize.stopTracking();
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
	align-items: center;
	display: flex;
	justify-content: center;
	max-width: max(1280px, 75vw);
  	text-align: left;
}
</style>
