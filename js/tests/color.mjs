
//@ts-check

import { Component, RGB, WebColor } from "../color.mjs";
import * as assert from "../assert.mjs";

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

let red = new Component("red", 0, 255, true);

red.value = 300;

assert.equal(red.value, 255);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

let rgb = new RGB(23, 102, 231);

assert.equal(rgb.red, 23);
assert.equal(rgb.green, 102);
assert.equal(rgb.blue, 231);

assert.equal(rgb.toString(), "rgb(23, 102, 231)");

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

let webColors = WebColor.safeColors;

let webColorSet = new Set(webColors);

assert.equal(webColors.length, 216);

assert.equal(webColors.length, webColorSet.size);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////