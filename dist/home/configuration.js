var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import "reflect-metadata";
import { Expose, plainToInstance } from "class-transformer";
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
class Device {
    name;
    ip;
    port;
}
__decorate([
    Expose({ name: "name" })
], Device.prototype, "name", void 0);
__decorate([
    Expose({ name: "ip" })
], Device.prototype, "ip", void 0);
__decorate([
    Expose({ name: "port" })
], Device.prototype, "port", void 0);
/*
class ServerConfiguration
    {
    @Expose({name: "host"})
    public readonly host?:string;

    @Expose({name: "port"})
    public readonly port?:number;
    }
*/
/*
class DevicesConfiguration
    {
    @Expose({name: "neopixel"})
    @Type(() => Array<NeoPixelConfiguration>)
    public readonly neopixel?:Array<NeoPixelConfiguration>;

    @Expose({name: "wiz"})
    @Type(() => Array<WiZConfiguration>)
    public readonly wiz?:Array<WiZConfiguration>;
    }
*/
class Configuration {
    //@Expose({name: "server"})
    //@Type(() => ServerConfiguration)
    //public readonly server?:ServerConfiguration;
    //@Expose({name: "devices"})
    //@Type(() => Array<Device>)
    //public readonly devices?:Array<Device>;
    led;
    static parse(json) {
        return plainToInstance(Configuration, JSON.parse(json));
    }
}
__decorate([
    Expose({ name: "wiz2" })
], Configuration.prototype, "led", void 0);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
export { Configuration };
