
import { Renderer } from "./drawing.mjs";

/**
 * @since 0.1.0
 */
class SVGRenderer implements Renderer<SVGElement, void>
	{
	public constructor()
		{
		}

	public render(to:SVGElement):void
		{
		to.ownerDocument.createElement("sds");
		//to.appendChild
		}
	}

/*
function addDOMContentLoadedListener(listener:EventListener):void
	{
	if (document.readyState === 'loading')
		{
		document.addEventListener('DOMContentLoaded', listener);
		}
	else
		{
		listener(null);
		}
	}
*/

function fixViewportSize():void
	{
	//const largeurViewport = window.innerWidth;
	//const hauteurViewport = window.innerHeight;
	}

export
	{
	SVGRenderer
	};
