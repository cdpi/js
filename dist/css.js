/*
import { toHex } from "../util/string.js";
import { RedGreenBlue } from "../image/color.js";
import { pack888 } from "../util/byte.js";

function colorToHex(color:number):string
    {
    return "#" + toHex(color, true, 6);
    }

function rgbToHex(color:RedGreenBlue):string
    {
    return colorToHex(pack888([color.red, color.green, color.blue]));
    }
*/
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
const ALL = "link[rel~='stylesheet'][title]";
const ACTIVE = "link[rel~='stylesheet']:not(disabled)[title]";
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getAll() {
    const all = new Array();
    document.querySelectorAll(ALL).forEach((link) => {
        all.push(link.title);
    });
    return all;
}
function getActiveStyleSheet() {
    const link = document.querySelector(ACTIVE);
    return link ? link.title : null;
}
function setActiveStyleSheet(title) {
    document.querySelectorAll(ALL)
        .forEach((link) => link.disabled = link.title !== title);
}
class ThemeObserver {
    darkMode;
    constructor() {
        this.darkMode = window.matchMedia("(prefers-color-scheme: dark)");
        this.init();
    }
    init() {
        this.darkMode.addEventListener("change", (event) => this.onSystemThemeChange(event.matches));
    }
}
class ThemeManager extends ThemeObserver {
    constructor() {
        super();
    }
    get activeTheme() {
        return getActiveStyleSheet();
    }
    set activeTheme(theme) {
        setActiveStyleSheet(theme);
    }
    get themes() {
        return getAll();
    }
    onSystemThemeChange(isDarkMode) {
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
export { getAll, getActiveStyleSheet, setActiveStyleSheet, ThemeObserver, ThemeManager };
