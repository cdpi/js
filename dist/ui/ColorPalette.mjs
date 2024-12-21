class ColorPalette extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        let shadow = this.attachShadow({ mode: "open" });
        let style = document.createElement("style");
        style.textContent = `
		.color
			{
			background-color: red;
			width: 100px;
			height: 100px;
			display: inline-block;
			}
		`;
        shadow.appendChild(style);
        for (let i = 0; i < 5; i++) {
            let color = document.createElement("div");
            color.setAttribute("class", "color");
            shadow.appendChild(color);
        }
        this.addEventListener("color", e => {
            console.log("color.....");
        });
    }
}
customElements.define("color-palette", ColorPalette);
export {};
