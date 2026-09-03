import assert from "node:assert/strict";
import { test } from "node:test";
import { toHex } from "../util.js";
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
test("hex", () => {
    const value = 123;
    const hex = "7b";
    const hexUpper = "7B";
    const hexPad6 = "00007b";
    const hexUpperPad6 = "00007B";
    assert.equal(toHex(value), hex);
    assert.equal(toHex(value, true), hexUpper);
    assert.equal(toHex(value, false, 6), hexPad6);
    assert.equal(toHex(value, true, 6), hexUpperPad6);
});
