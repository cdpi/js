
class ColorPicker extends HTMLInputElement
	{
	constructor()
		{
		super();

		this.type = "range";
		this.min = "0";
		this.max = "255";

		//let shadow = this.attachShadow({mode: "open"});
		}

	connectedCallback()
		{
		}
	}

customElements.define("color-picker", ColorPicker, {extends: "input"});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

export
	{
	ColorPicker
	};
