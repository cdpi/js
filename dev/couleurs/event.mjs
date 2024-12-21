
//@ts-check

class ColorEvent extends Event
	{
	/**
	 * @param {any} color
	 */
	constructor(color)
		{
		super("color");

		this._color = color;
		}

	/**
	 * @returns {any}
	 */
	get color()
		{
		return this._color;
		}
	}

//new ColorEvent("sdd");
export
	{
	ColorEvent
	};
