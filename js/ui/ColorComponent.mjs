
//@ts-check

class ColorComponent extends HTMLInputElement
	{
	constructor()
		{
		super();

		this.type = "range";
		this.min = "0";
		this.max = "255";

		//let shadow = this.attachShadow({ mode: "open" });
		}

	connectedCallback()
		{
		console.log(this);
		//let shadow = this.attachShadow({mode: "open"});

		let style = document.createElement("style");

		style.textContent = `
		input
			{
			background-color: #EEE;
			}
		color-component
			{
			background-color: red;
			}
		`;

		//@ts-ignore
		//shadow.appendChild(style);

		console.log(style.isConnected);
		}
	}

customElements.define("color-component2", ColorComponent, {extends: "input"});
