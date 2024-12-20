
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
 * @param {RGB} rgb
 */
function mix(rgb)
	{
	//rgb.red;
	}

/**
 * @param {ArrayOfT<RGB>} colors
 */
function palette(colors)
	{
	colors.push(rgb(232,23,43));
	}
