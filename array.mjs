
//@ts-check

/**
 * @param {any} initialValue
 * 
 * @returns {(value:any, index:number) => any}
 */
function initialize(initialValue)
	{
	return (value, index) => initialValue;
	}

/**
 * @param {number} start
 * 
 * @returns {(value:any, index:number) => any}
 */
function increment(start = 0)
	{
	return (value, index) => start + index;
	}

/**
 * @param {number} start
 * 
 * @returns {(value:any, index:number) => any}
 */
function decrement(start)
	{
	return (value, index) => start - index;
	}

/**
 * @param {number} count
 * @param {(value:any, index:number) => any} generator
 * 
 * @returns {Array<any>}
 */
function sequence(count, generator = increment(0))
	{
	return Array.from({length: count}, generator);
	}

/**
 * @param {Array<Array<number>>} arrays
 * 
 * @returns {Array<number>}
 */
function sum(arrays)
	{
	return arrays.reduce((accumulator, array) => accumulator.map((value, index) => value + array[index]), sequence(arrays[0].length, initialize(0)));
	}

export
	{
	initialize,
	increment,
	decrement,
	sequence,
	sum
	};
