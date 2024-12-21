
import { Calendar } from "../calendar.mjs";

class CalendarView extends HTMLElement
	{
	private calendar:Calendar;

	constructor()
		{
		super();

		this.calendar = new Calendar();
		}

	connectedCallback()
		{
		}
	}

customElements.define("calendar-view", CalendarView);
