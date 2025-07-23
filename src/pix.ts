
import { RGB, Color } from "./drawing.mjs";

const color = new Color();

/**
 * @since 0.1.0
 */
async function getOffscreenCanvasFromImageBlob(blob:Blob):Promise<OffscreenCanvas>
	{
	const bitmap = await createImageBitmap(blob);

	const { width, height } = bitmap;

	const canvas = new OffscreenCanvas(width, height);

	const context = canvas.getContext("2d");

	canvas.width = width;
	canvas.height = height;

	context.drawImage(bitmap, 0, 0);

	return canvas;
	}

function getAverageColors(context:CanvasImageData, imageWidth:number, imageHeight:number, columns:number, rows:number):Array<Array<RGB>>
	{
	const cellWidth = Math.floor(imageWidth / columns);
	const cellHeight = Math.floor(imageHeight / rows);

	const colors = new Array<Array<RGB>>();

	for (let y = 0; y < rows; y++)
		{
		const row = new Array<RGB>();

		for (let x = 0; x < columns; x++)
			{
			row.push(color.getAverageColor(context, x * cellWidth, y * cellHeight, cellWidth, cellHeight));
			}

		colors.push(row);
		}

	return colors;
	}

async function pixOnMessage(event:MessageEvent):Promise<void>
	{
	const file = event.data as File;

	const canvas = await getOffscreenCanvasFromImageBlob(file);

	const context = canvas.getContext("2d");

	const colors = getAverageColors(context, canvas.width, canvas.height, 60, 30)

	//self.postMessage(colors);

	const divs = new Array<String>();

	for (let y = 0; y < colors.length; y++)
		{
		const row = colors[y];

		for (let x = 0; x < row.length; x++)
			{
			const { red, green, blue} = row[x];

			divs.push(`<div style="background-color: rgb(${red}, ${green}, ${blue}); width: 20px; height: 20px; display: inline-block;">&nbsp;</div>`);
			}
		}

	self.postMessage(divs.join("\n"));

	//const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	//self.postMessage(new SVGSVGElement());
	}

self.addEventListener("message", pixOnMessage, false);
