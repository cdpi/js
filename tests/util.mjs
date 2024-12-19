
import * as util from "../util.mjs";
import { isTrue as yes, isFalse as no } from "../assert.mjs";

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

yes(util.isNull(null));

no(util.isNull(undefined));
no(util.isNull({}.notset));
no(util.isNull(5));
no(util.isNull(""));
no(util.isNull([]));
no(util.isNull({}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

yes(util.isUndefined(undefined));
yes(util.isUndefined({}.notset));

no(util.isUndefined(null));
no(util.isUndefined(5));
no(util.isUndefined(""));
no(util.isUndefined([]));
no(util.isUndefined({}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
console.assert(isNullOrUndefined(null) === true, "isNullOrUndefined");
console.assert(isNullOrUndefined(undefined) === true, "isNullOrUndefined");
console.assert(isNullOrUndefined({}.notset) === true, "isNullOrUndefined");

console.assert(isNullOrUndefined(5) === false, "isNullOrUndefined");
console.assert(isNullOrUndefined("") === false, "isNullOrUndefined");
console.assert(isNullOrUndefined([]) === false, "isNullOrUndefined");
console.assert(isNullOrUndefined({}) === false, "isNullOrUndefined");

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

console.assert(isNotNullAndNotUndefined(null) === false, "isNotNullAndNotUndefined");
console.assert(isNotNullAndNotUndefined(undefined) === false, "isNotNullAndNotUndefined");
console.assert(isNotNullAndNotUndefined({}.notset) === false, "isNotNullAndNotUndefined");

console.assert(isNotNullAndNotUndefined(5) === true, "isNotNullAndNotUndefined");
console.assert(isNotNullAndNotUndefined("") === true, "isNotNullAndNotUndefined");
console.assert(isNotNullAndNotUndefined([]) === true, "isNotNullAndNotUndefined");
console.assert(isNotNullAndNotUndefined({}) === true, "isNotNullAndNotUndefined");

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

console.assert(isSet(null) === false, "isSet");
console.assert(isSet(undefined) === false, "isSet");
console.assert(isSet({}.notset) === false, "isSet");

console.assert(isSet(5) === true, "isSet");
console.assert(isSet("") === true, "isSet");
console.assert(isSet([]) === true, "isSet");
console.assert(isSet({}) === true, "isSet");

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
*/
