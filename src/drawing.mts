
import type { Point } from "./geometry.mjs";

/**
 * @since 0.1.0
 */
interface RGB
	{
	red:number;
	green:number;
	blue:number;
	}

/**
 * @since 0.1.0
 */
interface Renderer<T, R>
	{
	render(to:T):R
	}

/**
 * @since 0.1.0
 */
class Color
	{
	/**
	 * @since 0.1.0
	 */
	getAverageColor(context:CanvasImageData, x:number, y:number, width:number, height:number):RGB
		{
		const count = width * height;

		let r = 0, g = 0, b = 0;

		const pixels = context.getImageData(x, y, width, height).data;

		for (let i = 0; i < pixels.length; i += 4)
			{
			r += pixels[i];
			g += pixels[i + 1];
			b += pixels[i + 2];
			}

		r = Math.round(r / count);
		g = Math.round(g / count);
		b = Math.round(b / count);

		return {red: r, green: g, blue: b};
		}
	}

/**
 * @since 0.1.0
 */
class CanvasRenderer implements Renderer<CanvasRenderingContext2D, void>
	{
	private context:CanvasRenderingContext2D;

	public constructor(context:CanvasRenderingContext2D)
		{
		this.context = context;
		}

	public drawBezier()
		{
		const mesh =
			[
			{x: 100, y: 100},
			{x: 300, y: 100},
			{x: 200, y: 300}
			];

/*
ctx.strokeStyle = 'blue';

for (let i = 0; i < mesh.length; i++)
	{
	const from = mesh[i];
	const to = mesh[(i + 1) % mesh.length];

	const points = bezier(from, to);

	ctx.beginPath();
	ctx.moveTo(points[0].x, points[0].y);
	ctx.bezierCurveTo(points[1].x, points[1].y, points[2].x, points[2].y, points[3].x, points[3].y);
	ctx.stroke();
	}
*/
		}

	public render(to:CanvasRenderingContext2D):void
		{
		}
	}

/**
 * @since 0.1.0
 */
class Drawing
	{
	private context:CanvasRenderingContext2D;

	public constructor(context:CanvasRenderingContext2D)
		{
		this.context = context;
		}

	/**
	 * @since 0.1.0
	 */
	public drawLineBetweenPoints(points:Array<Point>, color:string):void
		{
		//console.debug(points);

		this.context.beginPath();

		this.context.moveTo(points[0].x, points[0].y);

		this.context.lineTo(points[1].x, points[1].y);
		this.context.lineTo(points[2].x, points[2].y);
		this.context.lineTo(points[3].x, points[3].y);
		this.context.lineTo(points[0].x, points[0].y);

		this.context.strokeStyle = color;

		this.context.stroke();
		}
	}

export
	{
	RGB,
	Color,
	Renderer,
	Drawing
	};
