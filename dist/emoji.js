import { getCodePoints, notEmojiVariationSelector } from "./util.js";
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getNotoEmojiName(emoji) {
    return "emoji_u" + getCodePoints(emoji)
        .filter(notEmojiVariationSelector)
        .map((code) => code.toString(16))
        .join("_");
}
function getNotoEmojiURL(emoji, format = "svg") {
    const filename = `${getNotoEmojiName(emoji)}.${format}`;
    return `https://raw.githubusercontent.com/googlefonts/noto-emoji/main/svg/${filename}`;
}
async function downloadNotoEmoji(emoji) {
    const response = await fetch(getNotoEmojiURL(emoji));
    const text = await response.text();
    return text;
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
export { getNotoEmojiName, getNotoEmojiURL, downloadNotoEmoji };
