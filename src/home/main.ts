
import { readFileSync } from "node:fs";

import { Configuration } from "./configuration.js";
import { Pilot } from "../wiz2.js";

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

// home pas command Linux ;-)
// alias dans .bash_aliases

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

try
	{
	const handleShutdown = async () =>
		{
		process.exit(0);
		};

	process.on("SIGINT", handleShutdown); // Ctrl+C
	process.on("SIGTERM", handleShutdown); // Kill

	setInterval(() => {}, 1000 * 60 * 60);

	let configuration = Configuration.parse(readFileSync("hom.json", "utf-8"));
	console.debug(configuration);
	//new Pilot(configuration.led!.ip!, configuration.led!.port!).setPilot(200, 4, 56);

	// Lire les arguments de la ligne de commande
	//let [,, colorName, dss, sddd] = process.argv;
	//console.debug(process.argv);

	let [,, ...ddd] = process.argv;
	console.debug(ddd);
	}
catch (error)
	{
	console.error(error);

	process.exit(1);
	}
