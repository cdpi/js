declare function getNotoEmojiName(emoji: string): string;
declare function getNotoEmojiURL(emoji: string, format?: string): string;
declare function downloadNotoEmoji(emoji: string): Promise<string>;
export { getNotoEmojiName, getNotoEmojiURL, downloadNotoEmoji };
