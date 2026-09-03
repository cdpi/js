import { setTimeout as sleep } from "node:timers/promises";
import * as cheerio from "cheerio";
async function getCodes() {
    const response = await fetch("https://cesarbazaar.com/fr/nuancier/");
    const html = await response.text();
    const $ = cheerio.load(html);
    return $("span.color-swatch-id").map((i, element) => $(element).text().trim()).toArray();
}
async function getColor(code) {
    const response = await fetch(`https://cesarbazaar.com/fr/nuancier/${code}/`);
    const html = await response.text();
    const $ = cheerio.load(html);
    const name = $("h1.color-hero-title").first().text().trim();
    const quote = $("p.color-hero-quote").first().text().trim();
    const meta = $("div.color-hero-head > div.color-hero-meta > span.color-hero-meta-item > span.color-hero-meta-value");
    const ral = meta.first().text().trim();
    const hex = meta.last().text().trim();
    return { code, name, quote, ral, hex };
}
async function getColors() {
    const codes = await getCodes();
    const colors = new Array();
    for (let i = 0; i < codes.length; i++) {
        const code = codes[i];
        const color = await getColor(code);
        colors.push(color);
        await sleep(1000);
    }
    return colors;
}
// gris noirs BK
// bleus BL
// bruns BW
// verts et turquoise GN
// oranges OR
// violets et lilas PP
// rouges et roses RD
// blancs et beiges WT
// jaunes YL
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
export { getCodes, getColor, getColors };
