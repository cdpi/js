
import { setTimeout as sleep } from "node:timers/promises";

import * as cheerio from "cheerio";

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

type Color =
	{
	code:string;
	name:string;
	quote:string;
	ral:string;
	hex:string;
	};

async function getCodes():Promise<Array<string>>
	{
	const response = await fetch("https://cesarbazaar.com/fr/nuancier/");

	const html = await response.text();

	const $ = cheerio.load(html);

	return $("span.color-swatch-id").map((i, element) => $(element).text().trim()).toArray();
	}

async function getColor(code:string):Promise<Color>
	{
	const response = await fetch(`https://cesarbazaar.com/fr/nuancier/${code}/`);

	const html = await response.text();

	const $ = cheerio.load(html);

	const name = $("h1.color-hero-title").first().text().trim();

	const quote = $("p.color-hero-quote").first().text().trim();

	const meta = $("div.color-hero-head > div.color-hero-meta > span.color-hero-meta-item > span.color-hero-meta-value");

	const ral = meta.first().text().trim();
	const hex = meta.last().text().trim();

	return {code, name, quote, ral, hex} as Color;
	}

async function getColors():Promise<Array<Color>>
	{
	const codes = await getCodes();

	const colors = new Array<Color>();

	for (let i = 0; i < codes.length; i++)
		{
		const code = codes[i];

		const color = await getColor(code);

		colors.push(color);

		await sleep(1000);
		}

	return colors;
	}

// gris noirs BK
// bleus BL
// bruns BW
// verts et turquoise GN
// oranges OR
// violets et lilas PP
// rouges et roses RD
// blancs et beiges WT
// jaunes YL

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

export
	{
	type Color,
	getCodes,
	getColor,
	getColors
	};
