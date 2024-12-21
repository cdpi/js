
import { HSL } from "../color.mjs";
import { throttle } from "../throttle.mjs";

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

class ColorSelector extends EventTarget
	{
	private readonly element:HTMLElement;

	private color:HSL;

	constructor(element:HTMLElement)
		{
		super();

		this.element = element;

		this.color = new HSL(0, 0, 100);

		this.element.addEventListener("mousemove", this.mouseMoveHandler);
		this.element.addEventListener("wheel", this.mouseWheelHandler);
		this.element.addEventListener("click", this.mouseClickHandler);
		}

	get mouseMoveHandler():(e:MouseEvent) => void
		{
		/*
		return throttle(20, e:any =>
			{
			//console.debug(this.element.clientLeft);
			//console.debug(this.element.offsetLeft);
			//console.debug(e.clientX);

			this.color.hue = Math.floor(e.clientX * 360 / this.element.clientWidth);
			this.color.lightness = Math.floor(e.clientY * 100 / this.element.clientHeight);

			this.setBackgroundColor();
			});
		*/
		return (e:MouseEvent) => {};
		}

	get mouseWheelHandler():(e:MouseEvent) => void
		{
		/*
		return throttle(10, e =>
			{
			this.color.saturation += ((e.deltaY > 0) ? 1 : -1);

			this.setBackgroundColor();
			});
		*/
		return (e:MouseEvent) => {};
		}

	get mouseClickHandler():(e:MouseEvent) => void
		{
		/*
		return e =>
			{
			// TODO: Quel Event ? click, change,...
			let event = new Event("select");

			//event.color = this.color;

			this.dispatchEvent(event);
			};
		*/
		return (e:MouseEvent) =>
			{
			this.dispatchEvent(new CustomEvent("color", {detail: this.color.toString()}));
			};
		}

	setBackgroundColor():void
		{
		this.element.style.backgroundColor = this.color.toString();
		}
	}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

export
	{
	ColorSelector
	};
