
import { sendAndReceiveUDP4 } from "./network.js";

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

type GetPilotMethod = "getPilot";
type SetPilotMethod = "setPilot";

type Method = GetPilotMethod | SetPilotMethod;

type GetPilotMessage =
	{
	method:GetPilotMethod;
	params:
		{
		}
	};

type SetPilotMessage =
	{
	method:SetPilotMethod;
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
	type GetPilotMethod,
	type SetPilotMethod,
	type Method,
	type GetPilotMessage,
	type SetPilotMessage,
	type Message,

	Pilot
	};
