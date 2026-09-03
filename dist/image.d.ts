/// <reference types="node" resolution-mode="require"/>
/// <reference types="node" resolution-mode="require"/>
import { Buffer } from "node:buffer";
import { Bitmap } from "jimp";
declare function getPixelsFromBuffer(buffer: Buffer): Uint32Array;
declare function getPixelsFromBitmap(bitmap: Bitmap): Uint32Array;
declare function getPixelsFromFile(path: string): Promise<Uint32Array>;
export { getPixelsFromBuffer, getPixelsFromBitmap, getPixelsFromFile };
