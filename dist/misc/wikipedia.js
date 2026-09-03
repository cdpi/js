import { parseColors } from "./wiki.js";
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function getWikiText(page, section) {
    const withSection = section ? `&section=${section}` : "";
    const url = `https://fr.wikipedia.org/w/api.php?action=parse&page=${page}&prop=wikitext${withSection}&format=json`;
    const response = await fetch(url);
    const json = await response.json();
    const wikitext = json.parse.wikitext["*"];
    return wikitext;
}
const reducer = (namedColors, colorData) => {
    namedColors[colorData.name.toLowerCase()] =
        {
            red: colorData.rgb.red,
            green: colorData.rgb.green,
            blue: colorData.rgb.blue
        };
    return namedColors;
};
async function getWebColors() {
    const wikitext = await getWikiText("Couleur_du_Web", 3);
    const colors = parseColors(wikitext);
    return colors.reduce(reducer, {});
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
export { getWikiText, getWebColors };
