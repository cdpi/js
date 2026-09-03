
import { Buffer } from "node:buffer";
import { Bitmap, Jimp } from "jimp";

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

function getPixelsFromBuffer(buffer:Buffer):Uint32Array
	{
	return new Uint32Array(buffer.buffer, buffer.byteOffset, buffer.byteLength / Uint32Array.BYTES_PER_ELEMENT);
	}

function getPixelsFromBitmap(bitmap:Bitmap):Uint32Array
	{
	return getPixelsFromBuffer(bitmap.data);
	}

async function getPixelsFromFile(path:string):Promise<Uint32Array>
	{
	const image = await Jimp.read(path);

	return getPixelsFromBitmap(image.bitmap);
	}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

export
	{
	getPixelsFromBuffer,
	getPixelsFromBitmap,
	getPixelsFromFile
	};
