import { exec } from "node:child_process";
import { connect } from "mqtt";
import { sendAndReceiveUDP4 } from "../network.js";
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MQTT
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
class Broker {
    constructor() {
    }
    async connect() {
        return new Promise((resolve, reject) => {
            //const url:string = `mqtt://${host}`;
            const url = "mqtt://localhost";
            const client = connect(url);
            client.on("error", (error) => {
                client.end();
                reject(error.message);
            });
            client.on("connect", (packet) => {
                resolve();
            });
        });
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Piper
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
class Pilot {
    ip;
    port;
    constructor(ip, port) {
        this.ip = ip;
        this.port = port;
    }
    async getPilot() {
        return await this.sendAndReceive({ method: "getPilot", params: {} });
    }
    async setPilot(red, green, blue, dimming) {
        const message = {
            method: "setPilot",
            params: {
                state: true,
                r: red,
                g: green,
                b: blue,
                dimming
            }
        };
        return await this.sendAndReceive(message);
    }
    async sendAndReceive(message) {
        try {
            const body = JSON.stringify(message);
            const response = await sendAndReceiveUDP4(body, this.ip, this.port);
            const json = JSON.parse(response);
            return Promise.resolve(json);
        }
        catch (error) {
            return Promise.reject(error);
        }
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
export { 
// MQTT
Broker, 
// Piper
Piper, 
// Wiz2
Pilot };
