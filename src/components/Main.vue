<template>
	<div class="grid">
		<Panel v-for="panelInfo, i in panels" :header="fillKeys(panelInfo.header)" class="box" :style="{gridRow: i + (windowSize.lessThan('l') ? 2 : 1), gridColumn: `1 / ${i < 2 && windowSize.atLeast('l') ? 4 : 6}`}">
			<Tree :key="i" :value="panelInfo.tree" :expanded-keys="Object.fromEntries(panelInfo.expanded.map((k: any) => [k, true]))">
				<template #default="{ node }">
					<template v-if="node.url"><b v-if="node.preBold">{{ fillKeys(node.preBold) }}: </b>{{ fillKeys(node.preUrl) }}<a target="_blank" :href="fillKeys(node.url)">{{ fillKeys(node.label) }}</a>{{ fillKeys(node.postUrl) }}</template>
					<template v-else><b v-if="node.preBold">{{ fillKeys(node.preBold) }}: </b>{{ fillKeys(node.preUrl) }}{{ fillKeys(node.label) }}{{ fillKeys(node.postUrl) }}</template>
				</template>
			</Tree>
			<template v-if="i === 1">*Group project</template>
		</Panel>
		<Panel :header="str('strAboutMe')" class="box" :style="{gridRow: windowSize.lessThan('l') ? 1 : '1 / 3', gridColumn: `${windowSize.lessThan('l') ? 1 : 4} / 6`}">
			<img :src="getImage('smileyface799')" style="width: 100%; max-width: 400px;"></img>
			<table style="display: flex; width: 100%;"><tbody>
			<template v-for="entry of rightPanel">
				<template v-if="shouldBeShown(entry.confidential)">
					<Divider/>
					<tr><td><b>{{ fillKeys(entry.key) }}: </b>{{ fillKeys(entry.value) }}</td></tr>
				</template>
			</template>
		</tbody></table></Panel>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { CURRENT_LANG, STR, type ValidLang } from '../scripts/lang';
import { GET_IMAGE } from '../scripts/img';
import { IS_AUTHENTICATED } from '../scripts/token';
import windowSize from '../scripts/WindowSize';

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
			{key: "0", label: "{strProgLangs}", children: [
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
			{key: "1", label: "{strFrameworks}", children: [
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
			{key: "2", label: "{strAgileDev}", children: [
				{key: "2-0", label: "SCRUM"},
				{key: "2-1", label: "Kanban"}
			]},
			{key: "3", label: "{strApiAccessing}", children: [
				{key: "3-0", label: "GitHub API"},
				{key: "3-1", label: "Discord API"}
			]},
			{key: "4", label: "{strDataStorageSerialize}"},
			{key: "5", label: "{strNetworking}", children: [
				{key: "5-0", label: "HTTP + HTTPS"},
				{key: "5-1", label: "WebSockets"}
			]},
			{key: "6", label: "{strDatabases}", children: [
				{key: "6-0", label: "SQL"}
			]},
			{key: "7", label: "{strFullStackDev}"}
		] as TreeNode[];
		const projectTree = [
			{key: "0", label: "Python Discord bot", postUrl: " (2017 - {monthFeb} 2023)", url: "https://github.com/SmileyFace799/musicbot", children: [
				{key: "0-0", preBold: "{strNote}", label: "{strNoGitHub}"},
				{key: "0-1", preBold: "{strRelSkills}", expanded: true, children: [
					{key: "0-1-0", label: "{strProgLangs} (Python)"},
					{key: "0-1-1", label: "{strApiAccessing} (Discord API)"},
					{key: "0-1-2", label: "{strFrameworks} (discord.py)"}
				]}
			]},
			{key: "1", label: "Infinite Minesweeper", postUrl: " ({monthAug} 2019 - {monthJun} 2020) [Source code lost]", children: [
				{key: "1-0", preBold: "{strRelSkills}", expanded: true, children: [
					{key: "1-0-0", label: "Language (Python)"}
				]},
				{key: "1-1", preBold: "{strRelEducation}", expanded: true, children: [
					{key: "1-1-0", label: "{studyProgramHighSchool}"}
				]}
			]},
			{key: "2", label: "Javasweeper Infinite", postUrl: " ({monthAug} 2022 - {monthSep} 2023)", url: "https://github.com/SmileyFace799/javasweeper_infinite", children: [
				{key: "2-0", preBold: "{strRelSkills}", expanded: true, children: [
					{key: "2-0-0", label: "{strProgLangs} (Java)"},
					{key: "2-0-1", label: "{strDataStorageSerialize}"}
				]}
			]},
			{key: "3", label: "Economy Management Program", postUrl: "* ({monthJan} 2023 - {monthApr} 2023)", url: "https://github.com/SmileyFace799/idata1002-g-11-archived", children: [
				{key: "3-0", preBold: "{strRelSkills}", expanded: true, children: [
					{key: "3-0-0", label: "{strProgLangs} (Java)"},
					{key: "3-0-1", label: "{strFrameworks} (JavaFX)"},
					{key: "3-0-2", label: "{strAgileDev} (SCRUM, Kanban)"},
					{key: "3-0-3", label: "{strDataStorageSerialize}"}
				]},
				{key: "3-1", preBold: "{strRelEducation}", expanded: true, children: [
					{key: "3-1-0", label: "{IDATA1002}"}
				]}
			]},
			{key: "4", label: "Paths", postUrl: " ({monthFeb} 2023 - {monthMay} 2023)", url: "https://github.com/SmileyFace799/mappe-prosjekt-paths-gruppe-23-archived", children: [
				{key: "4-0", preBold: "{strRelSkills}", expanded: true, children: [
					{key: "4-0-0", label: "{strProgLangs} (Java)"},
					{key: "4-0-1", label: "{strFrameworks} (JavaFX)"},
					{key: "4-0-2", label: "{strDataStorageSerialize}"}
				]},
				{key: "4-1", preBold: "{strRelEducation}", expanded: true, children: [
					{key: "4-0-1", label: "{IDATA2001}"}
				]}
			]},
			{key: "5", label: "Java Discord Bot", postUrl: " ({monthMar} 2023 - {present})", url: "https://github.com/SmileyFace799/discord-bot", children: [
				{key: "5-0", preBold: "{strDependency}", label: "Discord Bot Framework"},
				{key: "5-1", preBold: "{strRelSkills}", expanded: true, children: [
					{key: "5-1-0", label: "{strProgLangs} (Java)"},
					{key: "5-1-1", label: "{strApiAccessing} (Discord API)"}
				]}
			]},
			{key: "6", label: "Currency Exchanger", postUrl: " ({monthJan} 2024)", url: "https://github.com/SmileyFace799/currency-exchanger", children: [
				{key: "6-0", preBold: "{strParentProject}", label: "Web & App Project"},
				{key: "6-1", preBold: "{strRelSkills}", expanded: true, children: [
					{key: "6-1-0", label: "{strProgLangs} (Java)"},
					{key: "6-1-1", label: "{strApiAccessing}"}
				]}
			]},
			{key: "7", label: "Web & App Project", postUrl: "* ({monthFeb} 2024 - {monthMay} 2024)", url: "https://github.com/Kenzirey/Web-App-Group-15", children: [
				{key: "7-0", preBold: "{strDependency}", label: "Currency Exchanger"},
				{key: "7-1", preBold: "{strRelSkills}", expanded: true, children: [
					{key: "7-1-0", label: "{strProgLangs} (Java, HTML + CSS, Javascript)"},
					{key: "7-1-1", label: "{strFrameworks} (Vue, Vite, Vuetify, Spring Boot)"},
					{key: "7-1-2", label: "{strAgileDev} (SCRUM)"},
					{key: "7-1-3", label: "{strNetworking} (HTTP + HTTPS)"},
					{key: "7-1-4", label: "{strDatabases} (SQL)"},
					{key: "7-1-5", label: "{strFullStackDev}"}
				]},
				{key: "7-2", preBold: "{strRelEducation}", expanded: true, children: [
					{key: "7-1-0", label: "{IDATA2303}"},
					{key: "7-1-1", label: "{IDATA2301}"},
					{key: "7-1-2", label: "{IDATA2306}"},
					{key: "7-1-3", label: "{IDATA2304}"}
				]}
			]},
			{key: "8", label: "Discord Bot Framework", postUrl: " ({monthJun} 2024 - {present})", url: "https://github.com/SmileyFace799/discord-bot-framework", children: [
				{key: "8-0", preBold: "{strParentProject}", label: "Java Discord Bot"},
				{key: "8-1", preBold: "{strRelSkills}", expanded: true, children: [
					{key: "8-1-0", label: "{strProgLangs} (Java)"},
					{key: "8-1-1", label: "{strApiAccessing} (Discord API)"}
				]}
			]},
			{key: "9", label: "Shopping List Manager", postUrl: " ({monthNov} 2024)", url: "https://github.com/SmileyFace799/shopping-list-manager", children: [
				{key: "9-0", preBold: "{strRelSkills}", expanded: true, children: [
					{key: "9-0-0", label: "{strProgLangs} (Java, HTML + CSS, Typescript)"},
					{key: "9-0-1", label: "{strFrameworks} (Vue, Vite, Ionic)"}
				]},
				{key: "9-1", preBold: "{strRelEducation}", expanded: true, children: [
					{key: "9-1-0", label: "{IDATT2506}"}
				]}
			]},
			{key: "10", label: "RogueSweeper", postUrl: " ({monthNov} 2024 - {present})", url: "https://github.com/SmileyFace799/GodotSweeper-Infinite", children: [
				{key: "10-0", preBold: "{strRelSkills}", expanded: true, children: [
					{key: "10-0-0", label: "{strProgLangs} (C#)"},
					{key: "10-0-1", label: "{strFrameworks} (Godot)"},
					{key: "10-0-0", label: "{strDataStorageSerialize}"}
				]},
				{key: "10-1", preBold: "{strRelEducation}", expanded: true, children: [
					{key: "10-1-0", label: "{IDATT2505}"}
				]}
			]},
			{key: "11", label: "GitHub Research Insights Tool (GRIT)", postUrl: "* ({monthJan} 2025 - {monthJun} 2025) [Bachelor Thesis] [Source code confidential]", url: "GRIT.pdf", children: [
				{key: "11-0", preBold: "{strRelSkills}", expanded: true, children: [
					{key: "11-0-1", label: "{strProgLangs} (HTML + CSS, Typescript)"},
					{key: "11-0-2", label: "{strFrameworks} (Vue, Vite, Vuetify, Node.js, Electron)"},
					{key: "11-0-3", label: "{strAgileDev} (SCRUM, Kanban)"},
					{key: "11-0-4", label: "{strApiAccessing} (GitHub API)"},
					{key: "11-0-5", label: "{strDataStorageSerialize}"}
				]},
				{key: "11-1", preBold: "{strRelEducation}", expanded: true, children: [
					{key: "11-1-0", label: "{IDATA2900}"}
				]}
			]},
			{key: "12", label: "Website CV", postUrl: " ({monthSep} 2025 - {present})", url: "https://github.com/SmileyFace799/websiteCV", children: [
				{key: "12-0", preBold: "{strDependency}", label: "Website CV backend", url: "https://github.com/SmileyFace799/websiteCV-backend"},
				{key: "12-1", preBold: "{strRelSkills}", expanded: true, children: [
					{key: "12-1-0", label: "{strProgLangs} (HTML + CSS, Typescript, Python)"},
					{Key: "12-1-1", label: "{strFrameworks} (Vue, Vite, PrimeVue, Flask)"},
					{key: "12-1-2", label: "{strApiAccessing} (custom backend)"},
					{key: "12-1-3", label: "{strNetworking} (HTTP + HTTPS)"}
				]},
			]}
		] as TreeNode[];
		const educationTree = [
			{key: "0", label: "{studyProgramHighSchool} ({monthAug} 2019 - {monthJun} 2022)"},
			{key: "1", label: "{studyProgramBachelor}", postUrl: " ({monthAug} 2022 - {monthJun} 2025) [{degreeBachelor}]", url: "{studyProgramBachelorLink}", expanded: true, children: [
				{key: "1-0", label: "1{num1Suffix} {strSemester} ({monthAug} 2022 - {monthDec} 2022)", expanded: true, children: [
					{key: "1-0-0", label: "{HMS0006}", url: "{HMS0006Link}"},
					{key: "1-0-1", label: "{IDATA1001}", url: "{IDATA1001Link}", children: [
						{key: "1-0-1-0", preBold: "{strRelSkills}", expanded: true, children: [
							{key: "1-0-1-0-0", label: "{strProgLangs} (Java)"}
						]}
					]},
					{key: "1-0-2", label: "{IMAA1001}", url: "{IMAA1001Link}"},
					{key: "1-0-3", label: "{INGA1001}", url: "{INGA1001Link}"}
				]},
				{key: "1-1", label: "2{num2Suffix} {strSemester} ({monthJan} 2023 - {monthJun} 2023)", expanded: true, children: [
					{key: "1-1-0", label: "{IDATA1002}", url: "{IDATA1002Link}", children: [
						{key: "1-1-0-0", preBold: "{strRelSkills}", expanded: true, children: [
							{key: "1-1-0-0-0", label: "{strAgileDev} (SCRUM, Kanban)"}
						]},
						{key: "1-1-0-1", preBold: "{strRelProjects}", expanded: true, children: [
							{key: "1-1-0-1-0", label: "Economy Management Program"}
						]}
					]},
					{key: "1-1-1", label: "{IDATA2001}", url: "{IDATA2001Link}", children: [
						{key: "1-1-1-0", preBold: "{strRelSkills}", expanded: true, children: [
							{key: "1-1-1-0-0", label: "{strProgLangs} (Java)"},
							{key: "1-1-1-0-1", label: "{strFrameworks} (JavaFX)"},
						]},
						{key: "1-1-1-1", preBold: "{strRelProjects}", expanded: true, children: [
							{key: "1-1-1-1-0", label: "Paths"}
						]}
					]},
					{key: "1-1-2", label: "{IMAA2021}", url: "{IMAA2021Link}", children: [
						{key: "1-1-2-0", preBold: "{strRelSkills}", expanded: true, children: [
							{key: "1-1-2-0-0", label: "{strProgLangs} (Python)"}
						]}
					]}
				]},
				{key: "1-2", label: "3{num3Suffix} {strSemester} ({monthAug} 2023 - {monthDec} 2023)", expanded: true, children: [
					{key: "1-2-0", label: "{IDATA2302}", url: "{IDATA2302Link}"},
					{key: "1-2-1", label: "{IDATA2303}", url: "{IDATA2303Link}", children: [
						{key: "1-2-1-0", preBold: "{strRelSkills}", expanded: true, children: [
							{key: "1-2-1-0-0", label: "{strDatabases} (SQL)"}
						]},
						{key: "1-2-1-1", preBold: "{strRelProjects}", expanded: true, children: [
							{key: "1-2-1-1-0", label: "Web & App Project"}
						]}
					]},
					{key: "1-2-2", label: "{IDATA2304}", url: "{IDATA2304Link}", children: [
						{key: "1-2-2-0", preBold: "{strRelSkills}", expanded: true, children: [
							{key: "1-2-2-0-0", label: "{strNetworking} (HTTP + HTTPS)"}
						]},
						{key: "1-2-2-1", preBold: "{strRelProjects}", expanded: true, children: [
							{key: "1-2-2-1-0", label: "Web & App Project"}
						]}
					]},
					{key: "1-2-3", label: "{ISTA1003}", url: "{ISTA1003Link}", children: [
						{key: "1-1-2-0", preBold: "{strRelSkills}", expanded: true, children: [
							{key: "1-1-2-0-0", label: "{strProgLangs} (Python)"}
						]}
					]}
				]},
				{key: "1-3", label: "4{numDefaultSuffix} {strSemester} ({monthJan} 2024 - {monthJun} 2024)", expanded: true, children: [
					{key: "1-3-0", label: "{IDATA2301}", url: "{IDATA2301Link}", children: [
						{key: "1-3-0-0", preBold: "{strRelSkills}", expanded: true, children: [
							{key: "1-3-0-0-0", label: "{strProgLangs} (HTML + CSS, Javascript)"},
							{key: "1-3-0-0-1", label: "{strFrameworks} (Vue, Vite, Vuetify)"},
							{key: "1-3-0-0-2", label: "{strFullStackDev}"}
						]},
						{key: "1-3-0-1", preBold: "{strRelProjects}", expanded: true, children: [
							{key: "1-3-0-1-0", label: "Web & App Project"}
						]}
					]},
					{key: "1-3-1", label: "{IDATA2305}", url: "{IDATA2305Link}"},
					{key: "1-3-2", label: "{IDATA2306}", url: "{IDATA2306Link}", children: [
						{key: "1-3-2-0", preBold: "{strRelSkills}", expanded: true, children: [
							{key: "1-3-2-0-0", label: "{strProgLangs} (Java)"},
							{key: "1-3-2-0-1", label: "{strFrameworks} (Spring Boot)"},
							{key: "1-3-2-0-2", label: "{strFullStackDev}"}
						]},
						{key: "1-3-2-1", preBold: "{strRelProjects}", expanded: true, children: [
							{key: "1-3-2-1-0", label: "Web & App Project"}
						]}
					]},
					{key: "1-3-3", label: "{IFYA1002}",  url: "{IFYA1002Link}"}
				]},
				{key: "1-4", label: "5{numDefaultSuffix} {strSemester} ({monthAug} 2024 - {monthDec} 2024)", expanded: true, children: [
					{key: "1-4-0", label: "{IDATT2505}", url: "{IDATT2505Link}", children: [
						{key: "1-4-0-0", preBold: "{strRelSkills}", expanded: true, children: [
							{key: "1-4-0-0-0", label: "{strProgLangs} (C#)"},
							{key: "1-4-0-0-1", label: "{strFrameworks} (Godot)"},
							{key: "1-4-0-0-2", label: "{strDataStorageSerialize}"}
						]},
						{key: "1-4-0-1", preBold: "{strRelProjects}", expanded: true, children: [
							{key: "1-4-0-1-0", label: "RogueSweeper"}
						]}
					]},
					{key: "1-4-1", label: "{IDATT2506}", url: "{IDATT2506Link}", children: [
						{key: "1-4-1-0", preBold: "{strRelSkills}", expanded: true, children: [
							{key: "1-4-1-0-0", label: "{strProgLangs} (HTML + CSS, Typescript, Kotlin)"},
							{key: "1-4-1-0-1", label: "{strFrameworks} (Vue, Vite, Ionic)"}
						]},
						{key: "1-4-1-1", preBold: "{strRelProjects}", expanded: true, children: [
							{key: "1-4-1-1-0", label: "Shopping List Manager"}
						]}
					]},
					{key: "1-4-2", label: "{INFT2503}", url: "{INFT2503Link}", children: [
						{key: "1-4-2-0", preBold: "{strRelSkills}", expanded: true, children: [
							{key: "1-4-2-0-0", label: "{strProgLangs} (C++)"}
						]}
					]},
					{key: "1-4-3", label: "{IMAT2150}", url: "{IMAT2150Link}", children: [
						{key: "1-4-3-0", preBold: "{strRelSkills}", expanded: true, children: [
							{key: "1-4-3-0-1", label: "{strProgLangs} (Python)"}
						]}
					]}
				]},
				{key: "1-5", label: "6{numDefaultSuffix} {strSemester} ({monthJan} 2025 - {monthJun} 2025)", expanded: true, children: [
					{key: "1-5-0", label: "{IDATA2900}", url: "{IDATA2900Link}", children: [
						{key: "1-5-0-0", preBold: "{strRelSkills}", expanded: true, children: [
							{key: "1-5-0-0-0", label: "{strProgLangs} (HTML + CSS, Typescript)"},
							{key: "1-5-0-0-1", label: "{strFrameworks} (Vue, Vite, Vuetify, Node.js, Electron)"},
							{key: "1-5-0-0-2", label: "{strAgileDev} (SCRUM, Kanban)"},
							{key: "1-5-0-0-3", label: "{strApiAccessing} (GitHub API)"},
							{key: "1-5-0-0-4", label: "{strDataStorageSerialize}"}
						]},
						{key: "1-5-0-1", preBold: "{strRelProjects}", expanded: true, children: [
							{key: "1-5-0-2", label: "GitHub Research Insights Tool (GRIT)"}
						]}
					]},
					{key: "1-5-1", label: "{INGT2300}", url: "{INGT2300Link}"}
				]}
			]},
			{key: "2", label: "{studyProgramMaster}", postUrl: " ({monthAug} 2025 - {present}) [{degreeMaster}]", url: "{studyProgramMasterLink}", expanded: true, children: [
				{key: "1-0", label: "1{num1Suffix} {strSemester} ({monthAug} 2025 - {present})", expanded: true, children: [
					
				]},
			]}
		] as TreeNode[];
		return {
			windowSize: windowSize,
			panels: [
				{header: "{strMySkills}", tree: skillTree, expanded: this.findExpanded(skillTree)},
				{header: "{strMyProjects}", tree: projectTree, expanded: this.findExpanded(projectTree)},
				{header: "{strMyEducation}", tree: educationTree, expanded: this.findExpanded(educationTree)}
			] as {header: string, tree: TreeNode[], expanded: string[]}[],
			rightPanel: [
				{key: "{strName}", value: "SmileyFace799"},
				{key: "{strBorn}", value: "{personalBirthDate}/{personalBirthMonth}/{personalBirthYear}", confidential: true},
				{key: "{strNationality}", value: "{personalNationality}"},
				{key: "{strLanguages}", value: "{personalLanguages}"},
				{key: "{strOccupation}", value: "Student"},
				{key: "{strAddress}", value: "{personalAddress}", confidential: true},
				{key: "Discord", value: "{personalDiscord}"},
				{key: "{strPhone}", value: "{personalPhone}", confidential: true},
				{key: "{strEmail}", value: "{personalEmail}", confidential: true}
			]
		}
	},

	methods: {
		getLang(): ValidLang {
			return CURRENT_LANG.value;
		},
		setLang(lang: ValidLang): void {
			CURRENT_LANG.value = lang;
		},
		str(key: string): string {
			return STR(key);
		},
		fillKeys(s: string | undefined): string | undefined {
			return s?.replace(/{(.*?)}/g, (_, key) => this.str(key));
		},
		getImage(imgName: string): string {
			return GET_IMAGE(imgName);
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
		},
		shouldBeShown(confidential: boolean | undefined): boolean {
			return confidential ? IS_AUTHENTICATED.value : true;
		}
	}
})
</script>

<style scoped>
h1, h2, h3, h4, h5 {
	margin-top: 0;
}

tbody {
	overflow-x: auto;
}

table, tbody, th, td {
	width: 100%;
	overflow-wrap: break-word;
}

:global(.p-panel-title) {
	font-size: 3rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: auto;
  gap: 2em;
  padding: 2em;
}

.box {
	padding: 2em;
	border-radius: 1em;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25);
}

.rightBox {
	grid-column: 4 / 6;
	grid-row: 1 / 3;
}

.box1 {
  	grid-row: 1;
}

.box2 {
	grid-row: 2;
}

@media (max-width: 961px) {
	.box {
		padding: 1em;
	}
}

@media (max-width: 641px) {
	.grid {
		padding: 2em 1em;
	}
	.box {
		padding: 0.5em;
	}
}

@media (max-width: 400px) {
	.grid {
		padding: 2em 0;
	}
	.box {
		padding: 0;
	}
}
</style>
