
function isNull(value:any):boolean
	{
	return (value === null);
	}

function isUndefined(value:any):boolean
	{
	return (typeof value === "undefined");
	}

function isNullOrUndefined(value:any):boolean
	{
	return (isNull(value) || isUndefined(value));
	}

function isNotNullAndNotUndefined(value:any):boolean
	{
	return !isNullOrUndefined(value);
	}

function isBoolean(value:any):boolean
	{
	return (typeof value === "boolean");
	}

function isNumber(value:any):boolean
	{
	return (typeof value === "number");
	}

function isBigInteger(value:any):boolean
	{
	return (typeof value === "bigint");
	}

function isString(value:any):boolean
	{
	return (typeof value === "string");
	}

function isArray(value:any):boolean
	{
	return Array.isArray(value);
	}

function isSymbol(value:any):boolean
	{
	return (typeof value === "symbol");
	}

function isFunction(value:any):boolean
	{
	return (typeof value === "function");
	}

function isObject(value:any):boolean
	{
	// TODO: null retourne aussi object je crois !!!
	return (typeof value === "object");
	}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

function minmax(minimum:number, maximum:number):(value:number) => number
	{
	return value => Math.max(minimum, Math.min(value, maximum));
	}

function between(value:number, minimum:number, maximum:number, rounded:boolean = true):number
	{
	if (rounded)
		{
		value = Math.round(value);
		}

	return minmax(minimum, maximum)(value);
	}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

function isBlank(text:string):boolean
	{
	return (text.trim().length === 0);
	}

function splitAndTrim(text:string, separator:string = ","):Array<string>
	{
	return text.split(separator).map(value => value.trim());
	}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

// https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Math/random

/**
 * On renvoie un nombre aléatoire entre une valeur minimum (incluse) et une valeur maximum (exclue)
 */
function getRandom(minimum:number, maximum:number):number
	{
	return Math.random() * (maximum - minimum) + minimum;
	}

/**
 * On renvoie un entier aléatoire entre une valeur minimum (incluse) et une valeur maximum (exclue)
 * Attention: si on utilisait Math.round(), on aurait une distribution non uniforme !
 */
function getRandomInt(minimum:number, maximum:number):number
	{
	minimum = Math.ceil(minimum);
	maximum = Math.floor(maximum);

	return Math.floor(Math.random() * (maximum - minimum)) + minimum;
	}

/**
 * On renvoie un entier aléatoire entre une valeur minimum (incluse) et une valeur maximum (incluse)
 * Attention: si on utilisait Math.round(), on aurait une distribution non uniforme !
 */
function getRandomIntInclusive(minimum:number, maximum:number):number
	{
	minimum = Math.ceil(minimum);
	maximum = Math.floor(maximum);

	return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
	}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

export
	{
	isNull,
	isUndefined,
	isNullOrUndefined,
	isNotNullAndNotUndefined,
	isBoolean,
	isNumber,
	isBigInteger,
	isString,
	isArray,
	isSymbol,
	isFunction,
	isObject,

	minmax,
	between,

	isBlank,
	splitAndTrim,

	getRandom,
	getRandomInt,
	getRandomIntInclusive
	};
