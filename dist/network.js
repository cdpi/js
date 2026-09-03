import * as dgram from "node:dgram";
import { TimeoutError } from "./util.js";
async function sendAndReceiveUDP4(message, ip, port, options = { timeout: 2000 }) {
    return new Promise((resolve, reject) => {
        let timer;
        let isClosed = false;
        const socket = dgram.createSocket("udp4");
        const closeSocket = () => {
            if (isClosed) {
                return;
            }
            isClosed = true;
            clearTimeout(timer);
            socket.close();
        };
        const onTimeout = () => {
            if (!isClosed) {
                closeSocket();
                //reject(new Error("Timeout"));
                reject(new TimeoutError("Timeout"));
            }
        };
        socket.on("error", (error) => {
            closeSocket();
            reject(error);
        });
        //socket.on("message", (message:Buffer<ArrayBuffer>) =>
        socket.on("message", (message) => {
            closeSocket();
            resolve(message.toString());
        });
        socket.connect(port, ip, () => {
            socket.send(message, (error) => {
                if (error) {
                    closeSocket();
                    reject(error);
                    return;
                }
            });
            timer = setTimeout(onTimeout, options.timeout);
        });
    });
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
export { sendAndReceiveUDP4 };
