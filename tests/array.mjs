
import { sequence, increment, decrement, initialize, sum } from "../array.mjs";
import * as assert from "../assert.mjs";

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

assert.equal(sequence(7).toString(), "0,1,2,3,4,5,6", "sequence(7)");

assert.equal(sequence(5, increment(2)).toString(), "2,3,4,5,6", "sequence(5)");

assert.equal(sequence(6, decrement(3)).toString(), "3,2,1,0,-1,-2", "sequence(6)");

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

let a = [42, 128, -53];
let b = [-2,  1,    2];
let c = [ 2,  2,   -5];

let total = sum([a, b, c]);

assert.equal(total.toString(), "42,131,-56", "sum");
