
class ColorOverlay
	{
	overlay(color, intensity = 1.0)
		{
		let mix = (left, right) =>
			{
			let value = (left < 128) ? (2 * right * left / 255) : (255 - 2 * (255 - left) * (255 - right) / 255);

			value = (value * intensity + (left * (1 - intensity)));

			return value;
			};

		let red = mix(this.red, color.red, intensity);
		let green = mix(this.green, color.green, intensity);
		let blue = mix(this.blue, color.blue, intensity);

		return new RGB(red, green, blue);
		}
	}
