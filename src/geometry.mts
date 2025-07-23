
/**
 * @since 0.1.0
 */
interface IPoint
	{
	x:number;
	y:number;
	}

/**
 * @since 0.1.0
 */
interface IPath
	{
	points:Array<IPoint>;

	toBezier(from:IPoint, to:IPoint, tension:number):Array<IPoint>;
	}

/*
interface IBezier
	{
	sdsd():void
	}
*/

/**
 * @since 0.1.0
 */
class Polygon implements IPath
	{
	points:Array<IPoint>;

	public constructor()
		{
		}

	public toBezier(from:IPoint, to:IPoint, tension:number):Array<IPoint>
		{
		const dx = to.x - from.x;
		const dy = to.y - from.y;

		const controlPoint1 = {x: from.x + dx * tension, y: from.y};
		const controlPoint2 = {x: to.x - dy * tension, y: to.y};

		return new Array(from, controlPoint1, controlPoint2, to);
		}
	}

/**
 * @since 0.1.0
 */
class Rectangle extends Polygon
	{
	public constructor()
		{
		super();
		}
	}

/**
 * @since 0.1.0
 */
class Hexagon extends Polygon
	{
	public constructor()
		{
		super();
		}
	}

export
	{
	IPoint,
	IPath,
	Polygon,
	Rectangle,
	Hexagon
	};
