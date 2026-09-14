
import { exec } from "node:child_process";

import { MqttClient as Client, IConnackPacket, ErrorWithReasonCode, connect } from "mqtt";

import { sendAndReceiveUDP4 } from "../network.js";

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MQTT
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

class Broker
	{
	public constructor()
		{
		}

	public async connect():Promise<void>
		{
		return new Promise<void>((resolve, reject) =>
			{
			//const url:string = `mqtt://${host}`;
			const url:string = "mqtt://localhost";

			const client:Client = connect(url);

			client.on("error", (error:Error|ErrorWithReasonCode) =>
				{
				client.end();

				reject(error.message);
				});

			client.on("connect", (packet:IConnackPacket) =>
				{
				resolve();
				});
			});
		}
	}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Piper
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

class Piper
	{
	private readonly piperCli:string;
	private readonly aplayCli:string;

	constructor(piper:string, voice:string, rate:string|number)
		{
		this.piperCli = `${piper} --model "${voice}" --output_raw 2>/dev/null`;
		this.aplayCli = `aplay -r ${rate} -f S16_LE -t raw -c 1 -q`;
		}

	public say(message:string):void
		{
		exec(`echo "${message}" | ${this.piperCli} | ${this.aplayCli}`);
		}
	}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WiZ2
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

type PilotMethod = "getPilot" | "setPilot";

type PilotMessage =
	{
	method:PilotMethod;
	params:{};
	};

type GetPilotMessage = PilotMessage &
	{
	method: "getPilot";
	};

type SetPilotMessage = PilotMessage &
	{
	method: "setPilot";
	params:
		{
		state:boolean;
		r:number;
		g:number;
		b:number;
		dimming?:number;
		}
	};

type Message = GetPilotMessage | SetPilotMessage;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

class Pilot
	{
	public constructor(private readonly ip:string, private readonly port:number)
		{
		}

	public async getPilot():Promise<any>
		{
		return await this.sendAndReceive({method: "getPilot", params: {}} as GetPilotMessage);
		}

	public async setPilot(red:number, green:number, blue:number, dimming?:number):Promise<any>
		{
		const message:SetPilotMessage =
			{
			method: "setPilot",
			params:
				{
				state: true,
				r: red,
				g: green,
				b: blue,
				dimming
				}
			};

		return await this.sendAndReceive(message);
		}

	private async sendAndReceive(message:Message):Promise<any>
		{
		try
			{
			const body:string = JSON.stringify(message);

			const response = await sendAndReceiveUDP4(body, this.ip, this.port);

			const json = JSON.parse(response);

			return Promise.resolve(json);
			}
		catch (error)
			{
			return Promise.reject(error);
			}
		}
	}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

export
	{
	// MQTT
	Broker,

	// Piper
	Piper,

	// Wiz2
	Pilot
	};
