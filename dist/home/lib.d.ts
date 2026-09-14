declare class Broker {
    constructor();
    connect(): Promise<void>;
}
declare class Piper {
    private readonly piperCli;
    private readonly aplayCli;
    constructor(piper: string, voice: string, rate: string | number);
    say(message: string): void;
}
declare class Pilot {
    private readonly ip;
    private readonly port;
    constructor(ip: string, port: number);
    getPilot(): Promise<any>;
    setPilot(red: number, green: number, blue: number, dimming?: number): Promise<any>;
    private sendAndReceive;
}
export { Broker, Piper, Pilot };
