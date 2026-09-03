import { connect } from "mqtt";
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
export { Broker };
