
//@ts-check

class ColorPicker extends HTMLInputElement
	{
	constructor()
		{
		super();

		this.type = "range";
		this.min = "0";
		this.max = "255";
		}

	connectedCallback()
		{
		}
	}

customElements.define("color-picker", ColorPicker, {extends: "input"});
