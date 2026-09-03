import { sendAndReceiveUDP4 } from "./network.js";
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
export { Pilot };
