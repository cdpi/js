
import assert from "node:assert/strict";
import { test } from "node:test";

import { type RedGreenBlueAlpha, parse } from "../color.js";

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

const red = {red: 255, green: 0, blue: 0, alpha: 255} as RedGreenBlueAlpha;

test("parse-red", () =>
	{
	assert.deepEqual(parse("#FF0000"), red, "#FF0000");
	assert.deepEqual(parse("#FF0000FF"), red, "#FF0000FF");

	assert.deepEqual(parse("FF0000"), red, "FF0000");
	assert.deepEqual(parse("FF0000FF"), red, "FF0000FF");
	});
