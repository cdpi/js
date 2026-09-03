type GetPilotMethod = "getPilot";
type SetPilotMethod = "setPilot";
type Method = GetPilotMethod | SetPilotMethod;
type GetPilotMessage = {
    method: GetPilotMethod;
    params: {};
};
type SetPilotMessage = {
    method: SetPilotMethod;
    params: {
        state: boolean;
        r: number;
        g: number;
        b: number;
        dimming?: number;
    };
};
type Message = GetPilotMessage | SetPilotMessage;
declare class Pilot {
    private readonly ip;
    private readonly port;
    constructor(ip: string, port: number);
    getPilot(): Promise<any>;
    setPilot(red: number, green: number, blue: number, dimming?: number): Promise<any>;
    private sendAndReceive;
}
export { type GetPilotMethod, type SetPilotMethod, type Method, type GetPilotMessage, type SetPilotMessage, type Message, Pilot };
