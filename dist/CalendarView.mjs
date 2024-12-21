import { Calendar } from "./calendar.mjs";
class CalendarView extends HTMLElement {
    calendar;
    constructor() {
        super();
        this.calendar = new Calendar();
    }
    connectedCallback() {
    }
}
customElements.define("calendar-view", CalendarView);
