import { ref } from "vue";
import { GET_ENDPOINT, IS_AUTHENTICATED } from "./token";

const commonLang = {
	personalDiscord: "@smileyface799"
} as {[key: string]: string};

const lang = {
	en_us: {
		// String literals
		strRelSkills: "Related skills",
		strRelProjects: "Related projects",
		strRelEducation: "Related education",

		strMySkills: "My skills",
		strProgLangs: "Programming languages",
		strFrameworks: "Frameworks",
		strAgileDev: "Agile development",
		strApiAccessing: "API accessing",
		strDataStorageSerialize: "Data storage & serialization",
		strNetworking: "Networking",
		strDatabases: "Databases",
		strFullStackDev: "Full-stack development",

		strMyProjects: "My projects",
		strNote: "Note",
		strNoGitHub: "GitHub wasn't used before September 2021",
		strDependency: "Dependency",
		strParentProject: "Parent project",

		strMyEducation: "My education",
		strSemester: "semester",

		strAboutMe: "About me",
		strName: "Name",
		strBorn: "Born",
		strNationality: "Nationality",
		strLanguages: "Languages",
		strOccupation: "Occupation",
		strAddress: "Address",
		strPhone: "Phone",
		strEmail: "E-mail",

		// time stuff
		monthJan: "January",
		monthFeb: "February",
		monthMar: "March",
		monthApr: "April",
		monthMay: "May",
		monthJun: "June",
		monthJul: "July",
		monthAug: "August",
		monthSep: "September",
		monthOct: "October",
		monthNov: "November",
		monthDec: "December",
		present: "Present",
		
		// number suffixes
		numDefaultSuffix: "th",
		num1Suffix: "st",
		num2Suffix: "nd",
		num3Suffix: "rd",
		
		// personal info
		personalOccupation: "Student",
		personalNationality: "Norwegian",
		personalLanguages: "Norwegian & English",
		
		// thesises
		thesisBachelor: "Bachelor Theses",
		thesisMaster: "Master's Thesis",
		
		// degrees
		degreeBachelor: "Bachelor Degree",
		degreeMaster: "Master's Degree",
		
		// study programs
		studyProgramHighSchool: "High School",
		studyProgramBachelor: "Computer Science [Bachelor], Application Development | NTNU Ålesund",
		studyProgramBachelorLink: "https://www.ntnu.edu/studies/bidata",
		studyProgramMaster: "Computer Science [2-year Master], Efficient Data Systems | NTNU Trondheim",
		studyProgramMasterLink: "https://www.ntnu.edu/studies/midt",
		
		// subjects
		HMS0006: "HMS0006 Health, Safety and Environment (HSE) course for 1st year students - Ålesund",
		IDATA1001: "IDATA1001 Programming 1",
		IMAA1001: "IMAA1001 Mathematical methods 1",
		INGA1001: "INGA1001 Introduction to the engineering profession",
		IDATA1002: "IDATA1002 Software Engineering",
		IDATA2001: "IDATA2001 Programming 2",
		IMAA2021: "IMAA2021 Mathematical methods 2 for Computer engineering",
		IDATA2302: "IDATA2302 Algorithms and Data Structures",
		IDATA2303: "IDATA2303 Data Modelling and Database Applications",
		IDATA2304: "IDATA2304 Computer communication and network programming",
		ISTA1003: "ISTA1003 Statistics",
		IDATA2301: "IDATA2301 Web Technologies",
		IDATA2305: "IDATA2305 Operating Systems with System Programming",
		IDATA2306: "IDATA2306 Application Development",
		IFYA1002: "IFYA1002 Physics",
		IDATT2505: "IDATT2505 Extended Reality (XR)",
		IDATT2506: "IDATT2506 Application Development for Mobile Units",
		INFT2503: "INFT2503 C++ for programmers",
		IMAT2150: "IMAT2150 Mathematical methods 3 for computer engineers",
		IDATA2900: "IDATA2900 Bachelor Thesis Bachelor of Engineering in Computer Science",
		INGT2300: "INGT2300 Engineering Systems Thinking"
	} as {[key: string]: string},
	nb_no: {
		// String literals
		strRelSkills: "Relaterte ferdigheter",
		strRelProjects: "Relaterte prosjekter",
		strRelEducation: "Relatert utdanning",

		strMySkills: "Mine ferdigheter",
		strProgLangs: "Programmingsspråk",
		strFrameworks: "Rammeverk",
		strAgileDev: "Smidig utvikling",
		strApiAccessing: "API-innhenting",
		strDataStorageSerialize: "Datalagring & serialisering",
		strNetworking: "Nettverk",
		strDatabases: "Databaser",
		strFullStackDev: "Fullstack-utvikling",
		
		strMyProjects: "Mine prosjekter",
		strNote: "NB",
		strNoGitHub: "GitHub ble ikke brukt før September 2021",
		strDependency: "Avhengighet",
		strParentProject: "Hovedprosjekt",

		strMyEducation: "Min utdanning",
		strSemester: "semester",

		strAboutMe: "Om meg",
		strName: "Navn",
		strBorn: "Født",
		strNationality: "Nasjonalitet",
		strLanguages: "Språk",
		strOccupation: "Jobb",
		strAddress: "Addresse",
		strPhone: "Telefon",
		strEmail: "E-post",

		// Time stuff
		monthJan: "Januar",
		monthFeb: "Februar",
		monthMar: "Mars",
		monthApr: "April",
		monthMay: "Mai",
		monthJun: "Juni",
		monthJul: "Juli",
		monthAug: "August",
		monthSep: "September",
		monthOct: "Oktober",
		monthNov: "November",
		monthDec: "Desember",
		present: "Nå",
		
		// number suffixes
		numDefaultSuffix: ".",
		num1Suffix: ".",
		num2Suffix: ".",
		num3Suffix: ".",
		
		// personal info
		personalOccupation: "Student",
		personalNationality: "Norsk",
		personalLanguages: "Norsk & Engelsk",
		
		// thesises
		thesisBachelor: "Bacheloroppgave",
		thesisMaster: "Masteroppgave",
		
		// degrees
		degreeBachelor: "Bachelorgrad",
		degreeMaster: "Mastergrad",
		
		// study programs
		studyProgramHighSchool: "Videregående Skole",
		studyProgramBachelor: "Dataingeniør [Bachelor], Applikasjonsutvikling | NTNU Ålesund",
		studyProgramBachelorLink: "https://www.ntnu.no/studier/bidata",
		studyProgramMaster: "Datateknologi [2-årig Master], Effektive Datasystemer | NTNU Trondheim",
		studyProgramMasterLink: "https://www.ntnu.no/studier/midt",
		
		// subjects
		HMS0006: "HMS0006 HMS-kurs for 1. årsstudenter - Ålesund",
		IDATA1001: "IDATA1001 Programmering 1",
		IMAA1001: "IMAA1001 Matematiske metoder 1",
		INGA1001: "INGA1001 Ingeniørfaglig innføringsemne",
		IDATA1002: "IDATA1002 Systemutvikling",
		IDATA2001: "IDATA2001 Programmering 2",
		IMAA2021: "IMAA2021 Matematiske metoder 2 for dataingeniør",
		IDATA2302: "IDATA2302 Algoritmer og datastrukturer",
		IDATA2303: "IDATA2303 Datamodellering og databaseapplikasjoner",
		IDATA2304: "IDATA2304 Datakommunikasjon og nettverksprogrammering",
		ISTA1003: "ISTA1003 Statistikk",
		IDATA2301: "IDATA2301 Webteknologi",
		IDATA2305: "IDATA2305 Operativsystemer med systemprogrammering",
		IDATA2306: "IDATA2306 Applikasjonsutvikling",
		IFYA1002: "IFYA1002 Fysikk",
		IDATT2505: "IDATT2505 Extended Reality (XR)",
		IDATT2506: "IDATT2506 Applikasjonsutvikling for mobile enheter",
		INFT2503: "INFT2503 C++ for programmerere",
		IMAT2150: "IMAT2150 Matematiske metoder 3 for dataigeniør",
		IDATA2900: "IDATA2900 Bacheloroppgave Bachelor i data",
		INGT2300: "INGT2300 Ingeniørfaglig systemtenkning"
	} as {[key: string]: string}
};
const confidentialLang = {} as typeof lang;
const confidentialCommonLang = {} as typeof commonLang;
export type ValidLang = keyof typeof lang;

export var CURRENT_LANG = ref("en_us" as ValidLang);
export function ALL_LANGS(): ValidLang[] {
	return Object.keys(lang) as ValidLang[];
}

export async function FETCH_CONFIDENTIAL_LANG(token: string): Promise<void> {
	const r = await fetch(GET_ENDPOINT("confidential"), {headers: {"X-API-key": token}});
	const json = r.ok ? await r.json() : null;
	if (json && json.result) {
		for (const l in json.result) {
			if (l in lang) {
				if (!(l in confidentialLang)) {
					confidentialLang[l as ValidLang] = {};
				}
				for (const k in json.result.common) {
					confidentialLang[l as ValidLang][k] = json.result[l][k];
				}
				confidentialLang[l as ValidLang] = json.result[l]
			} else if (l === "common") {
				for (const k in json.result.common) {
					confidentialCommonLang[k] = json.result.common[k];
				}
			}
		}
	}
}

export function CLEAR_CONFIDENTIAL_LANG(): void {
	for (const key in confidentialCommonLang) {
		delete confidentialCommonLang[key];
	}
	for (const l in confidentialLang) {
		for (const key in confidentialLang[l as ValidLang]) {
			delete confidentialLang[l as ValidLang][key];
		}
	}
}

export function STR(key: string): string {
	var keys = IS_AUTHENTICATED.value ? confidentialLang[CURRENT_LANG.value] : undefined; //lang[CURRENT_LANG.value] as {[key: string]: string} | undefined;
	if (keys === undefined || keys[key] === undefined) {
		keys = IS_AUTHENTICATED.value ? confidentialCommonLang : undefined;
	}
	if (keys === undefined || keys[key] === undefined) {
		keys = lang[CURRENT_LANG.value];
	}
	if (keys === undefined || keys[key] === undefined) {
		keys = commonLang;
	}
	return keys !== undefined && keys[key] !== undefined ? keys[key] : `{${key} (MISSING TRANSLATION)}`;
}