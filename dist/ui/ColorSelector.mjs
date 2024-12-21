import { HSL } from "../color.mjs";
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
class ColorSelector extends EventTarget {
    element;
    color;
    constructor(element) {
        super();
        this.element = element;
        this.color = new HSL(0, 0, 100);
        this.element.addEventListener("mousemove", this.mouseMoveHandler);
        this.element.addEventListener("wheel", this.mouseWheelHandler);
        this.element.addEventListener("click", this.mouseClickHandler);
    }
    get mouseMoveHandler() {
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
        return (e) => { };
    }
    get mouseWheelHandler() {
        /*
        return throttle(10, e =>
            {
            this.color.saturation += ((e.deltaY > 0) ? 1 : -1);

            this.setBackgroundColor();
            });
        */
        return (e) => { };
    }
    get mouseClickHandler() {
        /*
        return e =>
            {
            // TODO: Quel Event ? click, change,...
            let event = new Event("select");

            //event.color = this.color;

            this.dispatchEvent(event);
            };
        */
        return (e) => {
            this.dispatchEvent(new CustomEvent("color", { detail: this.color.toString() }));
        };
    }
    setBackgroundColor() {
        this.element.style.backgroundColor = this.color.toString();
    }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
export { ColorSelector };
