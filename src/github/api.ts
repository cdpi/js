
import { type Nullable, HTTPError } from "../util.js";

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

const EndPoint = "https://api.github.com/";

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
interface Organization
	{
	id:string;
	name:string;
	description:string;
	url:string;
	created:string;
	}
*/

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

abstract class User
	{
	public constructor(protected readonly api:API, protected readonly slug:string)
		{
		}
	}

class Person extends User
	{
	}

class Organization extends User
	{
	public async getInformations():Promise<any>
		{
		return await this.api.get<any>(`${EndPoint}orgs/${this.slug}`);
		}

	public async getRepositories():Promise<any>
		{
		return await this.api.get<any>(`${EndPoint}orgs/${this.slug}/repos`);
		}
	}

class API
	{
	public constructor()
		{
		}

	public getOrganization(slug:string):Organization
		{
		return new Organization(this, slug);
		}

	public async api<T>(url:string, options:Nullable<RequestInit> = null):Promise<T>
		{
		const response = await fetch(url, options || {});

		//console.debug(response.status, response.statusText);

		if (!response.ok)
			{
			throw new HTTPError(response.status, response.statusText);
			}

		return await response.json() as T;
		}

	public async get<T>(url:string):Promise<T>
		{
		return await this.api<T>(url);
		}
	}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

export
	{
	API,
	Organization
	};
