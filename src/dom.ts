
import { type Nullable } from "./util.js";
import { type Point2D } from "./geometry.js";

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

type AttributeValue = string | number;

type Attributes = {[key:string]:AttributeValue};

function setAttributes<T extends Element>(element:T, attributes?:Attributes):T
	{
	if (attributes)
		{
		for (const [attribute, value] of Object.entries(attributes))
			{
			element.setAttribute(attribute, String(value));
			}
		}

	return element;
	}

type HTMLOrSVGElement = HTMLElement | SVGElement;

function getEventTargetElement(event:Event):Nullable<HTMLOrSVGElement>
	{
	if (event.target)
		{
		if (event.target instanceof HTMLElement)
			{
			return event.target as HTMLElement;
			}

		if (event.target instanceof SVGElement)
			{
			return event.target as SVGElement;
			}
		}

	return null;
	}

/**
 * Debounce: Attend une pause dans les appels avant d'exécuter la fonction.
 * @param immediate Si true, exécute la fonction au premier appel plutôt qu'au dernier.
 * 
 * @author Gemini
 */
function debounce<T extends (...args:any[]) => any>(fn:T, wait:number, immediate:boolean = false):(...args:Parameters<T>) => void
	{
	let timeout:ReturnType<typeof setTimeout> | null = null;

	return function(this:any, ...args:Parameters<T>):void
		{
		const context = this;

		const later = () =>
			{
			timeout = null;

			if (!immediate)
				{
				fn.apply(context, args);
				}
			};

		const callNow = immediate && !timeout;

		if (timeout !== null)
			{
			clearTimeout(timeout);
			}

		timeout = setTimeout(later, wait);

		if (callNow)
			{
			fn.apply(context, args);
			}
		};
	}

/**
 * Throttle: Limite l'exécution à une fois par intervalle de temps fixe.
 * 
 * @author Gemini
 */
function throttle<T extends (...args:any[]) => any>(fn:T, limit:number):(...args:Parameters<T>) => void
	{
	let inThrottle:boolean = false;

	return function(this:any, ...args:Parameters<T>): void
		{
		if (!inThrottle)
			{
			fn.apply(this, args);

			inThrottle = true;

			setTimeout(() => {inThrottle = false;}, limit);
			}
		};
	}

type Point = Point2D | DOMPoint;

function toDOMPoint(point:Point2D):DOMPoint
	{
	return new DOMPoint(point.x, point.y);
	}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

export
	{
	type AttributeValue,
	type Attributes,
	type HTMLOrSVGElement,

	getEventTargetElement,
	setAttributes,

	debounce,
	throttle,

	toDOMPoint
	};
