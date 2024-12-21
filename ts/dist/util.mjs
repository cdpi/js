function isNull(value) {
    return (value === null);
}
function isUndefined(value) {
    return (typeof value === "undefined");
}
function isNullOrUndefined(value) {
    return (isNull(value) || isUndefined(value));
}
function isNotNullAndNotUndefined(value) {
    return !isNullOrUndefined(value);
}
function isBoolean(value) {
    return (typeof value === "boolean");
}
function isNumber(value) {
    return (typeof value === "number");
}
function isBigInteger(value) {
    return (typeof value === "bigint");
}
function isString(value) {
    return (typeof value === "string");
}
function isArray(value) {
    return Array.isArray(value);
}
function isSymbol(value) {
    return (typeof value === "symbol");
}
function isFunction(value) {
    return (typeof value === "function");
}
function isObject(value) {
    // TODO: null retourne aussi object je crois !!!
    return (typeof value === "object");
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
function minmax(minimum, maximum) {
    return value => Math.max(minimum, Math.min(value, maximum));
}
function between(value, minimum, maximum, rounded = true) {
    if (rounded) {
        value = Math.round(value);
    }
    return minmax(minimum, maximum)(value);
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
function isBlank(text) {
    return (text.trim().length === 0);
}
function splitAndTrim(text, separator = ",") {
    return text.split(separator).map(value => value.trim());
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Math/random
/**
 * On renvoie un nombre aléatoire entre une valeur minimum (incluse) et une valeur maximum (exclue)
 */
function getRandom(minimum, maximum) {
    return Math.random() * (maximum - minimum) + minimum;
}
/**
 * On renvoie un entier aléatoire entre une valeur minimum (incluse) et une valeur maximum (exclue)
 * Attention: si on utilisait Math.round(), on aurait une distribution non uniforme !
 */
function getRandomInt(minimum, maximum) {
    minimum = Math.ceil(minimum);
    maximum = Math.floor(maximum);
    return Math.floor(Math.random() * (maximum - minimum)) + minimum;
}
/**
 * On renvoie un entier aléatoire entre une valeur minimum (incluse) et une valeur maximum (incluse)
 * Attention: si on utilisait Math.round(), on aurait une distribution non uniforme !
 */
function getRandomIntInclusive(minimum, maximum) {
    minimum = Math.ceil(minimum);
    maximum = Math.floor(maximum);
    return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
export { isNull, isUndefined, isNullOrUndefined, isNotNullAndNotUndefined, isBoolean, isNumber, isBigInteger, isString, isArray, isSymbol, isFunction, isObject, minmax, between, isBlank, splitAndTrim, getRandom, getRandomInt, getRandomIntInclusive };
