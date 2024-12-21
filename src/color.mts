
import { between } from "./util.mjs";

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

class Component
	{
	private _value:number;

	private minimum:number;
	private maximum:number;
	private rounded:boolean;

	name:string;

	constructor(name:string, minimum:number, maximum:number, rounded:boolean = true)
		{
		this.name = name;

		this.minimum = minimum;
		this.maximum = maximum;
		this.rounded = rounded;

		this._value = 0;
		}

	get value():number
		{
		return this._value;
		}

	set value(value:number)
		{
		this._value = between(value, this.minimum, this.maximum, this.rounded);
		}

	toString():string
		{
		return `${this.name}: ${this.value}`;
		}
	}

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

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

class RGB extends Color
	{
	private _red:Component;
	private _green:Component;
	private _blue:Component;

	constructor(red:number, green:number, blue:number)
		{
		super();

		this._red = new Component("red", 0, 255);
		this._green = new Component("green", 0, 255);
		this._blue = new Component("blue", 0, 255);

		this.red = red;
		this.green = green;
		this.blue = blue;
		}

	get red():number
		{
		return this._red.value;
		}

	set red(value:number)
		{
		this._red.value = value;
		}

	get green():number
		{
		return this._green.value;
		}

	set green(value:number)
		{
		this._green.value = value;
		}

	get blue():number
		{
		return this._blue.value;
		}

	set blue(value:number)
		{
		this._blue.value = value;
		}

	toString():string
		{
		return `rgb(${this.red}, ${this.green}, ${this.blue})`;
		}
	}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

class HSL extends Color
	{
	private _hue:Component;
	private _saturation:Component;
	private _lightness:Component;

	constructor(hue:number, saturation:number, lightness:number)
		{
		super();

		this._hue = new Component("hue", 0, 360);
		this._saturation = new Component("saturation", 0, 100, false);
		this._lightness = new Component("lightness", 0, 100, false);

		this.hue = hue;
		this.saturation = saturation;
		this.lightness = lightness;
		}

	get hue():number
		{
		return this._hue.value;
		}

	set hue(value:number)
		{
		this._hue.value = value;
		}

	get saturation():number
		{
		return this._saturation.value;
		}

	set saturation(value:number)
		{
		this._saturation.value = value;
		}

	get lightness():number
		{
		return this._lightness.value;
		}

	set lightness(value:number)
		{
		this._lightness.value = value;
		}

	toString():string
		{
		return `hsl(${this.hue}, ${this.saturation}%, ${this.lightness}%)`;
		}
	}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

class WebColor extends RGB
	{
	constructor(red:number, green:number, blue:number)
		{
		super(red, green, blue);
		}

	/**
	 * @todo Retourner palette ??
	 */
	static get safeColors():Array<WebColor>
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

	toString():string
		{
		let rgb = this.red;
		rgb = (rgb << 8) + this.green;
		rgb = (rgb << 8) + this.blue;

		return `#${rgb.toString(16).toUpperCase()}`;
		}
	}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

class Palette
	{
	readonly colors:Array<RGB>;

	constructor()
		{
		this.colors = new Array<RGB>();
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

	getColors(format:string|null):string
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

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

export
	{
	Component,
	Color,
	RGB,
	HSL,
	WebColor
	};
