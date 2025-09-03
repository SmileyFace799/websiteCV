<template>
	<div class="grid">
		<panel class="box leftBox" header="My skills" style="grid-row: 1;">
			<tree :value="skillTree">
				<template #default="{ node }">
					<template v-if="node.url">{{ fillKeys(node.preLink) }}<a :href="fillKeys(node.url)">{{ fillKeys(node.label) }}</a>{{ fillKeys(node.postLink) }}</template>
					<template v-else>{{ fillKeys(node.label) }}</template>
				</template>
			</tree>
		</panel>
		<div class="box leftBox" style="grid-row: 2;">
			<h2>My projects (Oldest -> Newest)</h2>
			<accordion value="0">
				<accordion-panel value="0">
					<accordion-header>Hi I'm a header</accordion-header>
					<accordion-content>
						Hi I'm content :3
					</accordion-content>
				</accordion-panel>
			</accordion>
			<ul>
				<li><a>Python Discord bot</a> (2017 - February 2023) [GitHub wasn't used before September 2021]</li>
				<li><a>Javasweeper Infinite</a> (August 2022 - September 2023)</li>
				<li><a>Economy Management Program</a>* ({{ str("monthJan") }} 2023 - {{ str("monthApr") }} 2023)</li>
				<li><a>Java Discord bot</a> (March 2023 - Present)</li>
				<li>
					<a>Currency Exchanger</a> ({{ str("monthJan") }} 2024)
					<ul>
						<li>Parent project: <a>Web & App Project</a></li>
					</ul></li>
				<li>
					<a>Web & App Project</a>* (February 2024 - May 2024)
					<ul>
						<li>Dependency: <a>Currency Exchanger</a></li>
						<li>Portfolio in subject: <a>{{ str("IDATA2301") }}</a></li>
						<li>Portfolio in subject: <a>{{ str("IDATA2306") }}</a></li>
					</ul>
				</li>
				<li><a>Discord Bot Framework</a> (June 2024 - Present) [Framework used by Java Discord Bot]</li>
				<li><a>RogueSweeper</a> (November 2024 - Present)</li>
				<li><a>GitHub Research Insights Tool (GRIT)</a> (January 2025 - June 2025) [Bachelor Thesis]</li>
				<li><a>Website CV</a> ({{ str("monthSep") }} 2025 - {{ str("present") }})</li>
			</ul>
			*Group project
		</div>
		<panel header="My education" class="box leftBox" style="grid-row: 3;">
			<tree :value="educationTree">
				<template #default="{ node }">
					<template v-if="node.url">{{ fillKeys(node.preLink) }}<a :href="fillKeys(node.url)">{{ fillKeys(node.label) }}</a>{{ fillKeys(node.postLink) }}</template>
					<template v-else>{{ fillKeys(node.label) }}</template>
				</template>
			</tree>
		</panel>
		<div class="box leftBox" style="grid-row: 4;">
			<h2>My education</h2>
			<ul>
				<li>{{ str("studyProgramHighSchool") }} ({{ str("monthAug") }} 2019 - {{ str("monthJun") }} 2022)</li>
				<li>
					<a :href="str('studyProgramBachelorLink')">{{ str("studyProgramBachelor") }}</a> ({{ str("monthAug") }} 2022 - {{ str("monthJun") }} 2025) [{{ str("degreeBachelor") }}]
					<ul>
						<li>
							1{{ str("num1Suffix") }} {{ str("semester") }} ({{ str("monthAug") }} 2022 - {{ str("monthDec") }} 2022)
							<ul>
								<li><a>{{ str("HMS0006") }}</a></li>
								<li><a>{{ str("IDATA1001") }}</a></li>
								<li><a>{{ str("IMAA1001") }}</a></li>
								<li><a>{{ str("INGA1001") }}</a></li>
							</ul>
						</li><li>
							2{{ str("num2Suffix") }} {{ str("semester") }} ({{ str("monthJan") }} 2023 - {{ str("monthJun") }} 2023)
							<ul>
								<li><a>{{ str("IDATA1002") }}</a></li>
								<li><a>{{ str("IDATA2001") }}</a></li>
								<li><a>{{ str("IMAA2021") }}</a></li>
							</ul>
						</li><li>
							3{{ str("num3Suffix") }} {{ str("semester") }} ({{ str("monthAug") }} 2023 - {{ str("monthDec") }} 2023)
							<ul>
								<li><a>{{ str("IDATA2302") }}</a></li>
								<li><a>{{ str("IDATA2303") }}</a></li>
								<li><a>{{ str("IDATA2304") }}</a></li>
								<li><a>{{ str("ISTA1003") }}</a></li>
							</ul>
						</li><li>
							4{{ str("numDefaultSuffix") }} {{ str("semester") }} ({{ str("monthJan") }} 2024 - {{ str("monthJun") }} 2024)
							<ul>
								<li><a>{{ str("IDATA2301") }}</a></li>
								<li><a>{{ str("IDATA2305") }}</a></li>
								<li><a>{{ str("IDATA2306") }}</a></li>
								<li><a>{{ str("IFYA1002") }}</a></li>
							</ul>
						</li><li>
							5{{ str("numDefaultSuffix") }} {{ str("semester") }} ({{ str("monthAug") }} 2024 - {{ str("monthDec") }} 2024)
							<ul>
								<li><a>{{ str("IDATT2505") }}</a></li>
								<li><a>{{ str("IDATT2506") }}</a></li>
								<li><a>{{ str("INFT2503") }}</a></li>
								<li><a>{{ str("IMAT2150") }}</a></li>
							</ul>
						</li><li>
							6{{ str("numDefaultSuffix") }} {{ str("semester") }} ({{ str("monthJan") }} 2025 - {{ str("monthJun") }} 2025)
							<ul>
								<li><a>{{ str("IDATA2900") }}</a></li>
								<li><a>{{ str("INGT2300") }}</a></li>
							</ul>
						</li>
					</ul>
				</li>
				<li>
					<a :href="str('studyProgramMasterLink')">{{ str("studyProgramMaster") }}</a> ({{ str("monthAug") }} 2025 - {{ str("present") }}) [{{ str("degreeMaster") }}]
					<ul>
						<li>
							1{{ str("num1Suffix") }} {{ str("semester") }} ({{ str("monthAug") }} 2025 - {{ str("present") }})
							<ul>

							</ul>
						</li>
					</ul>
				</li>
			</ul>
		</div>
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

export default defineComponent({
	data() {
		return {
			skillTree: [
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
					{key: "1-0", label: "Spring Boot"},
					{key: "1-1", label: "Node.js", children: [
						{key: "1-1-0", label: "Electron"}
					]},
					{key: "1-2", label: "Vue + Vite", children: [
						{key: "1-2-0", label: "Vuetify"},
						{key: "1-2-1", label: "PrimeVue"}
					]},
					{key: "1-3", label: "Godot"}
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
			],
			educationTree: [
				{key: "0", label: "{studyProgramHighSchool} ({monthAug} 2019 - {monthJun} 2022)"},
				{key: "1", label: "{studyProgramBachelor}", postLink: " ({monthAug} 2022 - {monthJun} 2025) [{degreeBachelor}]", url: "{studyProgramBachelorLink}", children: [
					{key: "1-0", label: "1{num1Suffix} {semester} ({monthAug} 2022 - {monthDec} 2022)", children: [
						{key: "1-0-0", label: "{HMS0006}", url: "{HMS0006Link}"},
						{key: "1-0-1", label: "{IDATA1001}", url: "{IDATA1001Link}"},
						{key: "1-0-2", label: "{IMAA1001}", url: "{IMAA1001Link}"},
						{key: "1-0-3", label: "{INGA1001}", url: "{INGA1001Link}"}
					]}
				]}
			]
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
		}
	},
	async mounted() {
		const confidential = await (await fetch('http://localhost:5000/confidential', {
			headers: {
				"X-API-key": "A>3qc>1FVJ<v/g/9WRyEYpiDUaVRVLtv<ASo#{+OqorWhz>d2e"
			}
		})).json()
		console.log(confidential);
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
