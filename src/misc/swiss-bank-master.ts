
import { type Nullable, HTTPError } from "../util.js";

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

// https://www.six-group.com/fr/products-services/banking-services/interbank-clearing/online-services.html

const EndPoint = 'https://api.six-group.com/api/epcd/bankmaster/v3';

const ValidationErrors:Record<string, string> =
	{
	// 'OK': 'This IBAN is formally correct',
	'INVALID_COUNTRY_CODE': 'This IBAN has an invalid country code',
	'INVALID_LENGTH': 'This IBAN has an invalid length',
	'INVALID_FORMAT': 'This IBAN is formally incorrect according to ISO-13616-1',
	'INVALID_CHECKSUM': 'This IBAN has an invalid checksum',
	'INVALID_IID': 'This IBAN has an invalid CH or LI institution identification (IID)'
	};

class ValidationError extends Error
	{
	public constructor(public readonly code:string, message?:string)
		{
		super(message);

		this.name = "ValidationError";
		}
	}

interface IbanResponse
	{
	validationResult:string;
	iid?:number;
	}

abstract class SixGroup
	{
	public constructor(public readonly userAgent:string)
		{
		}

	//return await this.get<any>(`${EndPoint}/bankmaster?prettyPrint=${pretty}`);
	//return await this.get<string>(`${EndPoint}/bankmaster_V3.csv`, 'text/csv');

	protected async get<T>(url:string, accept:string = 'application/json'):Promise<T>
		{
		const headers = new Headers();

		headers.append('Accept', accept);
		headers.append('User-Agent', this.userAgent);

		const options =
			{
			method: 'GET',
			headers
			};

		const response = await fetch(url, options);

		//console.debug(response.status, response.statusText);

		if (!response.ok)
			{
			throw new HTTPError(response.status, response.statusText);
			}

		return await response.json() as T;
		}
	}

class IBAN extends SixGroup
	{
	public constructor(userAgent:string)
		{
		super(userAgent);
		}

	public async validate(iban:string):Promise<Nullable<number>>
		{
		const headers = new Headers();

		headers.append('Accept', 'application/json');
		headers.append('User-Agent', this.userAgent);

		const options =
			{
			method: 'GET',
			headers
			};

		const response = await fetch(`${EndPoint}/iban?iban=${iban}`, options);

		if (!response.ok)
			{
			throw new HTTPError(response.status, response.statusText);
			}

		const json = await response.json() as IbanResponse;

		const code = json.validationResult;

		if (code === 'OK')
			{
			return json.iid || null;
			}

		throw new ValidationError(code, ValidationErrors[code]);
		}
	}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

export
	{
	ValidationError,

	IbanResponse,

	SixGroup,
	IBAN
	};
