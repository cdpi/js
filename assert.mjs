
//@ts-check

import * as util from "./util.mjs";

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

class AssertError extends Error
	{
	/**
	 * @param {string} message
	 */
	constructor(message)
		{
		super(message);
		}
	}

const _AssertError = AssertError;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * @param {any} value
 * @param {string} message
 * 
 * @returns {void}
 * 
 * @throws {AssertError}
 */
function isNull(value, message = "not null")
	{
	if (!util.isNull(value))
		{
		throw new AssertError(message);
		}
	}

/**
 * @param {any} value
 * @param {string} message
 * 
 * @returns {void}
 * 
 * @throws {AssertError}
 */
function isNotNull(value, message = "null")
	{
	if (util.isNull(value))
		{
		throw new AssertError(message);
		}
	}

/**
 * @param {any} value
 * @param {string} message
 * 
 * @returns {void}
 * 
 * @throws {AssertError}
 */
function notNullOrUndefined(value, message = "null or undefined")
	{
	if (util.isNullOrUndefined(value))
		{
		throw new AssertError(message);
		}
	}

/**
 * @param {any} value
 * @param {string} message
 * 
 * @returns {void}
 * 
 * @throws {AssertError}
 */
function isBoolean(value, message = "not a boolean")
	{
	if (!util.isBoolean(value))
		{
		throw new AssertError(message);
		}
	}

/**
 * @param {any} value
 * @param {string} message
 * 
 * @returns {void}
 * 
 * @throws {AssertError}
 */
function isNumber(value, message = "not a number")
	{
	notNullOrUndefined(value);

	if (!util.isNumber(value) && !util.isBigInteger(value))
		{
		throw new AssertError(message);
		}
	}

/**
 * @param {any} value
 * @param {string} message
 * 
 * @returns {void}
 * 
 * @throws {AssertError}
 */
function isArray(value, message = "not an array")
	{
	notNullOrUndefined(value);

	if (!util.isArray(value))
		{
		throw new AssertError(message);
		}
	}

/**
 * @param {?Array<any>} array
 * @param {number} length
 * @param {string} message
 * 
 * @returns {void}
 * 
 * @throws {AssertError}
 */
function arrayLength(array, length, message = "array length")
	{
	isArray(array);
	isNumber(length);

	//@ts-ignore testé dans isArray
	if (array.length !== length)
		{
		throw new AssertError(message);
		}
	}

/**
 * @param {?Object} object
 * @param {?Array<string>} keys
 * @param {string} message
 * 
 * @returns {void}
 * 
 * @throws {AssertError}
 */
function objectKeys(object, keys, message = "object keys")
	{
	isObject(object);
	isArray(keys);

	let o = Object.keys(object).sort().join("");

	//@ts-ignore testé dans isArray
	let k = keys.sort().join("");

	// Not OK ;-) hahahahhahahahaha
	if (o !== k)
		{
		throw new AssertError(message);
		}
	}

/**
 * @param {any} value
 * @param {string} message
 * 
 * @returns {void}
 * 
 * @throws {AssertError}
 */
function isObject(value, message = "not an object")
	{
	notNullOrUndefined(value);

	if (!util.isObject(value))
		{
		throw new AssertError(message);
		}
	}

/**
 * @param {any} value
 * @param {any} type
 * @param {string} message
 * 
 * @returns {void}
 * 
 * @throws {AssertError}
 */
function isInstanceOf(value, type, message)
	{
	notNullOrUndefined(value);

	if (!(value instanceof type))
		{
		throw new AssertError(message);
		}
	}

/**
 * @param {any} left
 * @param {any} right
 * @param {string} message
 * 
 * @returns {void}
 * 
 * @throws {AssertError}
 */
function equal(left, right, message = "not equal")
	{
	if (!(left === right))
		{
		throw new AssertError(message);
		}
	}

/**
 * @param {any} value
 * @param {string} message
 * 
 * @returns {void}
 * 
 * @throws {AssertError}
 */
function isTrue(value, message = "not true")
	{
	isBoolean(value, message);

	equal(value, true, message);
	}

/**
 * @param {any} value
 * @param {string} message
 * 
 * @returns {void}
 * 
 * @throws {AssertError}
 */
function isFalse(value, message = "not false")
	{
	isBoolean(value, message);

	equal(value, false, message);
	}

/**
 * @param {Function} code
 * @param {string} message
 * 
 * @returns {void}
 * 
 * @throws {AssertError}
 */
function throwError(code, message = "don't throw error")
	{
	let ok = null;

	try
		{
		code();

		ok = false;
		}
	catch (error)
		{
		ok = true;
		}

	if (ok !== true)
		{
		throw new AssertError(message);
		}
	}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

export
	{
	_AssertError as AssertError,

	isNull,
	isNotNull,
	notNullOrUndefined,
	notNullOrUndefined as isSet,

	isBoolean,
	isNumber,
	isArray,
	arrayLength,
	isObject,
	objectKeys,

	isInstanceOf,

	equal,
	isTrue,
	isFalse,

	throwError
	};
