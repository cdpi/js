import { type RedGreenBlueAlpha } from "../color.js";
type Color = {
    code: string;
    name: string;
    quote: string;
    ral: string;
    hex: string;
    rgb: RedGreenBlueAlpha;
};
declare class CesarBazaar {
    constructor();
    buildPalette(colors: Array<Color>): string;
    getColors(): Promise<Array<Color>>;
    private getCodes;
    private getColor;
}
export { type Color, CesarBazaar };
