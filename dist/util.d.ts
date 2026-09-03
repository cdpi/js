type Nullable<T> = T | null;
declare function stringOrNull(text: string): Nullable<string>;
declare function stringNotEmpty(text: string): string;
declare function removeAccents(text: string): string;
declare function getCodePoints(text: string): Array<number>;
declare const TEXT_VARIATION_SELECTOR = 65038;
declare const EMOJI_VARIATION_SELECTOR = 65039;
declare function notTextVariationSelector(codePoint: number): boolean;
declare function notEmojiVariationSelector(codePoint: number): boolean;
declare function toHex(value: number, upperCase?: boolean, padLength?: number): string;
declare function chunk<T>(array: Array<T>, size: number): Array<Array<T>>;
declare function sequence(count: number): Array<number>;
declare function shuffle<T>(array: Array<T>): Array<T>;
declare function getRandom(minimum: number, maximum: number): number;
declare class NotImplementedError extends Error {
    constructor(message?: string);
}
declare class EmptyStringError extends Error {
    constructor(message?: string);
}
declare class CircularReferenceError extends Error {
    constructor(message?: string);
}
declare class HTTPError extends Error {
    readonly code: number;
    constructor(code: number, message?: string);
}
declare class TimeoutError extends Error {
    constructor(message?: string);
}
export { TEXT_VARIATION_SELECTOR, EMOJI_VARIATION_SELECTOR, type Nullable, stringOrNull, stringNotEmpty, removeAccents, getCodePoints, notTextVariationSelector, notEmojiVariationSelector, toHex, chunk, sequence, shuffle, getRandom, NotImplementedError, EmptyStringError, CircularReferenceError, HTTPError, TimeoutError };
