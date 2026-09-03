
import * as dgram from "node:dgram";
import { Buffer } from "node:buffer";

import { TimeoutError } from "./util.js"

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

type SendAndReceiveOptions =
	{
	timeout:number;
	};

async function sendAndReceiveUDP4(message:string, ip:string, port:number, options:SendAndReceiveOptions = {timeout: 2000}):Promise<string>
	{
	return new Promise<string>((resolve, reject) =>
		{
		let timer:NodeJS.Timeout;
		let isClosed:boolean = false;

		const socket = dgram.createSocket("udp4");

		const closeSocket = () =>
			{
			if (isClosed)
				{
				return;
				}

			isClosed = true;

			clearTimeout(timer);

			socket.close();
			};

		const onTimeout = () =>
			{
			if (!isClosed)
				{
				closeSocket();

				//reject(new Error("Timeout"));
				reject(new TimeoutError("Timeout"));
				}
			};

		socket.on("error", (error:Error) =>
			{
			closeSocket();

			reject(error);
			});

		//socket.on("message", (message:Buffer<ArrayBuffer>) =>
		socket.on("message", (message:Buffer) =>
			{
			closeSocket();

			resolve(message.toString());
			});

		socket.connect(port, ip, () =>
			{
			socket.send(message, (error:Error|null) =>
				{
				if (error)
					{
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

export
	{
	type SendAndReceiveOptions,

	sendAndReceiveUDP4
	};
