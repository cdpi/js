
import { type Nullable } from "./util.js";
import { type Point2D, getControlPoints, pointToString, pointsToString } from "./geometry.js";

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DOM
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

type AttributeValue = string | number;

type Attributes = {[key:string]:AttributeValue};

type HTMLOrSVGElement = HTMLElement | SVGElement;

//type Point = Point2D | DOMPoint;

function getEventTargetElement(event:Event):Nullable<HTMLOrSVGElement>
	{
	if (event.target)
		{
		if (event.target instanceof HTMLElement)
			{
			return event.target as HTMLElement;
			}

		if (event.target instanceof SVGElement)
			{
			return event.target as SVGElement;
			}
		}

	return null;
	}

function setAttributes<T extends Element>(element:T, attributes?:Attributes):T
	{
	if (attributes)
		{
		for (const [attribute, value] of Object.entries(attributes))
			{
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
function debounce<T extends (...args:any[]) => any>(fn:T, wait:number, immediate:boolean = false):(...args:Parameters<T>) => void
	{
	let timeout:ReturnType<typeof setTimeout> | null = null;

	return function(this:any, ...args:Parameters<T>):void
		{
		const context = this;

		const later = () =>
			{
			timeout = null;

			if (!immediate)
				{
				fn.apply(context, args);
				}
			};

		const callNow = immediate && !timeout;

		if (timeout !== null)
			{
			clearTimeout(timeout);
			}

		timeout = setTimeout(later, wait);

		if (callNow)
			{
			fn.apply(context, args);
			}
		};
	}

/**
 * Throttle: Limite l'exécution à une fois par intervalle de temps fixe.
 * 
 * @author Gemini
 */
function throttle<T extends (...args:any[]) => any>(fn:T, limit:number):(...args:Parameters<T>) => void
	{
	let inThrottle:boolean = false;

	return function(this:any, ...args:Parameters<T>): void
		{
		if (!inThrottle)
			{
			fn.apply(this, args);

			inThrottle = true;

			setTimeout(() => {inThrottle = false;}, limit);
			}
		};
	}

function toDOMPoint(point:Point2D):DOMPoint
	{
	return new DOMPoint(point.x, point.y);
	}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// HTML
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

type AudioOff = false;

type AudioOn =
	{
	};

type AudioConstraints = AudioOff | AudioOn;

type FacingMode = "user" | "environment" | "left" | "right";

type VideoOff = false;

type VideoOn =
	{
	facingMode:FacingMode,
	width:
		{
		ideal:number
		},
	height:
		{
		ideal:number
		}
	};

type VideoConstraints = VideoOff | VideoOn;

async function getMediaStream(audio:AudioConstraints, video:VideoConstraints):Promise<MediaStream>
	{
	return await navigator.mediaDevices.getUserMedia({audio, video});
	}

async function getVideoStream(mode:FacingMode, width:number, height:number):Promise<MediaStream>
	{
	return await getMediaStream(false, {facingMode: mode, width: {ideal: width}, height: {ideal: height}});
	}

/*
async function displayVideoStream(element:HTMLVideoElement, idealWidth:number, idealHeight:number):Promise<void>
	{
	element.srcObject = await getVideoStream("environment", idealWidth, idealHeight);
	}
*/

async function getOffscreenCanvasFromImageBlob(blob:Blob):Promise<OffscreenCanvas>
	{
	const bitmap = await createImageBitmap(blob);

	const { width, height } = bitmap;

	const canvas = new OffscreenCanvas(width, height);

	const context = canvas.getContext("2d") as OffscreenCanvasRenderingContext2D;

	canvas.width = width;
	canvas.height = height;

	context.drawImage(bitmap, 0, 0);

	return canvas;
	}

function canvasDrawLineBetweenPoints(context:CanvasRenderingContext2D, points:Array<Point2D>, color:string, close:boolean = false):void
	{
	const n:number = points.length;

	context.beginPath();

	context.moveTo(points[0].x, points[0].y);

	for (let i = 1; i < n; i++)
		{
		context.lineTo(points[i].x, points[i].y);
		}

	if (close)
		{
		context.lineTo(points[0].x, points[0].y);
		}

	context.strokeStyle = color;

	context.stroke();
	}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SVG
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

const SVG_NAMESPACE = "http://www.w3.org/2000/svg";

function svgElement<T extends SVGElement>(tagName:string, attributes?:Attributes):T
	{
	return setAttributes(document.createElementNS(SVG_NAMESPACE, tagName) as T, attributes);
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

	/*
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
	*/
	}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SVG Filter
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

enum Source
	{
	SourceGraphic,
	SourceAlpha
	}

type SourceName = Source | string;

type Input = SourceName;

type Output = SourceName;

// Sert vraiment à rien
/*
function feFilter<T extends SVGElement>(filterName:string, attributes?:Attributes):T
	{
	return svgElement<T>(filterName, attributes);
	}

function filter(attributes?:Attributes):SVGFilterElement
	{
	return svgElement<SVGFilterElement>("filter", attributes);
	}
*/

type ChannelSelector = "R" | "G" | "B" | "A";

function feDisplacementMap(in1:Input, in2:Input, scale:number|string, xChannelSelector:ChannelSelector, yChannelSelector:ChannelSelector, result:Output):SVGFEDisplacementMapElement
	{
	return svgElement<SVGFEDisplacementMapElement>("feDisplacementMap", {in: in1, in2, scale, xChannelSelector, yChannelSelector, result});
	}

type MorphologyOperator = "erode" | "dilate";

function feMorphology(in1:Input, operator:MorphologyOperator, radius:number|string, result:Output):SVGFEMorphologyElement
	{
	return svgElement<SVGFEMorphologyElement>("feMorphology", {in1, operator, radiusX: radius, radiusY: radius, result});
	}

type TurbulenceType = "fractalNoise" | "turbulence";

function feTurbulence(type:TurbulenceType, baseFrequency:number|string, numOctaves:number, result:Output):SVGFETurbulenceElement
	{
	return svgElement<SVGFETurbulenceElement>("feTurbulence", {type, baseFrequency, numOctaves, result});
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

function getAll():Array<string>
	{
	const all:Array<string> = new Array<string>();

	document.querySelectorAll<HTMLLinkElement>(ALL).forEach((link:HTMLLinkElement) =>
		{
		all.push(link.title);
		});

	return all;
	}

function getActiveStyleSheet():Nullable<string>
	{
	const link:HTMLLinkElement|null = document.querySelector<HTMLLinkElement>(ACTIVE);

	return link ? link.title : null;
	}

function setActiveStyleSheet(title:string):void
	{
	document.querySelectorAll<HTMLLinkElement>(ALL)
		.forEach((link:HTMLLinkElement) => link.disabled = link.title !== title);
	}

class ThemeManager
	{
	protected readonly darkMode:MediaQueryList;

	public constructor()
		{
		this.darkMode = window.matchMedia("(prefers-color-scheme: dark)");

		this.init();
		}

	public get activeTheme():Nullable<string>
		{
		return getActiveStyleSheet();
		}

	public set activeTheme(theme:string)
		{
		setActiveStyleSheet(theme);
		}

	public get themes():Array<string>
		{
		return getAll();
		}

	public onSystemThemeChange(isDarkMode:boolean):void
		{
		}

	private init():void
		{
		this.darkMode.addEventListener("change", (event:MediaQueryListEvent) => this.onSystemThemeChange(event.matches));
		}
	}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

export
	{
	// DOM
	type AttributeValue,
	type Attributes,
	type HTMLOrSVGElement,
	getEventTargetElement,
	setAttributes,
	debounce,
	throttle,
	toDOMPoint,

	// HTML
	type AudioOff,
	type AudioOn,
	type AudioConstraints,
	type FacingMode,
	type VideoOff,
	type VideoOn,
	type VideoConstraints,
	getMediaStream,
	getVideoStream,
	getOffscreenCanvasFromImageBlob,
	canvasDrawLineBetweenPoints,

	// SVG
	SVG_NAMESPACE,
	type Type,
	svgElement,
	polygon,
	ICommand,
	Command,
	MoveTo,
	CurveTo,
	ClosePath,
	Path,

	// SVG Filter
	Source,
	type SourceName,
	type Input,
	type Output,
	type ChannelSelector,
	type MorphologyOperator,
	type TurbulenceType,
	feDisplacementMap,
	feMorphology,
	feTurbulence,

	// CSS
	getAll,
	getActiveStyleSheet,
	setActiveStyleSheet,
	ThemeManager
	};
