
import { type CancelableFetch, createCancelableFetch } from "../fetch.js";

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Nanosecondes en sec ou mn
//const ns2mn = (ns:number):number => ns / 60_000_000_000;
//const ns2s = (ns:number):number => ns / 1_000_000_000;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

type Details =
	{
	parent_model:string;
	format:string;
	family:string;
	families:Array<string>;
	parameter_size:string;
	quantization_level:string;
	context_length:number;
	embedding_length:number;
	};

type Model =
	{
	name:string;
	model:string;
	modified_at:string;
	size:number;
	digest:string;
	details:Details;
	capabilities:Array<string>;
	};

type Models =
	{
	models:Array<Model>;
	};

class API
	{
	protected readonly fetch:CancelableFetch;

	public constructor()
		{
		this.fetch = createCancelableFetch();
		}

	public async getModels():Promise<any>
		{
		return this.get("http://localhost:11434/api/tags", 5000);
		}

	public async ask(model:string, prompt:string, timeout:number):Promise<any>
		{
		const body = {model, prompt, stream: false, format: "json"};

		const response:any = await this.post("http://localhost:11434/api/generate", body, timeout);

		if (response && response.response)
			{
			return JSON.parse(response.response);
			}

		return null;
		}

	public async get(url:string, timeout:number):Promise<any>
		{
		const options:RequestInit =
			{
			method: "GET",
			headers:
				{
				"Content-Type": "application/json"
				}
			};

		return await this.fetch(url, options, timeout);
		}

	public async post(url:string, body:any, timeout:number):Promise<any>
		{
		const options:RequestInit =
			{
			method: "POST",
			headers:
				{
				"Content-Type": "application/json"
				},
			body: JSON.stringify(body)
			};

		return await this.fetch(url, options, timeout);
		}
	}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

export
	{
	type Details,
	type Model,
	type Models,
	API
	};
