
import { MqttClient as Client, IConnackPacket, ErrorWithReasonCode, connect } from "mqtt";

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

	//public disconnect():void{}
	}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

export
	{
	Broker
	};
