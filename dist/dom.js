function setAttributes(element, attributes) {
    if (attributes) {
        for (const [attribute, value] of Object.entries(attributes)) {
            element.setAttribute(attribute, String(value));
        }
    }
    return element;
}
function getEventTargetElement(event) {
    if (event.target) {
        if (event.target instanceof HTMLElement) {
            return event.target;
        }
        if (event.target instanceof SVGElement) {
            return event.target;
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
function debounce(fn, wait, immediate = false) {
    let timeout = null;
    return function (...args) {
        const context = this;
        const later = () => {
            timeout = null;
            if (!immediate) {
                fn.apply(context, args);
            }
        };
        const callNow = immediate && !timeout;
        if (timeout !== null) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(later, wait);
        if (callNow) {
            fn.apply(context, args);
        }
    };
}
/**
 * Throttle: Limite l'exécution à une fois par intervalle de temps fixe.
 *
 * @author Gemini
 */
function throttle(fn, limit) {
    let inThrottle = false;
    return function (...args) {
        if (!inThrottle) {
            fn.apply(this, args);
            inThrottle = true;
            setTimeout(() => { inThrottle = false; }, limit);
        }
    };
}
function toDOMPoint(point) {
    return new DOMPoint(point.x, point.y);
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
export { getEventTargetElement, setAttributes, debounce, throttle, toDOMPoint };
