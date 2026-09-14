
import { type Nullable, toHex as strToHex } from "./util.js";

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

type RGB =
	{
	r:number,
	g:number,
	b:number
	};

type RGBA = RGB &
	{
	a:number
	};

type RedGreenBlue =
	{
	red:number,
	green:number,
	blue:number
	};

type RedGreenBlueAlpha = RedGreenBlue &
	{
	alpha:number
	};

type Color = RGB | RGBA | RedGreenBlue | RedGreenBlueAlpha;

function toHex(color:number, prefix:string, length:number):string
	{
	return prefix + strToHex(color >>> 0, true, length);
	}

const patterns =
	[
	// RRGGBB
	/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i,
	// RRGGBBAA
	/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i,
	// TODO: RGB
	// /^#?([a-f\d]{1})([a-f\d]{1})([a-f\d]{1})$/i,
	// TODO: RGBA
	// /^#?([a-f\d]{1})([a-f\d]{1})([a-f\d]{1})([a-f\d]{1})$/i
	];

function parseColor(text:string, regexp:RegExp):Nullable<RedGreenBlueAlpha>
	{
	const match = regexp.exec(text);

	if (match)
		{
		// Supprime le premier élément qui est le texte entier
		match.shift();

		const components = match.map(value => parseInt(value, 16));

		if (components.length < 4)
			{
			// Ajoute alpha si pas présent
			components.push(255);
			}

		const [red, green, blue, alpha] = components;

		return {red, green, blue, alpha};
		}

	return null;
	}

function parse(text:string):Nullable<RedGreenBlueAlpha>
	{
	for (const pattern of patterns)
		{
		}

	for (let i = 0; i < patterns.length; i++)
		{
		const pattern = patterns[i];

		const color = parseColor(text, pattern);

		if (color)
			{
			return color;
			}
		}

	return null;
	}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

export
	{
	type RGB,
	type RGBA,
	type RedGreenBlue,
	type RedGreenBlueAlpha,
	type Color,
	toHex,
	parse
	};
