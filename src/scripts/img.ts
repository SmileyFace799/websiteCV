import smiley from '../assets/smiley_pfp.png';
import { IS_AUTHENTICATED } from "./token";

const imgs = {
    "smileyface799": smiley
} as {[key: string]: string};
const confidentialImgs = {} as {[key: string]: string};

async function fetchImage(imgName: string, token: string): Promise<void> {
    const r = await fetch(`http://localhost:5000/confidential/image/png?name=${encodeURIComponent(imgName)}`, {headers: {"X-API-key": token}});
    const blob = r.ok ? await r.blob() : undefined;
    if (blob) {
        if (!(imgName in imgs)) {
            confidentialImgs[imgName] = "";
        }
        confidentialImgs[imgName] = URL.createObjectURL(blob);
    }
}

export async function LOAD_CONFIDENTIAL_IMGS(token: string): Promise<void> {
    await Promise.all(Object.keys(imgs).map(k => fetchImage(k, token)));
}

export function CLEAR_CONFIDENTIAL_IMGS(): void {
    for (const key in confidentialImgs) {
        delete confidentialImgs[key];
    }
}

export function GET_IMAGE(imgName: string): string {
    var image = undefined as string | undefined;
    if (IS_AUTHENTICATED && imgName in confidentialImgs) {
        image = confidentialImgs[imgName];
    }
    if (image === undefined && imgName in imgs) {
        image = imgs[imgName];
    }
    return image ?? "";
}