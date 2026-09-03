
import { getRandom } from "./util.js";

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

const TWOPI = 2 * Math.PI;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
interface IPoint2D
	{
	x:number;
	y:number;
	delta(to:IPoint2D):IPoint2D;
	tension(value:number):this;
	}

interface IPoint3D extends IPoint2D
	{
	z:number;
	}

class Point2D implements IPoint2D
	{
	public constructor(public x:number, public y:number)
		{
		}

	public delta(to:IPoint2D):IPoint2D
		{
		//return new Point(to.x - this.x, to.y - this.y);
		//throw new Error("Method not implemented.");
		throw new NotImplementedError();
		}

	public tension(value:number):this
		{
		//this.x *= value;
		//this.y *= value;
		//return this;
		//throw new Error("Method not implemented.");
		throw new NotImplementedError();
		}
	}

class Point3D extends Point2D implements IPoint3D
	{
	public constructor(x:number, y:number, public z:number)
		{
		super(x, y);
		}
	}
*/

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Point
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

type Point2D =
	{
	x:number;
	y:number;
	};

type Point3D = Point2D &
	{
	z:number;
	};

function pointToString(point:Point2D, separator:string):string
	{
	return `${point.x}${separator}${point.y}`;
	}

function pointsToString(points:Array<Point2D>, pointSeparator:string, pointsSeparator:string):string
	{
	return points.map(point => pointToString(point, pointSeparator)).join(pointsSeparator);
	}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Polygon
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

type RadiusModifier = (radius:number, angle:number, index:number) => number;

function getRandomRadiusModifier(minimum:number, maximum:number):RadiusModifier
	{
	return (radius:number, angle:number, index:number) =>
		{
		return getRandom(minimum, maximum);
		};
	}

function getWaveRadiusModifier():RadiusModifier
	{
	return (radius:number, angle:number, index:number) =>
		{
		return radius + (Math.sin(angle * 4) * 10);
		};
	}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Curve
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
class Curve
	{
	public static getControlPoints(before:IPoint2D, from:IPoint2D, to:IPoint2D, after:IPoint2D, tension:number):Array<IPoint2D>
		{
		const x1:number = from.x + (to.x - before.x) * tension;
		const y1:number = from.y + (to.y - before.y) * tension;

		const x2:number = to.x - (after.x - from.x) * tension;
		const y2:number = to.y - (after.y - from.y) * tension;

		return new Array<IPoint2D>(new Point2D(x1, y1), new Point2D(x2, y2));
		}

	public static getControlPoints2(before:IPoint2D, from:IPoint2D, to:IPoint2D, after:IPoint2D, tension:number):Array<IPoint2D>
		{
		const d1:IPoint2D = before.delta(to).tension(tension);
		const d2:IPoint2D = from.delta(after).tension(tension);

		const cp1:IPoint2D = new Point2D(from.x + d1.x, from.y + d1.y);
		const cp2:IPoint2D = new Point2D(to.x - d2.x, to.y - d2.y);

		return new Array<IPoint2D>(cp1, cp2);
		}

	// **
	public static toBezier(from:IPoint, to:IPoint, tension:number):Array<IPoint>
		{
		const dx:number = to.x - from.x;
		const dy:number = to.y - from.y;

		const controlPointFrom:IPoint = new Point(from.x + dx * tension, from.y);
		const controlPointTo:IPoint = new Point(to.x - dy * tension, to.y);

		return new Array<IPoint>(from, controlPointFrom, controlPointTo, to);
		}
	** //
	}
*/

function getControlPoints(before:Point2D, from:Point2D, to:Point2D, after:Point2D, tension:number):Array<Point2D>
	{
	const x1:number = from.x + (to.x - before.x) * tension;
	const y1:number = from.y + (to.y - before.y) * tension;

	const x2:number = to.x - (after.x - from.x) * tension;
	const y2:number = to.y - (after.y - from.y) * tension;

	return new Array<Point2D>({x: x1, y: y1}, {x: x2, y: y2});
	}

/*
class Polygon
	{
	constructor(public readonly n:number)
		{
		}

	public getVertices(cx:number, cy:number, radius:number, modifier:RadiusModifier|null = null):Array<IPoint2D>
		{
		const vertices:Array<IPoint2D> = new Array<IPoint2D>();

		const step:number = TWOPI / this.n;

		for (let i = 0; i < this.n; i++)
			{
			const angle:number = i * step;

			let newRadius:number = radius;

			if (modifier)
				{
				newRadius = modifier(newRadius, angle, i);
				}

			const x = cx + Math.cos(angle) * newRadius;
			const y = cy + Math.sin(angle) * newRadius;

			vertices.push(new Point2D(x, y));
			}

		return vertices;
		}

	public getRandomVertices(cx:number, cy:number, radius:number, minimum:number, maximum:number):Array<IPoint2D>
		{
		return this.getVertices(cx, cy, radius, getRandomRadiusModifier(minimum, maximum));
		}
	}
*/

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

export
	{
	TWOPI,

	type Point2D,
	type Point3D,
	type RadiusModifier,

	getRandomRadiusModifier,
	getWaveRadiusModifier,
	getControlPoints,
	pointToString,
	pointsToString
	};
