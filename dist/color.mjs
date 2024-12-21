import { between } from "./util.mjs";
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
class Component {
    _value;
    minimum;
    maximum;
    rounded;
    name;
    constructor(name, minimum, maximum, rounded = true) {
        this.name = name;
        this.minimum = minimum;
        this.maximum = maximum;
        this.rounded = rounded;
        this._value = 0;
    }
    get value() {
        return this._value;
    }
    set value(value) {
        this._value = between(value, this.minimum, this.maximum, this.rounded);
    }
    toString() {
        return `${this.name}: ${this.value}`;
    }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
class Color {
    constructor() {
    }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
class RGB extends Color {
    _red;
    _green;
    _blue;
    constructor(red, green, blue) {
        super();
        this._red = new Component("red", 0, 255);
        this._green = new Component("green", 0, 255);
        this._blue = new Component("blue", 0, 255);
        this.red = red;
        this.green = green;
        this.blue = blue;
    }
    get red() {
        return this._red.value;
    }
    set red(value) {
        this._red.value = value;
    }
    get green() {
        return this._green.value;
    }
    set green(value) {
        this._green.value = value;
    }
    get blue() {
        return this._blue.value;
    }
    set blue(value) {
        this._blue.value = value;
    }
    toString() {
        return `rgb(${this.red}, ${this.green}, ${this.blue})`;
    }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
class HSL extends Color {
    _hue;
    _saturation;
    _lightness;
    constructor(hue, saturation, lightness) {
        super();
        this._hue = new Component("hue", 0, 360);
        this._saturation = new Component("saturation", 0, 100, false);
        this._lightness = new Component("lightness", 0, 100, false);
        this.hue = hue;
        this.saturation = saturation;
        this.lightness = lightness;
    }
    get hue() {
        return this._hue.value;
    }
    set hue(value) {
        this._hue.value = value;
    }
    get saturation() {
        return this._saturation.value;
    }
    set saturation(value) {
        this._saturation.value = value;
    }
    get lightness() {
        return this._lightness.value;
    }
    set lightness(value) {
        this._lightness.value = value;
    }
    toString() {
        return `hsl(${this.hue}, ${this.saturation}%, ${this.lightness}%)`;
    }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
class WebColor extends RGB {
    constructor(red, green, blue) {
        super(red, green, blue);
    }
    /**
     * @todo Retourner palette ??
     */
    static get safeColors() {
        //safety palette
        //safe-web palette
        let component = Array.from({ length: 6 }, (value, index) => index * 51);
        let colors = new Array();
        component.forEach(red => {
            component.forEach(green => {
                component.forEach(blue => {
                    colors.push(new WebColor(red, green, blue));
                });
            });
        });
        return colors;
    }
    toString() {
        let rgb = this.red;
        rgb = (rgb << 8) + this.green;
        rgb = (rgb << 8) + this.blue;
        return `#${rgb.toString(16).toUpperCase()}`;
    }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
class Palette {
    colors;
    constructor() {
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
    getColors(format) {
        if (format === "css") {
            //return this.colors.map((color, index) => `--color-${index + 1}: ${color.toString()};`).join("\n");
            return "TODO CSS";
        }
        else if (format === "html") {
            //let colors = this.colors.map(color => `<div class="color" style="background-color: ${color.toString()};">&nbsp;</div>`).join("\n");
            //return `<div class="palette">${colors}</div>`;
            return "TODO HTML";
        }
        else if (format === "gimp") {
            return "GIMP Palette\n" + this.colors.map(color => `${color.red} ${color.green} ${color.blue}`).join("\n");
        }
        else {
            return "TODO ELSE";
        }
    }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
export { Component, Color, RGB, HSL, WebColor };
