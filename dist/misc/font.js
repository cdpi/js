import { alphabet } from "../util.js";
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
type Properties =
    {
    ascent:number;
    descent:number;
    em:number;
    family:string;
    };

type Glyph =
    {
    src:string;
    width:number;
    };

type Font =
    {
    props:Properties;
    input:string;
    output:Array<string>;
    glyphs:Record<string, Glyph>;
    };
*/
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
function after(upperCase = false) {
    const letters = alphabet(upperCase);
    return letters.map(letter => letters.map(letterAfter => `${letter}${letterAfter}`));
}
function glyphToEntity(glyph) {
    return `&#${parseInt(glyph, 16)};`;
}
/*
function glyphToHTML(glyph:string):string
    {
    return `<div class="glyph"><span>${glyphToEntity(glyph)}</span></div>`;
    }

async function glyphs(url:string):Promise<string>
    {
    const response = await fetch(url);

    const font = await response.json() as Font;

    const html = Object.getOwnPropertyNames(font.glyphs).map(glyphToHTML).join("\n");

    //document.getElementById("glyphs")!.innerHTML = html;
    return html;
    }
*/
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
export { 
//type Properties,
//type Glyph,
//type Font,
after, glyphToEntity };
