import { pointToString, pointsToString } from "./geometry.js";
//type Point = Point2D | DOMPoint;
function getEventTargetElement(event) {
    if (event.target) {
        if (event.target instanceof HTMLElement) {
            return event.target;
        }
        if (event.target instanceof SVGElement) {
            return event.target;
        }
    }
    return null;
}
function setAttributes(element, attributes) {
    if (attributes) {
        for (const [attribute, value] of Object.entries(attributes)) {
            element.setAttribute(attribute, String(value));
        }
    }
    return element;
}
/**
 * Debounce: Attend une pause dans les appels avant d'exécuter la fonction.
 * @param immediate Si true, exécute la fonction au premier appel plutôt qu'au dernier.
 *
 * @author Gemini
 */
function debounce(fn, wait, immediate = false) {
    let timeout = null;
    return function (...args) {
        const context = this;
        const later = () => {
            timeout = null;
            if (!immediate) {
                fn.apply(context, args);
            }
        };
        const callNow = immediate && !timeout;
        if (timeout !== null) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(later, wait);
        if (callNow) {
            fn.apply(context, args);
        }
    };
}
/**
 * Throttle: Limite l'exécution à une fois par intervalle de temps fixe.
 *
 * @author Gemini
 */
function throttle(fn, limit) {
    let inThrottle = false;
    return function (...args) {
        if (!inThrottle) {
            fn.apply(this, args);
            inThrottle = true;
            setTimeout(() => { inThrottle = false; }, limit);
        }
    };
}
function toDOMPoint(point) {
    return new DOMPoint(point.x, point.y);
}
async function getMediaStream(audio, video) {
    return await navigator.mediaDevices.getUserMedia({ audio, video });
}
async function getVideoStream(mode, width, height) {
    return await getMediaStream(false, { facingMode: mode, width: { ideal: width }, height: { ideal: height } });
}
/*
async function displayVideoStream(element:HTMLVideoElement, idealWidth:number, idealHeight:number):Promise<void>
    {
    element.srcObject = await getVideoStream("environment", idealWidth, idealHeight);
    }
*/
async function getOffscreenCanvasFromImageBlob(blob) {
    const bitmap = await createImageBitmap(blob);
    const { width, height } = bitmap;
    const canvas = new OffscreenCanvas(width, height);
    const context = canvas.getContext("2d");
    canvas.width = width;
    canvas.height = height;
    context.drawImage(bitmap, 0, 0);
    return canvas;
}
function canvasDrawLineBetweenPoints(context, points, color, close = false) {
    const n = points.length;
    context.beginPath();
    context.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < n; i++) {
        context.lineTo(points[i].x, points[i].y);
    }
    if (close) {
        context.lineTo(points[0].x, points[0].y);
    }
    context.strokeStyle = color;
    context.stroke();
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SVG
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
const SVG_NAMESPACE = "http://www.w3.org/2000/svg";
function svgElement(tagName, attributes) {
    return setAttributes(document.createElementNS(SVG_NAMESPACE, tagName), attributes);
}
function polygon(points, fill = "none", stroke = "black") {
    const attributes = {
        points: pointsToString(points, " ", " "),
        fill,
        stroke
    };
    return svgElement("polygon", attributes);
}
class Command {
    value;
    constructor(value) {
        this.value = value;
    }
}
class MoveTo extends Command {
    type = "M";
    constructor(point) {
        super(point);
    }
    toString() {
        return `${this.type} ${pointToString(this.value, " ")}`;
    }
}
class CurveTo extends Command {
    type = "C";
    constructor(controlPointFrom, controlPointTo, to) {
        super(new Array(controlPointFrom, controlPointTo, to));
    }
    toString() {
        return `${this.type} ${pointsToString(this.value, " ", " ")}`;
    }
}
class ClosePath extends Command {
    type = "Z";
    toString() {
        return this.type;
    }
}
class Path {
    commands;
    constructor() {
        this.commands = new Array();
    }
    moveTo(point) {
        this.commands.push(new MoveTo(point));
        return this;
    }
    curveTo(points) {
        this.commands.push(new CurveTo(points[0], points[1], points[2]));
        return this;
    }
    closePath() {
        this.commands.push(new ClosePath());
        return this;
    }
    toString() {
        return this.commands.map(command => command.toString()).join(" ");
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SVG Filter
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
var Source;
(function (Source) {
    Source[Source["SourceGraphic"] = 0] = "SourceGraphic";
    Source[Source["SourceAlpha"] = 1] = "SourceAlpha";
})(Source || (Source = {}));
function feDisplacementMap(in1, in2, scale, xChannelSelector, yChannelSelector, result) {
    return svgElement("feDisplacementMap", { in: in1, in2, scale, xChannelSelector, yChannelSelector, result });
}
function feMorphology(in1, operator, radius, result) {
    return svgElement("feMorphology", { in1, operator, radiusX: radius, radiusY: radius, result });
}
function feTurbulence(type, baseFrequency, numOctaves, result) {
    return svgElement("feTurbulence", { type, baseFrequency, numOctaves, result });
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CSS
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
const ALL = "link[rel~='stylesheet'][title]";
const ACTIVE = "link[rel~='stylesheet']:not(disabled)[title]";
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
class ThemeManager {
    darkMode;
    constructor() {
        this.darkMode = window.matchMedia("(prefers-color-scheme: dark)");
        this.init();
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
    init() {
        this.darkMode.addEventListener("change", (event) => this.onSystemThemeChange(event.matches));
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
export { getEventTargetElement, setAttributes, debounce, throttle, toDOMPoint, getMediaStream, getVideoStream, getOffscreenCanvasFromImageBlob, canvasDrawLineBetweenPoints, 
// SVG
SVG_NAMESPACE, svgElement, polygon, Command, MoveTo, CurveTo, ClosePath, Path, 
// SVG Filter
Source, feDisplacementMap, feMorphology, feTurbulence, 
// CSS
getAll, getActiveStyleSheet, setActiveStyleSheet, ThemeManager };
