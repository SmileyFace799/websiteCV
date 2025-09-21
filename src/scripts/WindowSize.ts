import { ref } from "vue";

const sizes = ["xs", "s", "m", "l", "xl"] as const;
const thresholds = [0, 400, 641, 961, 1241];

const currentSizeIndex = ref(sizes.length - 1);

function updateSize() {
    let i = sizes.length - 1;
    while (i > 0 && thresholds[i] >= window.innerWidth) {
        --i;
    }
    currentSizeIndex.value = i;
}
export default {
    atLeast: (size: typeof sizes[number]): boolean => currentSizeIndex.value >= sizes.indexOf(size),
    lessThan: (size: typeof sizes[number]): boolean => currentSizeIndex.value < sizes.indexOf(size),

    /**
     * A sort of "switch function" that will return the case for the largest size that doesn't exceed the current window size.
     * The "xs" size has to be defined, so that this function is always defined for all sizes
     * 
     * @param cases An object containing sizes as keys, can return values as values. Valid sizes are "xs", "s", "m" & "l"
     * @returns The value of the largest case where `caseSize <= windowSize`
     */
    pick<T>(cases: {[key in typeof sizes[number]]: T} & {xs: T}): T {
        let i = currentSizeIndex.value;
        let foundCase = cases.xs;
        while (i >= 0 && foundCase === cases.xs) {
            const k = sizes[i];
            if (k in cases) {
                foundCase = cases[k];
            }
            --i;
        }
        return foundCase;
    },

    startTracking(): void {
        updateSize();
        window.addEventListener("resize", updateSize)
    },
    stopTracking: () => window.removeEventListener("resize", updateSize)
}