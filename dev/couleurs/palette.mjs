
//@ts-check

import { ColorEvent } from "./event.mjs";

class Palette extends EventTarget
	{
	constructor()
		{
		super();

		this.addEventListener("color", e =>
			{
			//let ss = e.color;
			})
		}
	}

export
	{
	Palette
	};
