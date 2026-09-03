import { HTTPError } from "./util.js";
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Crée une instance de fetch capable d'annuler la requête précédente et de s'arrêter après un délai imparti.
 *
 * @author Gemini
 */
function createCancelableFetch() {
    let controller = null;
    return async function (url, options = {}, timeout = 5000) {
        // Annulation de l'appel précédent (si existant)
        if (controller) {
            controller.abort();
        }
        controller = new AbortController();
        const signal = controller.signal;
        // Gestion du Timeout
        const timer = setTimeout(() => {
            if (controller) {
                controller.abort();
            }
        }, timeout);
        try {
            const response = await fetch(url, { ...options, signal: signal });
            clearTimeout(timer);
            if (!response.ok) {
                throw new HTTPError(response.status, response.statusText);
            }
            return await response.json();
        }
        catch (error) {
            clearTimeout(timer);
            if (error.name === "AbortError") {
                // On ne retourne rien si c'est une annulation (volontaire ou timeout)
                return null;
            }
            throw error;
        }
        finally {
            // Libération de la référence si c'est toujours notre contrôleur
            if (controller?.signal === signal) {
                controller = null;
            }
        }
    };
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//let f = createCancelableFetch();
//f("ssd", {}, 2000);
//f("sdsd", {}, 2000);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
export { createCancelableFetch };
