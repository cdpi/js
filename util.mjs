
//@ts-check

/**
 * @param {any} value
 * 
 * @returns {boolean}
 */
function isNull(value)
	{
	return (value === null);
	}

/**
 * @param {any} value
 * 
 * @returns {boolean}
 */
function isUndefined(value)
	{
	return (typeof value === "undefined");
	}

/**
 * @param {any} value
 * 
 * @returns {boolean}
 */
function isNullOrUndefined(value)
	{
	return (isNull(value) || isUndefined(value));
	}

/**
 * @param {any} value
 * 
 * @returns {boolean}
 */
function isNotNullAndNotUndefined(value)
	{
	return !isNullOrUndefined(value);
	}

/**
 * @param {any} value
 * 
 * @returns {boolean}
 */
function isBoolean(value)
	{
	return (typeof value === "boolean");
	}

/**
 * @param {any} value
 * 
 * @returns {boolean}
 */
function isNumber(value)
	{
	return (typeof value === "number");
	}

/**
 * @param {any} value
 * 
 * @returns {boolean}
 */
function isBigInteger(value)
	{
	return (typeof value === "bigint");
	}

/**
 * @param {number} value
 * @param {number} minimum
 * @param {number} maximum
 * @param {boolean} rounded
 * 
 * @returns {number}
 */
function between(value, minimum, maximum, rounded = true)
	{
	if (rounded)
		{
		value = Math.round(value);
		}

	return (value < minimum) ? minimum : ((value > maximum) ? maximum : value);
	}

/**
 * @param {any} value
 * 
 * @returns {boolean}
 */
function isString(value)
	{
	return (typeof value === "string");
	}

/**
 * @param {string} text
 * 
 * @returns {boolean}
 */
function isBlank(text)
	{
	// TODO: Check isString ??
	return (text.trim().length === 0);
	}

/**
 * @param {string} text
 * @param {string} separator
 * 
 * @returns {Array<string>}
 */
function splitAndTrim(text, separator = ",")
	{
	// TODO: Check isString ??
	return text.split(separator).map(value => value.trim());
	}

/**
 * @param {any} value
 * 
 * @returns {boolean}
 */
function isSymbol(value)
	{
	return (typeof value === "symbol");
	}

/**
 * @param {any} value
 * 
 * @returns {boolean}
 */
function isArray(value)
	{
	return Array.isArray(value);
	}

/**
 * @param {any} value
 * 
 * @returns {boolean}
 */
function isObject(value)
	{
	// TODO: null retourne aussi object je crois !!!
	return (typeof value === "object");
	}

//objet Function (au sens ECMA-262, un objet qui implémente [[Call]]) 	"function"

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

export
	{
	isNull,
	isUndefined,
	isNullOrUndefined,
	isNotNullAndNotUndefined,
	isNotNullAndNotUndefined as isSet,
	isBoolean,
	isNumber,
	isBigInteger,
	between,
	isString,
	isBlank,
	splitAndTrim,
	isSymbol,
	isArray,
	isObject
	};
