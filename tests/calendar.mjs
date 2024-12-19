
//@ts-check

import { Month, Calendar } from "../calendar.mjs";

import * as assert from "../assert.mjs";

assert.equal(Calendar.getDaysInMonth(Month.NOVEMBER, 2024), 30);

//let calendar = new Calendar(new Date(2024, Month.NOVEMBER, 15), new Intl.DateTimeFormat("fr-CH"));
let calendar = new Calendar(new Date(Date.UTC(2024, Month.NOVEMBER, 15)), new Intl.DateTimeFormat("fr-CH"));

assert.arrayLength(calendar.days, 30);

console.log(calendar.date);
//assert.equal(calendar.firstDayOfMonth, 4);
console.log(calendar.firstDayOfMonth);

let days = calendar.days.map(date => calendar.format(date));

assert.equal(days.shift(), "01.11.2024");
assert.equal(days.pop(), "30.11.2024");
