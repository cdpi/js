type SendAndReceiveOptions = {
    timeout: number;
};
declare function sendAndReceiveUDP4(message: string, ip: string, port: number, options?: SendAndReceiveOptions): Promise<string>;
export { type SendAndReceiveOptions, sendAndReceiveUDP4 };
