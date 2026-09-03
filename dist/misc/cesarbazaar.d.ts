type Color = {
    code: string;
    name: string;
    quote: string;
    ral: string;
    hex: string;
};
declare function getCodes(): Promise<Array<string>>;
declare function getColor(code: string): Promise<Color>;
declare function getColors(): Promise<Array<Color>>;
export { type Color, getCodes, getColor, getColors };
