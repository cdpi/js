import { type RedGreenBlue } from "../color.js";
type ColorData = {
    source: string;
    name: string;
    hex: string;
    rgb: RedGreenBlue;
};
declare function parseColors(wikitext: string): Array<ColorData>;
export { type ColorData, parseColors };
