
import { type RedGreenBlue } from "../color.js";
import { type ColorData, parseColors } from "./wiki.js";

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

type NamedColors = Record<string, RedGreenBlue>;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function getWikiText(page:string, section?:number):Promise<string>
	{
	const withSection:string = section ? `&section=${section}` : "";

	const url:string = `https://fr.wikipedia.org/w/api.php?action=parse&page=${page}&prop=wikitext${withSection}&format=json`;

	const response:Response = await fetch(url);

	const json:any = await response.json();

	const wikitext = json.parse.wikitext["*"];

	return wikitext;
	}

const reducer = (namedColors:NamedColors, colorData:ColorData):NamedColors =>
	{
	namedColors[colorData.name.toLowerCase()] =
		{
		red: colorData.rgb.red,
		green: colorData.rgb.green,
		blue: colorData.rgb.blue
		};

	return namedColors;
	};

async function getWebColors():Promise<NamedColors>
	{
	const wikitext:string = await getWikiText("Couleur_du_Web", 3);

	const colors:Array<ColorData> = parseColors(wikitext);

	return colors.reduce(reducer, {} as NamedColors);
	}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

export
	{
	type NamedColors,

	getWikiText,
	getWebColors
	};
