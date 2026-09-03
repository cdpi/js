#!/usr/bin/env node

import { readFileSync } from "node:fs";

import { parseRRGGBB } from "../dist/color.js";

const json = readFileSync("./temp/colors.json", "utf-8");

const colors = JSON.parse(json);

const palette = colors.map(color =>
	{
	const rgb = parseRRGGBB(color.hex);

	return `${rgb.red} ${rgb.green} ${rgb.blue} ${color.name}`;
	});

console.log("GIMP Palette");
console.log("Name: César Bazaar");
console.log("# <https://cesarbazaar.com/fr/nuancier/>");

console.log(palette.join("\n"));
