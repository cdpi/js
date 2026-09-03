
import "reflect-metadata";
import { Expose, Type, plainToInstance } from "class-transformer";

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

class Device
	{
	@Expose({name: "name"})
	public readonly name?:string;

	@Expose({name: "ip"})
	public readonly ip?:string;

	@Expose({name: "port"})
	public readonly port?:number;
	}

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

class Configuration
	{
	//@Expose({name: "server"})
	//@Type(() => ServerConfiguration)
	//public readonly server?:ServerConfiguration;

	//@Expose({name: "devices"})
	//@Type(() => Array<Device>)
	//public readonly devices?:Array<Device>;

	@Expose({name: "wiz2"})
	public readonly led?:Device;

	public static parse(json:string):Configuration
		{
		return plainToInstance(Configuration, JSON.parse(json));
		}
	}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

export
	{
	Configuration
	};
