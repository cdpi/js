import { type Attributes } from "./dom.js";
import { type Point2D } from "./geometry.js";
declare const NAMESPACE = "http://www.w3.org/2000/svg";
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
    static getCurvedPathFromPoints(points: Array<Point2D>, tension?: number): Path;
}
declare function feFilter<T extends SVGElement>(filterName: string, attributes?: Attributes): T;
declare function filter(attributes?: Attributes): SVGFilterElement;
export { NAMESPACE, svgElement, polygon, type Type, ICommand, Command, MoveTo, CurveTo, ClosePath, Path, feFilter, filter };
