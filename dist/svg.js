import { setAttributes } from "./dom.js";
import { getControlPoints, pointToString, pointsToString } from "./geometry.js";
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
const NAMESPACE = "http://www.w3.org/2000/svg";
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
function svgElement(tagName, attributes) {
    return setAttributes(document.createElementNS(NAMESPACE, tagName), attributes);
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
    static getCurvedPathFromPoints(points, tension = 0.2) {
        const path = new Path();
        const n = points.length;
        path.moveTo(points[0]);
        for (let i = 0; i < n; i++) {
            const point1 = points[(i - 1 + n) % n];
            const point2 = points[i];
            const point3 = points[(i + 1) % n];
            const point4 = points[(i + 2) % n];
            //const controlPoints:Array<Point2D> = Curve.getControlPoints(point1, point2, point3, point4, tension);
            const controlPoints = getControlPoints(point1, point2, point3, point4, tension);
            //commands.push(new CurveTo(controlPoints[0], controlPoints[1], point3));
            path.curveTo([controlPoints[0], controlPoints[1], point3]);
        }
        path.closePath();
        return path;
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CSS Filter
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
function feFilter(filterName, attributes) {
    return svgElement(filterName, attributes);
}
function filter(attributes) {
    return svgElement("filter", attributes);
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
export { NAMESPACE, svgElement, polygon, Command, MoveTo, CurveTo, ClosePath, Path, feFilter, filter };
