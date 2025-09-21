<template>
	<Drawer v-if="WindowSize.lessThan('m')" v-model:visible="navDrawerVisible" position="left" header="Page settings">
		<nav class="nav-buttons nav-buttons-small">
			<slot name="nav-content" ></slot>
		</nav>
	</Drawer>
    <nav class="nav-buttons nav-buttons-big">
		<template v-if="WindowSize.atLeast('m')">
			<slot name="nav-content" ></slot>
		</template>
		<Button v-else icon="pi pi-bars" @click="() => navDrawerVisible = true" variant="outlined" severity="secondary" size="large"></Button>
    </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import WindowSize from '../scripts/WindowSize';

export default defineComponent({
    name: "NavBar",
	data() {
		return {
			navDrawerVisible: false,
			WindowSize
		};
	}
});
</script>

<style scoped>
.nav-buttons {
	gap: 1em;
	padding: 1em;
}

.nav-buttons-big {
	align-items: center;
	display: grid;
	grid-template-columns: auto 1fr auto auto;
}

.nav-buttons-small {
	display: flex;
	flex-direction: column;
}
</style>