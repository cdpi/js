
import * as io from "../io.mjs";
import * as assert from "../assert.mjs";

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

assert.isTrue(io.isFile("io.mjs"), "not file")

let files = io.getFiles(".");

assert.isArray(files);

let json = io.readAsJSON("io.json");

assert.objectKeys(json, ["blabla", "ok", "test"]);
