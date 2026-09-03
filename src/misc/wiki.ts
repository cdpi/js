
import { type RedGreenBlue } from "../color.js";

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

type ColorData =
	{
	source:string;
	name:string;
	hex:string;
	rgb:RedGreenBlue;
	};

function parseColors(wikitext:string):Array<ColorData>
	{
	// ^\|          -> Commence par un pipe
	// \s*          -> Espaces optionnels
	// ([^|]+?)     -> Groupe 1: Le nom (tout sauf un pipe)
	// \s*\|\|      -> Séparateur double pipe
	// \s*([^|]+?)  -> Groupe 2: Le code Hex
	// \s*\|\|      -> Séparateur double pipe
	// \s*([^|\n]+) -> Groupe 3: Le RGB (jusqu'à la fin de ligne ou prochain pipe)
	const regex:RegExp = /^\|\s*([^|]+?)\s*\|\|\s*([^|]+?)\s*\|\|\s*([^|\n]+)$/gm;

	const colors:Array<ColorData> = [];

	let match;

	while ((match = regex.exec(wikitext)) !== null)
		{
		const source = match[0];
		const name = match[1].trim();
		const hex = match[2].trim().replace(/\s+/g, ''); // FA 80 72 -> FA8072
		const rgb = match[3].trim().split(/\s+/);

		colors.push({source, name, hex, rgb: {red: parseInt(rgb[0]), green: parseInt(rgb[1]), blue: parseInt(rgb[2])}});
		}

	return colors;
	}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

export
	{
	type ColorData,

	parseColors
	};
