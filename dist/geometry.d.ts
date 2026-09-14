import { type Nullable } from "./util.js";
declare const TWOPI: number;
type Point2D = {
    x: number;
    y: number;
};
type Point3D = Point2D & {
    z: number;
};
declare function pointToString(point: Point2D, separator: string): string;
declare function pointsToString(points: Array<Point2D>, pointSeparator: string, pointsSeparator: string): string;
type RadiusModifier = (radius: number, angle: number, index: number) => number;
declare function getRandomRadiusModifier(minimum: number, maximum: number): RadiusModifier;
declare function getWaveRadiusModifier(): RadiusModifier;
declare function getControlPoints(before: Point2D, from: Point2D, to: Point2D, after: Point2D, tension: number): Array<Point2D>;
declare function polygonGetVertices(n: number, radius: number, cx: number, cy: number, modifier?: Nullable<RadiusModifier>): Point2D[];
declare class Polygon {
    n: number;
    radius: number;
    cx: number;
    cy: number;
    constructor(n: number, radius: number, cx?: number, cy?: number);
    get vertices(): Point2D[];
    getVertices(modifier?: Nullable<RadiusModifier>): Point2D[];
    getRandomVertices(minimum: number, maximum: number): Point2D[];
}
declare class Hexagon extends Polygon {
    radius: number;
    cx: number;
    cy: number;
    constructor(radius: number, cx?: number, cy?: number);
}
export { TWOPI, type Point2D, type Point3D, type RadiusModifier, getRandomRadiusModifier, getWaveRadiusModifier, getControlPoints, pointToString, pointsToString, polygonGetVertices, Polygon, Hexagon };
