import { Jimp } from "jimp";
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getPixelsFromBuffer(buffer) {
    return new Uint32Array(buffer.buffer, buffer.byteOffset, buffer.byteLength / Uint32Array.BYTES_PER_ELEMENT);
}
function getPixelsFromBitmap(bitmap) {
    return getPixelsFromBuffer(bitmap.data);
}
async function getPixelsFromFile(path) {
    const image = await Jimp.read(path);
    return getPixelsFromBitmap(image.bitmap);
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
export { getPixelsFromBuffer, getPixelsFromBitmap, getPixelsFromFile };
