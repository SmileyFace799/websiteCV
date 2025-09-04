<template>
	<div class="grid">
		<panel v-for="panelInfo, i in panels" :header="panelInfo.header" class="box leftBox" :style="`grid-row: ${i+1};`">
			<tree :key="i" :value="panelInfo.tree" :expanded-keys="Object.fromEntries(panelInfo.expanded.map(k => [k, true]))">
				<template #default="{ node }">
					<template v-if="node.url"><b v-if="node.preBold">{{ fillKeys(node.preBold) }}: </b>{{ fillKeys(node.preUrl) }}<a target="_blank" :href="fillKeys(node.url)">{{ fillKeys(node.label) }}</a>{{ fillKeys(node.postUrl) }}</template>
					<template v-else><b v-if="node.preBold">{{ fillKeys(node.preBold) }}: </b>{{ fillKeys(node.preUrl) }}{{ fillKeys(node.label) }}{{ fillKeys(node.postUrl) }}</template>
				</template>
			</tree>
			<template v-if="i === 1">*Group project</template>
		</panel>
		<div class="box rightBox"><table style="font-size: 18px;"><tbody>
			<tr><td><b>Name:</b> SmileyFace799</td></tr>
			<tr><td><b>Born:</b> </td></tr>
			<tr><td><b>Occupation:</b> Student</td></tr>
		</tbody></table></div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { CURRENT_LANG, STR, type ValidLangs } from '../scripts/lang';

type TreeNode = {
	key: string,
	expanded: boolean | undefined
	preBold: string | undefined,
	preUrl: string | undefined,
	label: string | undefined,
	postUrl: string | undefined,
	url: string | undefined,
	children: TreeNode[] | undefined
}
export default defineComponent({
	data() {
		const skillTree = [
			{key: "0", label: "Programming languages", children: [
				{key: "0-0", label: "Java"},
				{key: "0-1", label: "Python"},
				{key: "0-2", label: "Typescript"},
				{key: "0-3", label: "Javascript"},
				{key: "0-4", label: "HTML + CSS"},
				{key: "0-5", label: "C#"},
				{key: "0-6", label: "Lua (+ Luau)"},
				{key: "0-7", label: "C++"},
				{key: "0-8", label: "Kotlin"},
				{key: "0-9", label: "C (Learning this semester)"},
			]},
			{key: "1", label: "Frameworks", children: [
				{key: "1-0", label: "Vue", expanded: true, children: [
					{key: "1-0-0", label: "Vite"},
					{key: "1-0-1", label: "Vuetify"},
					{key: "1-0-2", label: "PrimeVue"}
				]},
				{key: "1-1", label: "Node.js", expanded: true, children: [
					{key: "1-1-0", label: "Electron"}
				]},
				{key: "1-2", label: "JavaFX"},
				{key: "1-3", label: "Spring Boot"},
				{key: "1-4", label: "Godot"},
				{key: "1-5", label: "Ionic"},
				{key: "1-6", label: "JDA (Java Discord API)"},
				{key: "1-7", label: "Flask"},
				{key: "1-8", label: "discord.py"}
			]},
			{key: "2", label: "Agile Development", children: [
				{key: "2-0", label: "SCRUM"},
				{key: "2-1", label: "Kanban"}
			]},
			{key: "3", label: "API accessing", children: [
				{key: "3-0", label: "GitHub API"},
				{key: "3-1", label: "Discord API"}
			]},
			{key: "4", label: "Data storage & serialization"},
			{key: "5", label: "Networking", children: [
				{key: "5-0", label: "HTTP + HTTPS"},
				{key: "5-1", label: "WebSockets"}
			]},
			{key: "6", label: "Databases", children: [
				{key: "6-0", label: "SQL"}
			]},
			{key: "7", label: "Full-stack development"}
		] as TreeNode[];
		const projectTree = [
			{key: "0", label: "Python Discord bot", postUrl: " (2017 - {monthFeb} 2023)", url: "https://github.com/SmileyFace799/musicbot", children: [
				{key: "0-0", preBold: "Note", label: "GitHub wasn't used before September 2021"},
				{key: "0-1", preBold: "Skills", expanded: true, children: [
					{key: "0-1-0", label: "Language (Python)"},
					{key: "0-1-1", label: "API accessing (Discord API)"},
					{key: "0-1-2", label: "Framework (discord.py)"}
				]}
			]},
			{key: "1", label: "Infinite Minesweeper", postUrl: " ({monthAug} 2019 - {monthJun} 2020) [Source code lost]", children: [
				{key: "1-0", preBold: "Skills", expanded: true, label: "Language (Python)"}
			]},
			{key: "2", label: "Javasweeper Infinite", postUrl: " ({monthAug} 2022 - {monthSep} 2023)", url: "https://github.com/SmileyFace799/javasweeper_infinite", children: [
				{key: "2-0", preBold: "Skills", expanded: true, children: [
					{key: "2-0-0", label: "Language (Java)"},
					{key: "2-0-1", label: "Data storage & serialization"}
				]}
			]},
			{key: "3", label: "Economy Management Program", postUrl: "* ({monthJan} 2023 - {monthApr} 2023)", url: "https://github.com/SmileyFace799/idata1002-g-11-archived", children: [
				{key: "3-0", preBold: "Skills", expanded: true, children: [
					{key: "3-0-0", label: "Language (Java)"},
					{key: "3-0-1", label: "Framework (JavaFX)"},
					{key: "3-0-2", label: "Agile Development (SCRUM, Kanban)"},
					{key: "3-0-3", label: "Data storage & serialization"}
				]},
				{key: "3-1", preBold: "Related education", expanded: true, children: [
					{key: "3-1-0", label: "{IDATA1002}"}
				]}
			]},
			{key: "4", label: "Java Discord Bot", postUrl: " ({monthMar} 2023 - {present})", url: "https://github.com/SmileyFace799/discord-bot", children: [
				{key: "4-0", preBold: "Dependency", label: "Discord Bot Framework"},
				{key: "4-1", preBold: "Skills", expanded: true, children: [
					{key: "4-1-0", label: "Language (Java)"},
					{key: "4-1-1", label: "Api accessing (Discord API)"}
				]}
			]},
			{key: "5", label: "Currency Exchanger", postUrl: " ({monthJan} 2024)", url: "https://github.com/SmileyFace799/currency-exchanger", children: [
				{key: "5-0", preBold: "Parent project", label: "Web & App Project"},
				{key: "5-1", preBold: "Skills", expanded: true, children: [
					{key: "5-1-0", label: "Language (Java)"},
					{key: "5-1-1", label: "API accessing"}
				]}
			]},
			{key: "6", label: "Web & App Project", postUrl: "* ({monthFeb} 2024 - {monthMay} 2024)", url: "https://github.com/Kenzirey/Web-App-Group-15", children: [
				{key: "6-0", preBold: "Dependency", label: "Currency Exchanger"},
				{key: "6-1", preBold: "Skills", expanded: true, children: [
					{key: "6-1-0", label: "Language (Java, HTML + CSS, Javascript)"},
					{key: "6-1-1", label: "Framework (Vue, Vite, Vuetify, Spring Boot)"},
					{key: "6-1-2", label: "Agile Development (SCRUM)"},
					{key: "6-1-3", label: "Networking (HTTP + HTTPS)"},
					{key: "6-1-4", label: "Databases (SQL)"},
					{key: "6-1-5", label: "Full-stack development"}
				]},
				{key: "6-2", preBold: "Related education", expanded: true, children: [
					{key: "3-1-0", label: "{IDATA2303}"},
					{key: "3-1-1", label: "{IDATA2301}"},
					{key: "3-1-2", label: "{IDATA2306}"},
				]}
			]},
			{key: "7", label: "Discord Bot Framework", postUrl: " ({monthJun} 2024 - {present})", url: "https://github.com/SmileyFace799/discord-bot-framework", children: [
				{key: "7-0", preBold: "Parent project", label: "Java Discord Bot"},
				{key: "7-1", preBold: "Skills", expanded: true, children: [
					{key: "7-1-0", label: "Language (Java)"},
					{key: "7-1-1", label: "Api accessing (Discord API)"}
				]}
			]},
			{key: "8", label: "Shopping List Manager", postUrl: " ({monthNov} 2024)", url: "https://github.com/SmileyFace799/shopping-list-manager", children: [
				{key: "8-0", preBold: "Skills", expanded: true, children: [
					{key: "8-0-0", label: "Language (Java, HTML + CSS, Typescript)"},
					{key: "8-0-1", label: "Framework (Vue, Vite, Ionic)"}
				]},
				{key: "8-1", preBold: "Related education", expanded: true, children: [
					{key: "8-1-0", label: "{IDATT2506}"}
				]}
			]},
			{key: "9", label: "RogueSweeper", postUrl: " ({monthNov} 2024 - {present})", url: "https://github.com/SmileyFace799/GodotSweeper-Infinite", children: [
				{key: "9-0", preBold: "Skills", expanded: true, children: [
					{key: "9-0-0", label: "Language (C#)"},
					{key: "9-0-1", label: "Framework (Godot)"},
					{key: "9-0-0", label: "Data storage & serialization"}
				]},
				{key: "9-1", preBold: "Related education", expanded: true, children: [
					{key: "9-1-0", label: "{IDATT2505}"}
				]}
			]},
			{key: "10", label: "GitHub Research Insights Tool (GRIT)", postUrl: "* ({monthJan} 2025 - {monthJun} 2025) [Bachelor Thesis]", children: [
				{key: "10-0", preBold: "Skills", expanded: true, children: [
					{key: "10-0-1", label: "Language (HTML + CSS, Typescript)"},
					{key: "10-0-2", label: "Framework (Vue, Vite, Vuetify, Node.js, Electron)"},
					{key: "10-0-3", label: "Agile development (SCRUM, Kanban)"},
					{key: "10-0-4", label: "API accessing (GitHub API)"},
					{key: "10-0-5", label: "Data storage & serialization"}
				]},
				{key: "10-1", preBold: "Related education", expanded: true, children: [
					{key: "10-1-0", label: "{IDATA2900}"}
				]}
			]},
			{key: "11", label: "Website CV", postUrl: " ({monthSep} 2025 - {present})", url: "https://github.com/SmileyFace799/websiteCV", children: [
				{key: "11-0", preBold: "Dependency", label: "Website CV backend", url: "https://github.com/SmileyFace799/websiteCV-backend"},
				{key: "11-1", preBold: "Skills", expanded: true, children: [
					{key: "11-1-0", label: "Language (HTML + CSS, Typescript, Python)"},
					{Key: "11-1-1", label: "Framework (Vue, Vite, PrimeVue, Flask)"},
					{key: "11-1-2", label: "API accessing (custom backend)"},
					{key: "11-1-3", label: "Networking (HTTP + HTTPS)"}
				]},
			]}
		] as TreeNode[];
		const educationTree = [
			{key: "0", label: "{studyProgramHighSchool} ({monthAug} 2019 - {monthJun} 2022)"},
			{key: "1", label: "{studyProgramBachelor}", postUrl: " ({monthAug} 2022 - {monthJun} 2025) [{degreeBachelor}]", url: "{studyProgramBachelorLink}", children: [
				{key: "1-0", label: "1{num1Suffix} {semester} ({monthAug} 2022 - {monthDec} 2022)", expanded: true, children: [
					{key: "1-0-0", label: "{HMS0006}", url: "{HMS0006Link}"},
					{key: "1-0-1", label: "{IDATA1001}", url: "{IDATA1001Link}"},
					{key: "1-0-2", label: "{IMAA1001}", url: "{IMAA1001Link}"},
					{key: "1-0-3", label: "{INGA1001}", url: "{INGA1001Link}"}
				]},
				{key: "1-1", label: "2{num2Suffix} {semester} ({monthJan} 2023 - {monthJun} 2023)", expanded: true, children: [
					{key: "1-1-0", label: "{IDATA1002}", url: "{IDATA1002Link}"},
					{key: "1-1-1", label: "{IDATA2001}", url: "{IDATA2001Link}"},
					{key: "1-1-2", label: "{IMAA2021}", url: "{IMAA2021Link}"}
				]},
				{key: "1-2", label: "3{num3Suffix} {semester} ({monthAug} 2023 - {monthDec} 2023)", expanded: true, children: [
					{key: "1-2-0", label: "{IDATA2302}", url: "{IDATA2302Link}"},
					{key: "1-2-1", label: "{IDATA2303}", url: "{IDATA2303Link}"},
					{key: "1-2-2", label: "{IDATA2304}", url: "{IDATA2304Link}"},
					{key: "1-2-3", label: "{ISTA1003}", url: "{ISTA1003Link}"}
				]},
				{key: "1-3", label: "4{numDefaultSuffix} {semester} ({monthJan} 2024 - {monthJun} 2024)", expanded: true, children: [
					{key: "1-3-0", label: "{IDATA2301}", url: "{IDATA2301Link}"},
					{key: "1-3-1", label: "{IDATA2305}", url: "{IDATA2305Link}"},
					{key: "1-3-2", label: "{IDATA2306}", url: "{IDATA2306Link}"},
					{key: "1-3-3", label: "{IFYA1002}",  url: "{IFYA1002Link}"}
				]},
				{key: "1-4", label: "5{numDefaultSuffix} {semester} ({monthAug} 2024 - {monthDec} 2024)", expanded: true, children: [
					{key: "1-4-0", label: "{IDATT2505}", url: "{IDATT2505Link}"},
					{key: "1-4-1", label: "{IDATT2506}", url: "{IDATT2506Link}"},
					{key: "1-4-2", label: "{INFT2503}", url: "{INFT2503Link}"},
					{key: "1-4-3", label: "{IMAT2150}", url: "{IMAT2150Link}"}
				]},
				{key: "1-5", label: "6{numDefaultSuffix} {semester} ({monthJan} 2025 - {monthJun} 2025)", expanded: true, children: [
					{key: "1-5-0", label: "{IDATA2900}", url: "{IDATA2900Link}"},
					{key: "1-5-1", label: "{INGT2300}", url: "{INGT2300Link}"}
				]}
			]},
			{key: "2", label: "{studyProgramMaster}", postUrl: " ({monthAug} 2025 - {present}) [{degreeMaster}]", url: "{studyProgramMasterLink}", children: [
				{key: "1-0", label: "1{num1Suffix} {semester} ({monthAug} 2025 - {present})", expanded: true, children: [
					
				]},
			]}
		] as TreeNode[];
		return {
			panels: [
				{header: 'My skills', tree: skillTree, expanded: this.findExpanded(skillTree)},
				{header: 'My projects', tree: projectTree, expanded: this.findExpanded(projectTree)},
				{header: 'My education', tree: educationTree, expanded: this.findExpanded(educationTree)}
			] as {header: string, tree: TreeNode[], expanded: string[]}[]
		}
	},

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
		fillKeys(s: string | undefined): string | undefined {
			return s?.replace(/{(.*?)}/g, (_, key) => this.str(key));
		},
		findExpanded(nodes: TreeNode[]): string[] {
			const expanded = [] as string[];
			nodes.forEach(node => {
				if (node.expanded) {
					expanded.push(node.key);
				}
				if (node.children) {
					expanded.push(...this.findExpanded(node.children));
				}
			});
			return expanded;
		}
	},
	async mounted() {
		/*
		const confidential = await (await fetch('http://localhost:5000/confidential', {
			headers: {
				"X-API-key": "A>3qc>1FVJ<v/g/9WRyEYpiDUaVRVLtv<ASo#{+OqorWhz>d2e"
			}
		})).json()
		console.log(confidential);
		*/
	}
})
</script>

<style scoped>
h1, h2, h3, h4, h5 {
	margin-top: 0;
}

:global(.p-panel-title) {
	font-size: 3rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  gap: 2em;
  padding: 2em;
}

.box {
	padding: 2em 2em 2em 2em;
	border-radius: 1em;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25);
}

.leftBox {
	grid-column: 1 / 3;
}

.rightBox {
	grid-column: 3;
	grid-row: 1 / 4;
}

.box1 {
  	grid-row: 1;
}

.box2 {
	grid-row: 2;
}
</style>
