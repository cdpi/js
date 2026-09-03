type RGB = {
    r: number;
    g: number;
    b: number;
};
type RGBA = RGB & {
    a: number;
};
type RedGreenBlue = {
    red: number;
    green: number;
    blue: number;
};
type RedGreenBlueAlpha = RedGreenBlue & {
    alpha: number;
};
type Color = RGB | RGBA | RedGreenBlue | RedGreenBlueAlpha;
declare function toHex(color: number, prefix: string, length: number): string;
export { type RGB, type RGBA, type RedGreenBlue, type RedGreenBlueAlpha, type Color, toHex };
