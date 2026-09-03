import { exec } from "node:child_process";
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
class Piper {
    piperCli;
    aplayCli;
    constructor(piper, voice, rate) {
        this.piperCli = `${piper} --model "${voice}" --output_raw 2>/dev/null`;
        this.aplayCli = `aplay -r ${rate} -f S16_LE -t raw -c 1 -q`;
    }
    say(message) {
        exec(`echo "${message}" | ${this.piperCli} | ${this.aplayCli}`);
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
export { Piper };
