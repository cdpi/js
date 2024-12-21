
async function loadImage(url:string):Promise<unknown>
	{
	return new Promise((resolve, reject) =>
		{
		let image = new Image();

		image.onload = () => resolve(image);

		image.onerror = reject;

		image.src = url;
		});
	}

function getPixels(image:HTMLImageElement):Uint8ClampedArray<ArrayBufferLike>|null
	{
	let canvas = document.createElement("canvas");

	canvas.width = image.naturalWidth;
	canvas.height = image.naturalHeight;

	let context = canvas.getContext("2d");

	if (context === null)
		{
		return null;
		}

	context.drawImage(image, 0, 0);

	return context.getImageData(0, 0, image.naturalWidth, image.naturalHeight).data;
	}

async function pixelate(image:HTMLImageElement, pixelSize:number):Promise<unknown>
	{
	let rows = Math.floor(image.naturalHeight / pixelSize);
	let columns = Math.floor(image.naturalWidth / pixelSize);

	let RW = image.naturalWidth * 4;
	let PX = pixelSize * pixelSize;

	let result = new Array();

	let pixels = getPixels(image);

	if (pixels === null)
		{
		return null;
		}

	for (let row = 0; row < rows; row++)
		{
		let line = new Array();

		for (let column = 0; column < columns; column++)
			{
			let red = 0;
			let green = 0;
			let blue = 0;

			for (let y = 0; y < pixelSize; y++)
				{
				let offsetY = row * pixelSize + y;

				for (let x = 0; x < pixelSize; x++)
					{
					let offsetX = column * pixelSize + x;

					let offset = offsetY * RW + offsetX * 4;

					red += pixels[offset];
					green += pixels[offset + 1];
					blue += pixels[offset + 2];
					}
				}

			red = Math.floor(red / PX);
			green = Math.floor(green / PX);
			blue = Math.floor(blue / PX);

			line.push([red, green, blue]);
			}

		result.push(line);
		}

	return result;
	}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

export
	{
	loadImage,
	getPixels,
	pixelate
	};
