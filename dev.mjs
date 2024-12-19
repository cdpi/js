
function hex(number)
	{
	console.debug(Number.isSafeInteger(number));

	console.debug(number);

	console.debug(number.toString(16));

	console.debug(Math.abs(number));

	// https://stackoverflow.com/a/697841
	// Bug pour Number.MIN_SAFE_INTEGER retourne négatif qqmm
	//console.debug((number < 0) ? 0xFFFFFFFF + number + 1 : number);
	// Bug pareil
	//console.debug(0x100000000 + number);

	// Ne fonctionne pas non plus
	//console.debug((number) >>> 0);

	// Positif ne fonctionne pas mais je suppose que c'est car j'utilise faux !!.....
	//console.log((-1).toString(16));
	//console.log((-1 >>> 0).toString(16));
	//console.log((-2).toString(16));
	//console.log((-2 >>> 0).toString(16));

	console.debug("------------------------------------------------------------------------------------------------------");
	}

/*
hex(Number.MIN_VALUE);
hex(Number.MIN_SAFE_INTEGER);
hex(Number.MAX_VALUE);
hex(Number.MAX_SAFE_INTEGER);
*/

/*
int rgb = red;
rgb = (rgb << 8) + green;
rgb = (rgb << 8) + blue;

Also, I believe you can get the individual values using:

int red = (rgb >> 16) & 0xFF;
int green = (rgb >> 8) & 0xFF;
int blue = rgb & 0xFF;
*/

let red = 25;
let green = 231;
let blue = 255;

let rgb = red;
rgb = (rgb << 8) + green;
rgb = (rgb << 8) + blue;

console.log(rgb);
console.log(rgb.toString(16));

let red2 = (rgb >> 16) & 0xFF;
let green2 = (rgb >> 8) & 0xFF;
let blue2 = rgb & 0xFF;

console.log(red2, green2, blue2);
