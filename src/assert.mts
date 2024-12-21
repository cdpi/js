
import * as util from "./util.mjs";

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

class AssertError extends Error
	{
	constructor(message:string)
		{
		super(message);
		}
	}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * @throws {AssertError}
 */
function isNull(value:any, message:string = "not null"):void
	{
	if (!util.isNull(value))
		{
		throw new AssertError(message);
		}
	}

/**
 * @throws {AssertError}
 */
function isNotNull(value:any, message:string = "null"):void
	{
	if (util.isNull(value))
		{
		throw new AssertError(message);
		}
	}

/**
 * @throws {AssertError}
 */
function notNullOrUndefined(value:any, message:string = "null or undefined"):void
	{
	if (util.isNullOrUndefined(value))
		{
		throw new AssertError(message);
		}
	}

/**
 * @throws {AssertError}
 */
function isBoolean(value:any, message:string = "not a boolean"):void
	{
	if (!util.isBoolean(value))
		{
		throw new AssertError(message);
		}
	}

/**
 * @throws {AssertError}
 */
function isNumber(value:any, message:string = "not a number"):void
	{
	notNullOrUndefined(value);

	if (!util.isNumber(value) && !util.isBigInteger(value))
		{
		throw new AssertError(message);
		}
	}

/**
 * @throws {AssertError}
 */
function isArray(value:any, message:string = "not an array"):void
	{
	notNullOrUndefined(value);

	if (!util.isArray(value))
		{
		throw new AssertError(message);
		}
	}

/**
 * @throws {AssertError}
 */
function arrayLength(array:Array<any>, length:number, message:string = "array length"):void
	{
	isArray(array);
	isNumber(length);

	if (array.length !== length)
		{
		throw new AssertError(message);
		}
	}

/**
 * @throws {AssertError}
 */
function objectKeys(object:Object, keys:Array<string>, message:string = "object keys"):void
	{
	isObject(object);
	isArray(keys);

	let o = Object.keys(object).sort().join("");

	let k = keys.sort().join("");

	// Not OK ;-) hahahahhahahahaha
	if (o !== k)
		{
		throw new AssertError(message);
		}
	}

/**
 * @throws {AssertError}
 */
function isObject(value:any, message:string = "not an object"):void
	{
	notNullOrUndefined(value);

	if (!util.isObject(value))
		{
		throw new AssertError(message);
		}
	}

/**
 * @throws {AssertError}
 */
function isInstanceOf(value:any, type:any, message:string):void
	{
	notNullOrUndefined(value);

	if (!(value instanceof type))
		{
		throw new AssertError(message);
		}
	}

/**
 * @throws {AssertError}
 */
function equal(left:any, right:any, message:string = "not equal"):void
	{
	if (!(left === right))
		{
		throw new AssertError(message);
		}
	}

/**
 * @throws {AssertError}
 */
function isTrue(value:any, message = "not true"):void
	{
	isBoolean(value, message);

	equal(value, true, message);
	}

/**
 * @throws {AssertError}
 */
function isFalse(value:any, message:string = "not false"):void
	{
	isBoolean(value, message);

	equal(value, false, message);
	}

/**
 * @throws {AssertError}
 */
function throwError(code:Function, message:string = "don't throw error"):void
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
	AssertError,

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
