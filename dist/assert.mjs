import * as util from "./util.mjs";
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
class AssertError extends Error {
    constructor(message) {
        super(message);
    }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * @throws {AssertError}
 */
function isNull(value, message = "not null") {
    if (!util.isNull(value)) {
        throw new AssertError(message);
    }
}
/**
 * @throws {AssertError}
 */
function isNotNull(value, message = "null") {
    if (util.isNull(value)) {
        throw new AssertError(message);
    }
}
/**
 * @throws {AssertError}
 */
function notNullOrUndefined(value, message = "null or undefined") {
    if (util.isNullOrUndefined(value)) {
        throw new AssertError(message);
    }
}
/**
 * @throws {AssertError}
 */
function isBoolean(value, message = "not a boolean") {
    if (!util.isBoolean(value)) {
        throw new AssertError(message);
    }
}
/**
 * @throws {AssertError}
 */
function isNumber(value, message = "not a number") {
    notNullOrUndefined(value);
    if (!util.isNumber(value) && !util.isBigInteger(value)) {
        throw new AssertError(message);
    }
}
/**
 * @throws {AssertError}
 */
function isArray(value, message = "not an array") {
    notNullOrUndefined(value);
    if (!util.isArray(value)) {
        throw new AssertError(message);
    }
}
/**
 * @throws {AssertError}
 */
function arrayLength(array, length, message = "array length") {
    isArray(array);
    isNumber(length);
    if (array.length !== length) {
        throw new AssertError(message);
    }
}
/**
 * @throws {AssertError}
 */
function objectKeys(object, keys, message = "object keys") {
    isObject(object);
    isArray(keys);
    let o = Object.keys(object).sort().join("");
    let k = keys.sort().join("");
    // Not OK ;-) hahahahhahahahaha
    if (o !== k) {
        throw new AssertError(message);
    }
}
/**
 * @throws {AssertError}
 */
function isObject(value, message = "not an object") {
    notNullOrUndefined(value);
    if (!util.isObject(value)) {
        throw new AssertError(message);
    }
}
/**
 * @throws {AssertError}
 */
function isInstanceOf(value, type, message) {
    notNullOrUndefined(value);
    if (!(value instanceof type)) {
        throw new AssertError(message);
    }
}
/**
 * @throws {AssertError}
 */
function equal(left, right, message = "not equal") {
    if (!(left === right)) {
        throw new AssertError(message);
    }
}
/**
 * @throws {AssertError}
 */
function isTrue(value, message = "not true") {
    isBoolean(value, message);
    equal(value, true, message);
}
/**
 * @throws {AssertError}
 */
function isFalse(value, message = "not false") {
    isBoolean(value, message);
    equal(value, false, message);
}
/**
 * @throws {AssertError}
 */
function throwError(code, message = "don't throw error") {
    let ok = null;
    try {
        code();
        ok = false;
    }
    catch (error) {
        ok = true;
    }
    if (ok !== true) {
        throw new AssertError(message);
    }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
export { AssertError, isNull, isNotNull, notNullOrUndefined, notNullOrUndefined as isSet, isBoolean, isNumber, isArray, arrayLength, isObject, objectKeys, isInstanceOf, equal, isTrue, isFalse, throwError };
