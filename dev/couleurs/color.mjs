
//@ts-check

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
	remove10percent(red.valueAsNumber, green.valueAsNumber, blue.valueAsNumber);
	}

red.addEventListener("change", colorComponentOnChange);
green.addEventListener("change", colorComponentOnChange);
blue.addEventListener("change", colorComponentOnChange);

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
function remove10percent(red, green, blue)
	{
	/** @type {HTMLDivElement} */
	//@ts-ignore
	let palette = document.querySelector("#remove10percent");

	/** @type {HTMLDivElement} */
	//@ts-ignore
	let color1 = palette.querySelector("div:nth-child(1)");

	/** @type {HTMLDivElement} */
	//@ts-ignore
	let color2 = palette.querySelector("div:nth-child(2)");

	/** @type {HTMLDivElement} */
	//@ts-ignore
	let color3 = palette.querySelector("div:nth-child(3)");

	/** @type {HTMLDivElement} */
	//@ts-ignore
	let color4 = palette.querySelector("div:nth-child(4)");

	/** @type {HTMLDivElement} */
	//@ts-ignore
	let color5 = palette.querySelector("div:nth-child(5)");

	color1.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
	color2.style.backgroundColor = `rgb(${red - 10}, ${green - 10}, ${blue - 10})`;
	color3.style.backgroundColor = `rgb(${red - 20}, ${green - 10}, ${blue - 20})`;
	color4.style.backgroundColor = `rgb(${red - 30}, ${green - 10}, ${blue - 30})`;
	color5.style.backgroundColor = `rgb(${red - 40}, ${green - 10}, ${blue - 40})`;
	}
