/**
 * Crée une instance de fetch capable d'annuler la requête précédente et de s'arrêter après un délai imparti.
 *
 * @author Gemini
 */
declare function createCancelableFetch(): (url: string, options?: RequestInit, timeout?: number) => Promise<any>;
export { createCancelableFetch };
