import { ref } from "vue";
import { CLEAR_CONFIDENTIAL_IMGS, LOAD_CONFIDENTIAL_IMGS } from "./img";
import { CLEAR_CONFIDENTIAL_LANG, FETCH_CONFIDENTIAL_LANG } from "./lang";

const tokenKey = "token";
const baseEndpoint = import.meta.env.PROD ? "http://smiley-face.no:8000" : "http://localhost:5000";

export const IS_AUTHENTICATED = ref(false);
export function GET_ENDPOINT(relativeEndpoint: string): string {
    return `${baseEndpoint}/${relativeEndpoint}`
}
function clearConfidential() {
    CLEAR_CONFIDENTIAL_LANG();
    CLEAR_CONFIDENTIAL_IMGS();
    IS_AUTHENTICATED.value = false;
}

export async function SAVE_TOKEN(token: string): Promise<{valid: boolean, code: number, message: string}> {
    localStorage.setItem(tokenKey, token);
    return await USE_TOKEN(token);
}

export function CLEAR_TOKEN(): void {
    localStorage.removeItem(tokenKey);
    clearConfidential();
}

export function GET_TOKEN(): string | null {
    return localStorage.getItem(tokenKey);
}

export async function USE_TOKEN(token?: string): Promise<{valid: boolean, code: number, message: string}> {
    const t = token ?? GET_TOKEN();
    if (!t) return {valid: false, code: 400, message: "Bad request: No token provided"};

    const r = await fetch(GET_ENDPOINT("assertValid"), {headers: {"X-API-key": t}});
    const json = r.ok ? await r.json() : null;
    const valid = json?.result?.valid
    if (valid) {
        await Promise.all([
            FETCH_CONFIDENTIAL_LANG(t),
            LOAD_CONFIDENTIAL_IMGS(t)
        ]);
        IS_AUTHENTICATED.value = true;
    } else {
        clearConfidential();
    }
    return {valid, code: r.status, message: r.statusText};
}