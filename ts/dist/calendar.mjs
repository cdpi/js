import { increment, sequence } from "./array.mjs";
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
class Month {
    constructor() {
    }
    static get JANUARY() {
        return _JANUARY;
    }
    static get FEBRUARY() {
        return _FEBRUARY;
    }
    static get MARCH() {
        return _MARCH;
    }
    static get APRIL() {
        return _APRIL;
    }
    static get MAY() {
        return _MAY;
    }
    static get JUNE() {
        return _JUNE;
    }
    static get JULY() {
        return _JULY;
    }
    static get AUGUST() {
        return _AUGUST;
    }
    static get SEPTEMBER() {
        return _SEPTEMBER;
    }
    static get OCTOBER() {
        return _OCTOBER;
    }
    static get NOVEMBER() {
        return _NOVEMBER;
    }
    static get DECEMBER() {
        return _DECEMBER;
    }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
class Calendar {
    date;
    formatter;
    constructor(date = new Date(), formatter = new Intl.DateTimeFormat()) {
        this.date = date;
        this.formatter = formatter;
    }
    get days() {
        let month = this.date.getMonth();
        let year = this.date.getFullYear();
        return Calendar.getDaysOfMonth(month, year).map(Calendar.dayAsDate(month, year, true));
    }
    get firstDayOfMonth() {
        return Calendar.getFirstDayOfMonth(this.date.getFullYear(), this.date.getMonth());
    }
    format(date) {
        return this.formatter.format(date);
    }
    static getFirstDayOfMonth(month, year) {
        return _DAY_OF_WEEK[new Date(year, month, 1).getDay()];
    }
    static getDaysInMonth(month, year) {
        // Mois + 1 pour avoir le mois suivant et day 0 pour avoir le jour précédent :)
        return new Date(year, month + 1, 0).getDate();
    }
    static getDaysOfMonth(month, year) {
        return sequence(Calendar.getDaysInMonth(month, year), increment(1));
    }
    static dayAsDate(month, year, utc = false) {
        if (utc) {
            return day => new Date(Date.UTC(year, month, day));
        }
        return day => new Date(year, month, day);
    }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
export { Month, Calendar };
