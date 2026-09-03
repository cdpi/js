
import { exec } from "node:child_process";

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

class Piper
	{
	private readonly piperCli:string;
	private readonly aplayCli:string;

	constructor(piper:string, voice:string, rate:string|number)
		{
		this.piperCli = `${piper} --model "${voice}" --output_raw 2>/dev/null`;
		this.aplayCli = `aplay -r ${rate} -f S16_LE -t raw -c 1 -q`;
		}

	public say(message:string):void
		{
		exec(`echo "${message}" | ${this.piperCli} | ${this.aplayCli}`);
		}
	}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

export
	{
	Piper
	};
