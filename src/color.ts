
import * as util from "./util.js";

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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

function toHex(color:number, prefix:string, length:number):string
	{
	return prefix + util.toHex(color >>> 0, true, length);
	}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

export
	{
	type RGB,
	type RGBA,
	type RedGreenBlue,
	type RedGreenBlueAlpha,
	type Color,

	toHex
	};
