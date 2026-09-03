import { type Nullable } from "./util.js";
import { type Point2D } from "./geometry.js";
type AttributeValue = string | number;
type Attributes = {
    [key: string]: AttributeValue;
};
type HTMLOrSVGElement = HTMLElement | SVGElement;
declare function getEventTargetElement(event: Event): Nullable<HTMLOrSVGElement>;
declare function setAttributes<T extends Element>(element: T, attributes?: Attributes): T;
/**
 * Debounce: Attend une pause dans les appels avant d'exécuter la fonction.
 * @param immediate Si true, exécute la fonction au premier appel plutôt qu'au dernier.
 *
 * @author Gemini
 */
declare function debounce<T extends (...args: any[]) => any>(fn: T, wait: number, immediate?: boolean): (...args: Parameters<T>) => void;
/**
 * Throttle: Limite l'exécution à une fois par intervalle de temps fixe.
 *
 * @author Gemini
 */
declare function throttle<T extends (...args: any[]) => any>(fn: T, limit: number): (...args: Parameters<T>) => void;
declare function toDOMPoint(point: Point2D): DOMPoint;
type AudioOff = false;
type AudioOn = {};
type AudioConstraints = AudioOff | AudioOn;
type FacingMode = "user" | "environment" | "left" | "right";
type VideoOff = false;
type VideoOn = {
    facingMode: FacingMode;
    width: {
        ideal: number;
    };
    height: {
        ideal: number;
    };
};
type VideoConstraints = VideoOff | VideoOn;
declare function getMediaStream(audio: AudioConstraints, video: VideoConstraints): Promise<MediaStream>;
declare function getVideoStream(mode: FacingMode, width: number, height: number): Promise<MediaStream>;
declare function getOffscreenCanvasFromImageBlob(blob: Blob): Promise<OffscreenCanvas>;
declare function canvasDrawLineBetweenPoints(context: CanvasRenderingContext2D, points: Array<Point2D>, color: string, close?: boolean): void;
declare const SVG_NAMESPACE = "http://www.w3.org/2000/svg";
declare function svgElement<T extends SVGElement>(tagName: string, attributes?: Attributes): T;
declare function polygon(points: Array<Point2D>, fill?: string, stroke?: string): SVGPolygonElement;
type Type = "M" | "C" | "Z";
interface ICommand {
    type: Type;
}
declare abstract class Command<T> implements ICommand {
    abstract type: Type;
    readonly value: T;
    constructor(value: T);
}
declare class MoveTo extends Command<Point2D> {
    readonly type: Type;
    constructor(point: Point2D);
    toString(): string;
}
declare class CurveTo extends Command<Array<Point2D>> {
    readonly type: Type;
    constructor(controlPointFrom: Point2D, controlPointTo: Point2D, to: Point2D);
    toString(): string;
}
declare class ClosePath extends Command<void> {
    readonly type: Type;
    toString(): string;
}
declare class Path {
    protected readonly commands: Array<ICommand>;
    constructor();
    moveTo(point: Point2D): this;
    curveTo(points: Array<Point2D>): this;
    closePath(): this;
    toString(): string;
}
declare enum Source {
    SourceGraphic = 0,
    SourceAlpha = 1
}
type SourceName = Source | string;
type Input = SourceName;
type Output = SourceName;
type ChannelSelector = "R" | "G" | "B" | "A";
declare function feDisplacementMap(in1: Input, in2: Input, scale: number | string, xChannelSelector: ChannelSelector, yChannelSelector: ChannelSelector, result: Output): SVGFEDisplacementMapElement;
type MorphologyOperator = "erode" | "dilate";
declare function feMorphology(in1: Input, operator: MorphologyOperator, radius: number | string, result: Output): SVGFEMorphologyElement;
type TurbulenceType = "fractalNoise" | "turbulence";
declare function feTurbulence(type: TurbulenceType, baseFrequency: number | string, numOctaves: number, result: Output): SVGFETurbulenceElement;
declare function getAll(): Array<string>;
declare function getActiveStyleSheet(): Nullable<string>;
declare function setActiveStyleSheet(title: string): void;
declare class ThemeManager {
    protected readonly darkMode: MediaQueryList;
    constructor();
    get activeTheme(): Nullable<string>;
    set activeTheme(theme: string);
    get themes(): Array<string>;
    onSystemThemeChange(isDarkMode: boolean): void;
    private init;
}
export { type AttributeValue, type Attributes, type HTMLOrSVGElement, getEventTargetElement, setAttributes, debounce, throttle, toDOMPoint, type AudioOff, type AudioOn, type AudioConstraints, type FacingMode, type VideoOff, type VideoOn, type VideoConstraints, getMediaStream, getVideoStream, getOffscreenCanvasFromImageBlob, canvasDrawLineBetweenPoints, SVG_NAMESPACE, type Type, svgElement, polygon, ICommand, Command, MoveTo, CurveTo, ClosePath, Path, Source, type SourceName, type Input, type Output, type ChannelSelector, type MorphologyOperator, type TurbulenceType, feDisplacementMap, feMorphology, feTurbulence, getAll, getActiveStyleSheet, setActiveStyleSheet, ThemeManager };
