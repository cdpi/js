//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// String
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
function stringOrNull(text) {
    return (text.length > 0) ? text : null;
}
function stringNotEmpty(text) {
    if (text.length === 0) {
        throw new EmptyStringError();
    }
    return text;
}
function removeAccents(text) {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
/*
function slugify(str: string): string {
  const removedAccents = removeAccents(str);
  return removedAccents
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
*/
function getCodePoints(text) {
    const codePoints = new Array();
    for (const character of text) {
        const codePoint = character.codePointAt(0);
        if (codePoint) {
            codePoints.push(codePoint);
        }
    }
    return codePoints;
}
// VARIATION SELECTOR-16 (0xFE0F) = Emoji Variation Selector
// https://www.unicode.org/charts/PDF/UFE00.pdf
const TEXT_VARIATION_SELECTOR = 0xFE0E;
const EMOJI_VARIATION_SELECTOR = 0xFE0F;
function notTextVariationSelector(codePoint) {
    return (codePoint !== TEXT_VARIATION_SELECTOR);
}
function notEmojiVariationSelector(codePoint) {
    return (codePoint !== EMOJI_VARIATION_SELECTOR);
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Number
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
function toHex(value, upperCase = false, padLength = 0) {
    let hex = value.toString(16);
    if (upperCase) {
        hex = hex.toUpperCase();
    }
    if (padLength > 0) {
        hex = hex.padStart(padLength, "0");
    }
    return hex;
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Array
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
function chunk(array, size) {
    const result = new Array();
    for (let i = 0; i < array.length; i += size) {
        result.push(array.slice(i, i + size));
    }
    return result;
}
function sequence(count) {
    return Array.from({ length: count }, (value, key) => key);
}
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = getRandom(0, i);
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Math/random
// On renvoie un entier aléatoire entre une valeur min (incluse) et une valeur max (incluse).
// Attention : si on utilisait Math.round(), on aurait une distribution non uniforme !
function getRandom(minimum, maximum) {
    minimum = Math.ceil(minimum);
    maximum = Math.floor(maximum);
    return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Error
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
class NotImplementedError extends Error {
    constructor(message) {
        super(message);
        this.name = "NotImplementedError";
        Object.setPrototypeOf(this, NotImplementedError.prototype);
    }
}
class EmptyStringError extends Error {
    constructor(message) {
        super(message);
        this.name = "EmptyStringError";
        Object.setPrototypeOf(this, EmptyStringError.prototype);
    }
}
class CircularReferenceError extends Error {
    constructor(message) {
        super(message);
        this.name = "CircularReferenceError";
        Object.setPrototypeOf(this, CircularReferenceError.prototype);
    }
}
class HTTPError extends Error {
    code;
    constructor(code, message) {
        super(message);
        this.code = code;
        this.name = "HTTPError";
        Object.setPrototypeOf(this, HTTPError.prototype);
    }
}
class TimeoutError extends Error {
    constructor(message) {
        super(message);
        this.name = "TimeoutError";
        Object.setPrototypeOf(this, TimeoutError.prototype);
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
export { TEXT_VARIATION_SELECTOR, EMOJI_VARIATION_SELECTOR, stringOrNull, stringNotEmpty, removeAccents, getCodePoints, notTextVariationSelector, notEmojiVariationSelector, toHex, chunk, sequence, shuffle, getRandom, NotImplementedError, EmptyStringError, CircularReferenceError, HTTPError, TimeoutError };
