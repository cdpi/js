
import { type Nullable, HTTPError } from "./util.js";

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Crée une instance de fetch capable d'annuler la requête précédente et de s'arrêter après un délai imparti.
 * 
 * @author Gemini
 */
function createCancelableFetch():(url:string, options?:RequestInit, timeout?:number) => Promise<any>
	{
	let controller:Nullable<AbortController> = null;

	return async function(url:string, options:RequestInit = {}, timeout:number = 5000):Promise<any>
		{
		// Annulation de l'appel précédent (si existant)
		if (controller)
			{
			controller.abort();
			}

		controller = new AbortController();

		const signal = controller.signal;

		// Gestion du Timeout
		const timer = setTimeout(() =>
			{
			if (controller)
				{
				controller.abort();
				}
			}, 
			timeout
			);

		try
			{
			const response = await fetch(url, {...options, signal: signal});

			clearTimeout(timer);

			if (!response.ok)
				{
				throw new HTTPError(response.status, response.statusText);
				}

			return await response.json();
			}
		catch (error:any)
			{
			clearTimeout(timer);

			if (error.name === "AbortError")
				{
				// On ne retourne rien si c'est une annulation (volontaire ou timeout)
				return null;
				}

			throw error;
			}
		finally
			{
			// Libération de la référence si c'est toujours notre contrôleur
			if (controller?.signal === signal)
				{
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

export
	{
	createCancelableFetch
	};
