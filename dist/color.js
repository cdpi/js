import { toHex as strToHex } from "./util.js";
function toHex(color, prefix, length) {
    return prefix + strToHex(color >>> 0, true, length);
}
const patterns = [
    // RRGGBB
    /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i,
    // RRGGBBAA
    /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i,
    // TODO: RGB
    // /^#?([a-f\d]{1})([a-f\d]{1})([a-f\d]{1})$/i,
    // TODO: RGBA
    // /^#?([a-f\d]{1})([a-f\d]{1})([a-f\d]{1})([a-f\d]{1})$/i
];
function parseColor(text, regexp) {
    const match = regexp.exec(text);
    if (match) {
        // Supprime le premier élément qui est le texte entier
        match.shift();
        const components = match.map(value => parseInt(value, 16));
        if (components.length < 4) {
            // Ajoute alpha si pas présent
            components.push(255);
        }
        const [red, green, blue, alpha] = components;
        return { red, green, blue, alpha };
    }
    return null;
}
function parse(text) {
    for (const pattern of patterns) {
    }
    for (let i = 0; i < patterns.length; i++) {
        const pattern = patterns[i];
        const color = parseColor(text, pattern);
        if (color) {
            return color;
        }
    }
    return null;
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
export { toHex, parse };
