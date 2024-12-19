
//@ts-check

import { sequence, increment } from "./array.mjs";

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

const _DAY_OF_WEEK = [6, 0, 1, 2, 3, 4, 5];

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

const _JANUARY = 0;
const _FEBRUARY = 1;
const _MARCH = 2;
const _APRIL = 3;
const _MAY = 4;
const _JUNE = 5;
const _JULY = 6;
const _AUGUST = 7;
const _SEPTEMBER = 8;
const _OCTOBER = 9;
const _NOVEMBER = 10;
const _DECEMBER = 11;

class Month
	{
	constructor()
		{
		}

	static get JANUARY()
		{
		return _JANUARY;
		}

	static get FEBRUARY()
		{
		return _FEBRUARY;
		}

	static get MARCH()
		{
		return _MARCH;
		}

	static get APRIL()
		{
		return _APRIL;
		}

	static get MAY()
		{
		return _MAY;
		}

	static get JUNE()
		{
		return _JUNE;
		}

	static get JULY()
		{
		return _JULY;
		}

	static get AUGUST()
		{
		return _AUGUST;
		}

	static get SEPTEMBER()
		{
		return _SEPTEMBER;
		}

	static get OCTOBER()
		{
		return _OCTOBER;
		}

	static get NOVEMBER()
		{
		return _NOVEMBER;
		}

	static get DECEMBER()
		{
		return _DECEMBER;
		}
	}

const _Month = Month;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

class Calendar
	{
	/**
	 * @param {Date} date
	 * @param {Intl.DateTimeFormat} formatter
	 */
	constructor(date = new Date(), formatter = new Intl.DateTimeFormat())
		{
		this.formatter = formatter;
		this.date = date;
		}

	/**
	 * @returns {Array<Date>}
	 */
	get days()
		{
		let month = this.date.getMonth();
		let year = this.date.getFullYear();

		return Calendar.getDaysOfMonth(month, year).map(Calendar.dayAsDate(month, year, true));
		}

	/**
	 * @returns {number}
	 */
	get firstDayOfMonth()
		{
		return Calendar.getFirstDayOfMonth(this.date.getFullYear(), this.date.getMonth());
		}

	/**
	 * @param {Date|number} date
	 * 
	 * @returns {string}
	 */
	format(date)
		{
		return this.formatter.format(date);
		}

	/**
	 * @param {number} month 0 - 11
	 * @param {number} year
	 * 
	 * @returns {number}
	 */
	static getFirstDayOfMonth(month, year)
		{
		return _DAY_OF_WEEK[new Date(year, month, 1).getDay()];
		}

	/**
	 * @param {number} month 0 - 11
	 * @param {number} year
	 * 
	 * @returns {number}
	 */
	static getDaysInMonth(month, year)
		{
		// Mois + 1 pour avoir le mois suivant et day 0 pour avoir le jour précédent :)
		return new Date(year, month + 1, 0).getDate();
		}

	/**
	 * @param {number} month 0 - 11
	 * @param {number} year
	 * 
	 * @returns {Array<number>}
	 */
	static getDaysOfMonth(month, year)
		{
		return sequence(Calendar.getDaysInMonth(month, year), increment(1));
		}

	/**
	 * @param {number} month 0 - 11
	 * @param {number} year
	 * @param {boolean} utc
	 * 
	 * @returns {(day:number) => Date}
	 */
	static dayAsDate(month, year, utc = false)
		{
		if (utc)
			{
			return day => new Date(Date.UTC(year, month, day));
			}

		return day => new Date(year, month, day);
		}
	}

const _Calendar = Calendar;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

export
	{
	_Month as Month,
	_Calendar as Calendar
	};
