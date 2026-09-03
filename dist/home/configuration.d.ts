import "reflect-metadata";
declare class Device {
    readonly name?: string;
    readonly ip?: string;
    readonly port?: number;
}
declare class Configuration {
    readonly led?: Device;
    static parse(json: string): Configuration;
}
export { Configuration };
