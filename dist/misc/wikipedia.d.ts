import { type RedGreenBlue } from "../color.js";
type NamedColors = Record<string, RedGreenBlue>;
declare function getWikiText(page: string, section?: number): Promise<string>;
declare function getWebColors(): Promise<NamedColors>;
export { type NamedColors, getWikiText, getWebColors };
