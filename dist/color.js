import { toHex as strToHex } from "./util.js";
function toHex(color, prefix, length) {
    return prefix + strToHex(color >>> 0, true, length);
}
const RRGGBB = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
const RRGGBBAA = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
function parseRRGGBB(text) {
    const match = RRGGBB.exec(text);
    if (match) {
        //console.log(match.length);
        const red = parseInt(match[1], 16);
        const green = parseInt(match[2], 16);
        const blue = parseInt(match[3], 16);
        return { red, green, blue };
    }
    return null;
}
/*
const RGB = /^#?([a-f\d]{1})([a-f\d]{1})([a-f\d]{1})$/i;
const RGBA = /^#?([a-f\d]{1})([a-f\d]{1})([a-f\d]{1})([a-f\d]{1})$/i;

const toInt = (value:string, index:number):number => parseInt(value, 16);

const test = (value:string, regex:RegExp):Array<number> | null =>
    {
    const match = regex.exec(value);

    if (match)
        {
        console.log(match.length);

        return match.map((value, index) => index > 0 ? toInt(value, index) : 0);
        }

    return null;
    };
*/
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
export { toHex, parseRRGGBB };
