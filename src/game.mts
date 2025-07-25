
import type { IPoint, Rectangle } from "./geometry.mjs";

/**
 * @since 0.1.0
 */
interface Randomizer
	{
	makeRandomPointInEachCell(columns:number, rows:number, cellSize:number, margin:number):Array<Array<IPoint>>
	}

/**
 * @since 0.1.0
 */
class Grid
	{
	public constructor()
		{
		}
	}

/**
 * @since 0.1.0
 */
class Map<T extends Rectangle> extends Grid implements Randomizer
	{
	public constructor()
		{
		super();
		}

	/**
	 * @since 0.1.0
	 */
	public makeRandomPointInEachCell(columns:number, rows:number, cellSize:number, margin:number):Array<Array<IPoint>>
		{
		const margins = cellSize - 2 * margin;

		const points = new Array<Array<IPoint>>();

		for (let row = 0; row < rows; row++)
			{
			points[row] = new Array<IPoint>();

			for (let column = 0; column < columns; column++)
				{
				const x = column * cellSize + margin + Math.random() * margins;
				const y = row * cellSize + margin + Math.random() * margins;

				points[row][column] = {x, y};
				}
			}

		return points;
		}
	}

/**
 * @since 0.1.0
 */
class Island extends Map<Rectangle>
	{
	public constructor()
		{
		super();
		}
	}

export
	{
	Grid,
	Map,
	Island
	};
