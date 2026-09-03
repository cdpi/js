
import { getCodePoints, notEmojiVariationSelector } from "./util.js";

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

function getNotoEmojiName(emoji:string):string
	{
	return "emoji_u" + getCodePoints(emoji)
		.filter(notEmojiVariationSelector)
		.map((code:number) => code.toString(16))
		.join("_");
	}

function getNotoEmojiURL(emoji:string, format:string = "svg"):string
	{
	const filename:string = `${getNotoEmojiName(emoji)}.${format}`;

	return `https://raw.githubusercontent.com/googlefonts/noto-emoji/main/svg/${filename}`;
	}

async function downloadNotoEmoji(emoji:string):Promise<string>
	{
	const response:Response = await fetch(getNotoEmojiURL(emoji));

	const text:string = await response.text();

	return text;
	}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

export
	{
	getNotoEmojiName,
	getNotoEmojiURL,
	downloadNotoEmoji
	};
