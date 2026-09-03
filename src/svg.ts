
import { type Attributes, setAttributes } from "./dom.js";
import { type Point2D, getControlPoints, pointToString, pointsToString } from "./geometry.js";

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

const NAMESPACE = "http://www.w3.org/2000/svg";

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

function svgElement<T extends SVGElement>(tagName:string, attributes?:Attributes):T
	{
	return setAttributes(document.createElementNS(NAMESPACE, tagName) as T, attributes);
	}

function polygon(points:Array<Point2D>, fill:string = "none", stroke:string = "black"):SVGPolygonElement
	{
	const attributes:{[key:string]:string} =
		{
		points: pointsToString(points, " ", " "),
		fill,
		stroke
		};

	return svgElement<SVGPolygonElement>("polygon", attributes);
	}

//type Type = "M" | "L" | "C" | "Q" | "Z";
type Type = "M" | "C" | "Z";

interface ICommand
	{
	type:Type;
	}

abstract class Command<T> implements ICommand
	{
	public abstract type:Type;
	public readonly value:T;

	constructor(value:T)
		{
		this.value = value;
		}
	}

class MoveTo extends Command<Point2D>
	{
	public readonly type:Type = "M";

	public constructor(point:Point2D)
		{
		super(point);
		}

	public toString():string
		{
		return `${this.type} ${pointToString(this.value, " ")}`;
		}
	}

class CurveTo extends Command<Array<Point2D>>
	{
	public readonly type:Type = "C";

	public constructor(controlPointFrom:Point2D, controlPointTo:Point2D, to:Point2D)
		{
		super(new Array<Point2D>(controlPointFrom, controlPointTo, to));
		}

	public toString():string
		{
		return `${this.type} ${pointsToString(this.value, " ", " ")}`;
		}
	}

class ClosePath extends Command<void>
	{
	public readonly type:Type = "Z";

	public toString():string
		{
		return this.type;
		}
	}

class Path
	{
	protected readonly commands:Array<ICommand>;

	public constructor()
		{
		this.commands = new Array<ICommand>();
		}

	public moveTo(point:Point2D):this
		{
		this.commands.push(new MoveTo(point));

		return this;
		}

	public curveTo(points:Array<Point2D>):this
		{
		this.commands.push(new CurveTo(points[0], points[1], points[2]));

		return this;
		}

	public closePath():this
		{
		this.commands.push(new ClosePath());

		return this;
		}

	public toString():string
		{
		return this.commands.map(command => command.toString()).join(" ");
		}

	public static getCurvedPathFromPoints(points:Array<Point2D>, tension:number = 0.2):Path
		{
		const path:Path = new Path();

		const n:number = points.length;

		path.moveTo(points[0]);

		for (let i = 0; i < n; i++)
			{
			const point1:Point2D = points[(i - 1 + n) % n];
			const point2:Point2D = points[i];
			const point3:Point2D = points[(i + 1) % n];
			const point4:Point2D = points[(i + 2) % n];

			//const controlPoints:Array<Point2D> = Curve.getControlPoints(point1, point2, point3, point4, tension);
			const controlPoints:Array<Point2D> = getControlPoints(point1, point2, point3, point4, tension);

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

function feFilter<T extends SVGElement>(filterName:string, attributes?:Attributes):T
	{
	return svgElement<T>(filterName, attributes);
	}

function filter(attributes?:Attributes):SVGFilterElement
	{
	return svgElement<SVGFilterElement>("filter", attributes);
	}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

export
	{
	NAMESPACE,

	svgElement,
	polygon,

	type Type,
	ICommand,
	Command,
	MoveTo,
	CurveTo,
	ClosePath,
	Path,

	feFilter,
	filter
	};
