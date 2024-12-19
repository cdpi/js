
//@ts-check

const _TWO_PI = 2 * Math.PI;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

class Point
	{
	/**
	 * @param {number} x
	 * @param {number} y
	 */
	constructor(x, y)
		{
		this.x = x;
		this.y = y;
		}

	toString()
		{
		return `(${this.x}, ${this.y})`;
		}
	}

const _Point = Point;

/*
class Polygon
	{
	constructor(n)
		{
		this.n = n;
		}
	}

const _Polygon = Polygon;

class Hexagon extends Polygon
	{
	constructor()
		{
		super(6);
		}
	}

const _Hexagon = Hexagon;
*/

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * @param {number} count
 * 
 * @returns {(angle:number) => number}
 */
function toRadian(count)
	{
	return angle => _TWO_PI * angle / count;
	}

/**
 * @param {number} r // radius // Pas sur radius (r de SVG)
 * 
 * @returns {(angle:number) => Point}
 */
function toPoint(r)
	{
	return angle =>
		{
		let x = r * Math.cos(angle);
		let y = r * Math.sin(angle);

		return new Point(x, y);
		};
	}

export
	{
	_Point as Point,
	toRadian,
	toPoint
	};
