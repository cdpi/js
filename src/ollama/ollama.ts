
//import { HTTPError } from "besso/util/error.js";

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
	public constructor(protected readonly model:string = "home")
		{
		}

	public async getModels():Promise<Models>
		{
		return this.get<Models>("http://localhost:11434/api/tags");
		}

	public async invoke(prompt:string):Promise<any>
		{
		const body:any =
			{
			model: this.model,
			prompt,
			stream: false,
			format: "json"
			};

		//createCancelableFetch

		const response:any = await this.post(body);

		const json:any = JSON.parse(response.response);

		return json;
		}

	private async post(body:any):Promise<any>
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

		const response:Response = await fetch("http://localhost:11434/api/generate", options);

		if (!response.ok)
			{
			//throw new HTTPError(response.status, response.statusText);
			}

		const json:any = await response.json();

		return json;
		}

	private async get<T>(url:string):Promise<T>
		{
		const options:RequestInit =
			{
			method: "GET",
			headers:
				{
				"Content-Type": "application/json"
				}
			};

		const response:Response = await fetch(url, options);

		if (!response.ok)
			{
			//throw new HTTPError(response.status, response.statusText);
			}

		const json:T = await response.json() as T;

		return json;
		}
	}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

export
	{
	type Models,
	type Model,
	type Details,

	API
	};
