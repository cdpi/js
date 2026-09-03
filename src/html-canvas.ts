
/*
function getAverageColor(context:CanvasImageData, x:number, y:number, width:number, height:number):RedGreenBlue
	{
	const count:number = width * height;

	let red:number = 0, green:number = 0, blue:number = 0;

	//const pixels:ImageDataArray = context.getImageData(x, y, width, height).data;
	const pixels = context.getImageData(x, y, width, height).data;

	for (let i = 0; i < pixels.length; i += 4)
		{
		red += pixels[i];
		green += pixels[i + 1];
		blue += pixels[i + 2];
		}

	red = Math.round(red / count);
	green = Math.round(green / count);
	blue = Math.round(blue / count);

	return {red, green, blue} as RedGreenBlue;
	}
*/

/*
function getAverageColors(context:CanvasImageData, imageWidth:number, imageHeight:number, columns:number, rows:number):Array<Array<RedGreenBlue>>
	{
	const cellWidth:number = Math.floor(imageWidth / columns);
	const cellHeight:number = Math.floor(imageHeight / rows);

	const colors = new Array<Array<RedGreenBlue>>();

	for (let y = 0; y < rows; y++)
		{
		const row = new Array<RedGreenBlue>();

		for (let x = 0; x < columns; x++)
			{
			row.push(getAverageColor(context, x * cellWidth, y * cellHeight, cellWidth, cellHeight));
			}

		colors.push(row);
		}

	return colors;
	}
*/
