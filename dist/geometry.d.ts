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
export { TWOPI, type Point2D, type Point3D, type RadiusModifier, getRandomRadiusModifier, getWaveRadiusModifier, getControlPoints, pointToString, pointsToString };
