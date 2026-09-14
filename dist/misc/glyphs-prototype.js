import { execSync } from "node:child_process";
import { readdirSync } from "node:fs";
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getInkscapeActions(strokeWidth, exportPath) {
    const actions = [
        "select-all:all;",
        "selection-ungroup;",
        `object-set-property:stroke-width,${strokeWidth};`,
        "object-stroke-to-path;",
        "path-union;",
        "path-simplify;",
        `export-filename:${exportPath};`,
        "export-do;"
    ];
    return actions.join(" ");
}
function getInkscapeCommandLine(source, destination, strokeWidth) {
    const actions = getInkscapeActions(strokeWidth, destination);
    return `inkscape "${source}" --actions="${actions}"`;
}
function build(root, fontSizes) {
    const glyphs = readdirSync(`${root}/svg/`);
    Object.entries(fontSizes).forEach(entry => {
        const [fontSize, strokeWidth] = entry;
        glyphs.forEach(glyph => {
            const source = `${root}/svg/${glyph}`;
            const destination = `${root}/${fontSize}/${glyph}`;
            const inkscape = getInkscapeCommandLine(source, destination, strokeWidth);
            //console.debug(inkscape);
            execSync(inkscape);
        });
    });
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
export { build };
