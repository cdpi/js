
//@ts-check

import { throttle } from "./throttle.mjs";
import { between } from "./util.mjs";

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

class Component
	{
	/**
	 * @param {string} name
	 * @param {number} minimum
	 * @param {number} maximum
	 * @param {boolean} rounded
	 */
	constructor(name, minimum, maximum, rounded = true)
		{
		this.name = name;
		this.minimum = minimum;
		this.maximum = maximum;
		this.rounded = rounded;

		this._value = 0;
		}

	/**
	 * @returns {number}
	 */
	get value()
		{
		return this._value;
		}

	/**
	 * @param {number} value
	 */
	set value(value)
		{
		this._value = between(value, this.minimum, this.maximum, this.rounded);
		}

	/**
	 * @returns {string}
	 */
	toString()
		{
		return `${this.name}: ${this.value}`;
		}
	}

const _Component = Component;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

class Color
	{
	constructor()
		{
		}

	/*
	toRGB()
		{
		if (this instanceof RGB)
			{
			return this;
			}

		if (this instanceof HSL)
			{
			let rgb = Color.HSL2RGB(this.hue, this.saturation / 100.0, this.lightness / 100.0);

			return new RGB(rgb[0], rgb[1], rgb[2]);
			}

		throw new Error("unsupported");
		}
	*/

	/*
	toHSL()
		{
		if (this instanceof HSL)
			{
			return this;
			}

		throw new Error("not implemented");
		}
	*/

	/*
	static HSL2RGB(hue, saturation, lightness)
		{
		let a = saturation * Math.min(lightness, 1 - lightness);

		let f = (n, k = (n + hue / 30) % 12) => lightness - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);

		return [f(0), f(8), f(4)];

		// input: h as an angle in [0,360] and s,l in [0,1] - output: r,g,b in [0,1]
		/ *
		function hsl2rgb(h,s,l)
			{
			let a=s*Math.min(l,1-l);
			let f= (n,k=(n+h/30)%12) => l - a*Math.max(Math.min(k-3,9-k,1),-1);
			return [f(0),f(8),f(4)];
			}
		* /
		}
	*/
	}

const _Color = Color;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

class RGB extends Color
	{
	/**
	 * @param {number} red
	 * @param {number} green
	 * @param {number} blue
	 */
	constructor(red, green, blue)
		{
		super();

		this._red = new Component("red", 0, 255);
		this._green = new Component("green", 0, 255);
		this._blue = new Component("blue", 0, 255);

		this.red = red;
		this.green = green;
		this.blue = blue;
		}

	/**
	 * @returns {number}
	 */
	get red()
		{
		return this._red.value;
		}

	/**
	 * @param {number} value
	 */
	set red(value)
		{
		this._red.value = value;
		}

	/**
	 * @returns {number}
	 */
	get green()
		{
		return this._green.value;
		}

	/**
	 * @param {number} value
	 */
	set green(value)
		{
		this._green.value = value;
		}

	/**
	 * @returns {number}
	 */
	get blue()
		{
		return this._blue.value;
		}

	/**
	 * @param {number} value
	 */
	set blue(value)
		{
		this._blue.value = value;
		}

	/**
	 * @returns {string}
	 */
	toString()
		{
		return `rgb(${this.red}, ${this.green}, ${this.blue})`;
		}
	}

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

		this._hue = new Component("hue", 0, 360);
		this._saturation = new Component("saturation", 0, 100, false);
		this._lightness = new Component("lightness", 0, 100, false);

		this.hue = hue;
		this.saturation = saturation;
		this.lightness = lightness;
		}

	/**
	 * @returns {number}
	 */
	get hue()
		{
		return this._hue.value;
		}

	/**
	 * @param {number} value
	 */
	set hue(value)
		{
		this._hue.value = value;
		}

	/**
	 * @returns {number}
	 */
	get saturation()
		{
		return this._saturation.value;
		}

	/**
	 * @param {number} value
	 */
	set saturation(value)
		{
		this._saturation.value = value;
		}

	/**
	 * @returns {number}
	 */
	get lightness()
		{
		return this._lightness.value;
		}

	/**
	 * @param {number} value
	 */
	set lightness(value)
		{
		this._lightness.value = value;
		}

	/**
	 * @returns {string}
	 */
	toString()
		{
		return `hsl(${this.hue}, ${this.saturation}%, ${this.lightness}%)`;
		}
	}

const _HSL = HSL;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

class WebColor extends RGB
	{
	/**
	 * @param {number} red
	 * @param {number} green
	 * @param {number} blue
	 */
	constructor(red, green, blue)
		{
		super(red, green, blue);
		}

	/**
	 * @returns {Array<WebColor>}
	 * 
	 * @todo Retourner palette ??
	 */
	static get safeColors()
		{
		//safety palette
		//safe-web palette

		let component = Array.from({length: 6}, (value, index) => index * 51);

		let colors = new Array();

		component.forEach(red =>
			{
			component.forEach(green =>
				{
				component.forEach(blue =>
					{
					colors.push(new WebColor(red, green, blue));
					});
				});
			});

		return colors;
		}

	/**
	 * @returns {string}
	 */
	toString()
		{
		let rgb = this.red;
		rgb = (rgb << 8) + this.green;
		rgb = (rgb << 8) + this.blue;

		return `#${rgb.toString(16).toUpperCase()}`;
		}
	}

const _WebColor = WebColor;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

class ColorSelector extends EventTarget
	{
	/**
	 * @param {HTMLElement} element
	 */
	constructor(element)
		{
		super();

		this.element = element;

		this.color = new HSL(0, 0, 100);

		this.element.addEventListener("mousemove", this.mouseMoveHandler);
		this.element.addEventListener("wheel", this.mouseWheelHandler);
		this.element.addEventListener("click", this.mouseClickHandler);
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

			this.color.hue = Math.floor(e.clientX * 360 / this.element.clientWidth);
			this.color.lightness = Math.floor(e.clientY * 100 / this.element.clientHeight);

			this.setBackgroundColor();
			});
		}

	/**
	 * @returns {(e:any) => void}
	 */
	get mouseWheelHandler()
		{
		return throttle(10, e =>
			{
			this.color.saturation += ((e.deltaY > 0) ? 1 : -1);

			this.setBackgroundColor();
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
		this.element.style.backgroundColor = this.color.toString();
		}
	}

const _ColorSelector = ColorSelector;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

class Palette
	{
	constructor()
		{
		/** @type {Array<RGB>} */
		this.colors = new Array();
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

	/**
	 * @param {?string} format
	 * 
	 * @returns {string}
	 */
	getColors(format)
		{
		if (format === "css")
			{
			//return this.colors.map((color, index) => `--color-${index + 1}: ${color.toString()};`).join("\n");
			return "TODO CSS";
			}
		else if (format === "html")
			{
			//let colors = this.colors.map(color => `<div class="color" style="background-color: ${color.toString()};">&nbsp;</div>`).join("\n");
			//return `<div class="palette">${colors}</div>`;
			return "TODO HTML";
			}
		else if (format === "gimp")
			{
			return "GIMP Palette\n" + this.colors.map(color => `${color.red} ${color.green} ${color.blue}`).join("\n");
			}
		else
			{
			return "TODO ELSE";
			}
		}
	}

const _Palette = Palette;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

export
	{
	_Component as Component,
	_Color as Color,
	_RGB as RGB,
	_HSL as HSL,
	_WebColor as WebColor,
	_ColorSelector as ColorSelector,
	_Palette as Palette
	};
