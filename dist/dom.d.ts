import { type Nullable } from "./util.js";
import { type Point2D } from "./geometry.js";
type AttributeValue = string | number;
type Attributes = {
    [key: string]: AttributeValue;
};
declare function setAttributes<T extends Element>(element: T, attributes?: Attributes): T;
type HTMLOrSVGElement = HTMLElement | SVGElement;
declare function getEventTargetElement(event: Event): Nullable<HTMLOrSVGElement>;
/**
 * Debounce: Attend une pause dans les appels avant d'exécuter la fonction.
 * @param immediate Si true, exécute la fonction au premier appel plutôt qu'au dernier.
 *
 * @author Gemini
 */
declare function debounce<T extends (...args: any[]) => any>(fn: T, wait: number, immediate?: boolean): (...args: Parameters<T>) => void;
/**
 * Throttle: Limite l'exécution à une fois par intervalle de temps fixe.
 *
 * @author Gemini
 */
declare function throttle<T extends (...args: any[]) => any>(fn: T, limit: number): (...args: Parameters<T>) => void;
declare function toDOMPoint(point: Point2D): DOMPoint;
export { type AttributeValue, type Attributes, type HTMLOrSVGElement, getEventTargetElement, setAttributes, debounce, throttle, toDOMPoint };
