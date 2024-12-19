
//@ts-check

import { throttle } from "./throttle.mjs";

//import { sequence, increment } from "./array.mjs";

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

// TODO: Dans util

/**
 * @param {number} value
 * @param {number} minimum
 * @param {number} maximum
 * @param {boolean} rounded
 * 
 * @returns {number}
 */
function between(value, minimum, maximum, rounded = false)
	{
	if (rounded)
		{
		value = Math.round(value);
		}

	return (value < minimum) ? minimum : ((value > maximum) ? maximum : value);
	}

//const between = (value, min, max) => (value > max) ? max : ((value < min) ? min : value);
//const between100 = value => between(value, 0, 100);
//const between360 = value => between(value, 0, 360);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

class Color
	{
	constructor()
		{
		}
	}

const _Color = Color;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

class RGB extends Color
	{
	constructor()
		{
		super();
		}
	}

// RGB
/*
const rgb2hex = (red, green, blue) =>
	{
	let rgb = sanitize(red, 0, 255);
	rgb = (rgb << 8) + sanitize(green, 0, 255);
	rgb = (rgb << 8) + sanitize(blue, 0, 255);

	return rgb.toString(16);
	};

const rgb2html = (red, green, blue) => "#" + rgb2hex(red, green, blue).padStart(6, "0").toUpperCase();
*/

const _RGB = RGB;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

class HSL extends Color
	{
	/**
	 * @param {number} hue
	 * @param {number} saturation
	 * @param {number} lightness
	 */
	constructor(hue, saturation, lightness)
		{
		super();

		this.hue = hue;
		this.saturation = saturation;
		this.lightness = lightness;
		}

	/*
	get hue()
		{
		return this._hue;
		}

	set hue(value)
		{
		this._hue = between360(value);
		}

	get saturation()
		{
		return this._saturation;
		}

	set saturation(value)
		{
		this._saturation = between100(value);
		}

	get lightness()
		{
		return this._lightness;
		}

	set lightness(value)
		{
		this._lightness = between100(value);
		}
	*/

	hsl()
		{
		return `hsl(${this.hue}, ${this.saturation}%, ${this.lightness}%)`;
		}
	}

const _HSL = HSL;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

class WebColor extends Color
	{
	constructor()
		{
		super();
		}

	/**
	 * @returns {Array<Array<number>>}
	 */
	static get safeColors()
		{
		let component = Array.from({length: 6}, (value, index) => index * 51);

		let colors = new Array();

		component.forEach(red =>
			{
			component.forEach(green =>
				{
				component.forEach(blue =>
					{
					colors.push([red, green, blue]);
					});
				});
			});

		return colors;
		//return safeWebColors().map(rgb => rgb2html(...rgb));
		}
	}

const _WebColor = WebColor;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

class ColorSelector extends EventTarget
	{
	/**
	 * @param {Element} element
	 */
	constructor(element)
		{
		super();

		this.element = element;

		/*
		this.color = new Color(0, 0, 100);

		this.element.addEventListener("mousemove", this.mouseMoveHandler);
		this.element.addEventListener("wheel", this.mouseWheelHandler);
		this.element.addEventListener("click", this.mouseClickHandler);
		*/
		}

	/**
	 * @returns {(e:any) => void}
	 */
	get mouseMoveHandler()
		{
		return throttle(20, e =>
			{
			//console.debug(this.element.clientLeft);
			//console.debug(this.element.offsetLeft);
			//console.debug(e.clientX);

			//this.color.hue = Math.floor(e.clientX * 360 / this.element.clientWidth);
			//this.color.lightness = Math.floor(e.clientY * 100 / this.element.clientHeight);

			//this.setBackgroundColor();
			});
		}

	/**
	 * @returns {(e:any) => void}
	 */
	get mouseWheelHandler()
		{
		return throttle(10, e =>
			{
			//this.color.saturation += ((e.deltaY > 0) ? 1 : -1);

			//this.setBackgroundColor();
			});
		}

	/**
	 * @returns {(e:any) => void}
	 */
	get mouseClickHandler()
		{
		return e =>
			{
			// TODO: Quel Event ? click, change,...
			let event = new Event("select");

			//event.color = this.color;

			this.dispatchEvent(event);
			};
		}

	setBackgroundColor()
		{
		//this.element.style.backgroundColor = this.color.hsl();
		}
	}

const _ColorSelector = ColorSelector;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

//safety palette
//safe-web palette

class Palette
	{
	/**
	 * @param {Element} element
	 */
	constructor(element)
		{
		this.element = element;

		//this.colors = [];
		}

	/*
	c(color)
		{
		let rect = document.createElement("div");

		rect.style.backgroundColor = color.toString();
		rect.style.width = "50px";
		rect.style.height = "50px";
		rect.style.display = "inline-block";

		this.element.appendChild(rect);
		}
	*/
	}

const _Palette = Palette;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

export
	{
	_Color as Color,
	_RGB as RGB,
	_HSL as HSL,
	_WebColor as WebColor,
	_ColorSelector as ColorSelector,
	_Palette as Palette
	};
