
type Nullable<T> = T | null;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// String
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

function stringOrNull(text:string):Nullable<string>
	{
	return (text.length > 0) ? text : null;
	}

function stringNotEmpty(text:string):string
	{
	if (text.length === 0)
		{
		throw new EmptyStringError();
		}

	return text;
	}

function removeAccents(text:string):string
	{
	return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
	}

/*
function slugify(str: string): string {
  const removedAccents = removeAccents(str);
  return removedAccents
	.toLowerCase()
	.trim()
	.replace(/[^a-z0-9]+/g, "-")
	.replace(/^-+|-+$/g, "");
}
*/

function getCodePoints(text:string):Array<number>
	{
	const codePoints:Array<number> = new Array<number>();

	for (const character of text)
		{
		const codePoint:number|undefined = character.codePointAt(0);

		if (codePoint)
			{
			codePoints.push(codePoint);
			}
		}

	return codePoints;
	}

// VARIATION SELECTOR-16 (0xFE0F) = Emoji Variation Selector
// https://www.unicode.org/charts/PDF/UFE00.pdf

const TEXT_VARIATION_SELECTOR = 0xFE0E;
const EMOJI_VARIATION_SELECTOR = 0xFE0F;

function notTextVariationSelector(codePoint:number):boolean
	{
	return (codePoint !== TEXT_VARIATION_SELECTOR);
	}

function notEmojiVariationSelector(codePoint:number):boolean
	{
	return (codePoint !== EMOJI_VARIATION_SELECTOR);
	}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Number
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

function toHex(value:number, upperCase:boolean = false, padLength:number = 0):string
	{
	let hex:string = value.toString(16);

	if (upperCase)
		{
		hex = hex.toUpperCase();
		}

	if (padLength > 0)
		{
		hex = hex.padStart(padLength, "0");
		}

	return hex;
	}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Array
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

function chunk<T>(array:Array<T>, size:number):Array<Array<T>>
	{
	const result:Array<Array<T>> = new Array<Array<T>>();

	for (let i = 0; i < array.length; i += size)
		{
		result.push(array.slice(i, i + size));
		}

	return result;
	}

function sequence(count:number):Array<number>
	{
	return Array.from({length: count}, (value, key) => key);
	}

function shuffle<T>(array:Array<T>):Array<T>
	{
	for (let i = array.length - 1; i > 0; i--)
		{
		const j = getRandom(0, i);

		[array[i], array[j]] = [array[j], array[i]];
		}

	return array;
	}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

// https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Math/random
// On renvoie un entier aléatoire entre une valeur min (incluse) et une valeur max (incluse).
// Attention : si on utilisait Math.round(), on aurait une distribution non uniforme !
function getRandom(minimum:number, maximum:number):number
	{
	minimum = Math.ceil(minimum);
	maximum = Math.floor(maximum);

	return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
	}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Error
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

class NotImplementedError extends Error
	{
	public constructor(message?:string)
		{
		super(message);

		this.name = "NotImplementedError";

		Object.setPrototypeOf(this, NotImplementedError.prototype);
		}
	}

class EmptyStringError extends Error
	{
	public constructor(message?:string)
		{
		super(message);

		this.name = "EmptyStringError";

		Object.setPrototypeOf(this, EmptyStringError.prototype);
		}
	}

class CircularReferenceError extends Error
	{
	public constructor(message?:string)
		{
		super(message);

		this.name = "CircularReferenceError";

		Object.setPrototypeOf(this, CircularReferenceError.prototype);
		}
	}

class HTTPError extends Error
	{
	public constructor(public readonly code:number, message?:string)
		{
		super(message);

		this.name = "HTTPError";

		Object.setPrototypeOf(this, HTTPError.prototype);
		}
	}

class TimeoutError extends Error
	{
	public constructor(message?:string)
		{
		super(message);

		this.name = "TimeoutError";

		Object.setPrototypeOf(this, TimeoutError.prototype);
		}
	}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

export
	{
	TEXT_VARIATION_SELECTOR,
	EMOJI_VARIATION_SELECTOR,

	type Nullable,

	stringOrNull,
	stringNotEmpty,
	removeAccents,
	getCodePoints,
	notTextVariationSelector,
	notEmojiVariationSelector,

	toHex,

	chunk,
	sequence,
	shuffle,

	getRandom,

	NotImplementedError,
	EmptyStringError,
	CircularReferenceError,
	HTTPError,
	TimeoutError
	};
