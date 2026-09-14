#!/usr/bin/env node

import { writeFileSync } from "node:fs";
import { CesarBazaar } from "../dist/misc/cesarbazaar.js";

try
	{
	const cesarBazaar = new CesarBazaar();

	const colors = await cesarBazaar.getColors();

	writeFileSync("cesarbazaar.gpl", cesarBazaar.buildPalette(colors));

	writeFileSync("cesarbazaar.json", JSON.stringify(colors, null, 4));
	}
catch (error)
	{
	console.error(error);
	}

/*
import { getColors } from "../dist/misc/cesarbazaar.js";
const colors = await getColors();
console.log(JSON.stringify(colors, null, 4));

import { readFileSync } from "node:fs";
import { parse } from "../dist/color.js";
const json = readFileSync("./temp/colors.json", "utf-8");
const colors = JSON.parse(json);
const palette = colors.map(color =>
	{
	const rgb = parse(color.hex);
	return `${rgb.red} ${rgb.green} ${rgb.blue} ${color.name}`;
	});
console.log("GIMP Palette");
console.log("Name: César Bazaar");
console.log("# <https://cesarbazaar.com/fr/nuancier/>");
console.log(palette.join("\n"));
*/
