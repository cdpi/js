
//@ts-check

/**
 * @template T
 * @typedef {Array<T>} ArrayOfT
 */

/**
 * @typedef {Object} RGB
 * @property {number} red
 * @property {number} green
 * @property {number} blue
 */

/**
 * @param {number} red
 * @param {number} green
 * @param {number} blue
 * 
 * @returns {RGB}
 */
function rgb(red, green, blue)
	{
	return {red: red, green: green, blue: blue};
	}

/**
 * @param {RGB} color
 * 
 * @returns {RGB}
 */
function mix(color)
	{
	const P = 15;

	let {red, green, blue} = color;

	let percent = ((100 - P) / 100);

	red = Math.floor(red * percent);
	green = Math.floor(green * percent);
	blue = Math.floor(blue * percent);

	return rgb(red, green, blue);
	}

/**
 * @param {RGB} color
 * 
 * @returns {ArrayOfT<RGB>}
 */
function palette(color)
	{
	/** @type {ArrayOfT<RGB>} */
	let colors = new Array();

	colors.push(color);

	for (let i = 0; i < 4; i++)
		{
		color = mix(color);

		colors.push(color);
		}

	return colors;
	}

//let colors = palette(rgb(200, 100, 50));
//console.log(colors);

export
	{
	palette
	};
