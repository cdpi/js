
//@ts-check

import { palette as makePercentPalette } from "./percent.mjs";

/**
 * @param {string} cssSelector
 * 
 * @returns {HTMLElement}
 */
function getElement(cssSelector)
	{
	//@ts-ignore
	return document.querySelector(cssSelector);
	}

//let red2 = getElement("#red");

/** @type {HTMLDivElement} */
//@ts-ignore
let color = document.querySelector("#color");
//let c = getElement("#color");

/** @type {HTMLInputElement} */
//@ts-ignore
let red = document.querySelector("#red");

/** @type {HTMLInputElement} */
//@ts-ignore
let green = document.querySelector("#green");

/** @type {HTMLInputElement} */
//@ts-ignore
let blue = document.querySelector("#blue");

/**
 * @param {Event} event
 */
function colorComponentOnChange(event)
	{
	color.style.backgroundColor = `rgb(${red.valueAsNumber}, ${green.valueAsNumber}, ${blue.valueAsNumber})`;

	//mix1(red.valueAsNumber, green.valueAsNumber, blue.valueAsNumber);
	percent(red.valueAsNumber, green.valueAsNumber, blue.valueAsNumber);
	}

red.addEventListener("input", colorComponentOnChange);
green.addEventListener("input", colorComponentOnChange);
blue.addEventListener("input", colorComponentOnChange);

/**
 * @param {number} red
 * @param {number} green
 * @param {number} blue
 */
function mix1(red, green, blue)
	{
	let min = Math.min(red, green, blue);

	red -= min;
	green -= min;
	blue -= min;

	console.log(red, green, blue);

	red = red * 100 / 255;
	green = green * 100 / 255;
	blue = blue * 100 / 255;

	console.log(red, green, blue);
	}

/**
 * @param {number} red
 * @param {number} green
 * @param {number} blue
 */
function percent(red, green, blue)
	{
	let palette = document.querySelector("#percent-palette");

	let colors = makePercentPalette({red, green, blue});

	colors.forEach((color, index) =>
		{
		//@ts-ignore
		let div = palette.querySelector(`div:nth-child(${index + 1})`);

		let {red, green, blue} = color;

		//@ts-ignore
		div.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
		});
	}
