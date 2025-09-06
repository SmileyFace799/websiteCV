import { FETCH_CONFIDENTIAL_LANG } from "./lang";

const tokenKey = "token";

export async function SAVE_TOKEN(token: string): Promise<{valid: boolean, code: number, message: string}> {
    localStorage.setItem(tokenKey, token);
    return await USE_TOKEN(token);
}

export function GET_TOKEN(): string | null {
    return localStorage.getItem(tokenKey);
}

export async function USE_TOKEN(token?: string): Promise<{valid: boolean, code: number, message: string}> {
    const t = token ?? GET_TOKEN();
    if (!t) return {valid: false, code: 400, message: "Bad request: No token provided"};

    const r = await fetch('http://localhost:5000/assertValid', {headers: {"X-API-key": t}});
    const json = r.ok ? await r.json() : null;
    const valid = json?.result?.valid
    if (valid) {
        FETCH_CONFIDENTIAL_LANG(t);
    }
    return {valid, code: r.status, message: r.statusText};
}