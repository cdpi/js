import { HTTPError } from "../util.js";
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// https://www.six-group.com/fr/products-services/banking-services/interbank-clearing/online-services.html
const EndPoint = 'https://api.six-group.com/api/epcd/bankmaster/v3';
const ValidationErrors = {
    // 'OK': 'This IBAN is formally correct',
    'INVALID_COUNTRY_CODE': 'This IBAN has an invalid country code',
    'INVALID_LENGTH': 'This IBAN has an invalid length',
    'INVALID_FORMAT': 'This IBAN is formally incorrect according to ISO-13616-1',
    'INVALID_CHECKSUM': 'This IBAN has an invalid checksum',
    'INVALID_IID': 'This IBAN has an invalid CH or LI institution identification (IID)'
};
class ValidationError extends Error {
    code;
    constructor(code, message) {
        super(message);
        this.code = code;
        this.name = "ValidationError";
    }
}
class SixGroup {
    userAgent;
    constructor(userAgent) {
        this.userAgent = userAgent;
    }
    async get(url, accept = 'application/json') {
        const headers = new Headers();
        headers.append('Accept', accept);
        headers.append('User-Agent', this.userAgent);
        const options = {
            method: 'GET',
            headers
        };
        const response = await fetch(url, options);
        //console.debug(response.status, response.statusText);
        if (!response.ok) {
            throw new HTTPError(response.status, response.statusText);
        }
        return await response.json();
    }
}
class IBAN extends SixGroup {
    constructor(userAgent) {
        super(userAgent);
    }
    async validate(iban) {
        const headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('User-Agent', this.userAgent);
        const options = {
            method: 'GET',
            headers
        };
        const response = await fetch(`${EndPoint}/iban?iban=${iban}`, options);
        if (!response.ok) {
            throw new HTTPError(response.status, response.statusText);
        }
        const json = await response.json();
        const code = json.validationResult;
        if (code === 'OK') {
            return json.iid || null;
        }
        throw new ValidationError(code, ValidationErrors[code]);
    }
}
/*
public async getBankmaster(pretty:boolean = true):Promise<any>
    {
    return await this.get<any>(`${EndPoint}/bankmaster?prettyPrint=${pretty}`);
    }

public async getBankmasterCsv():Promise<string>
    {
    return await this.get<string>(`${EndPoint}/bankmaster_V3.csv`, 'text/csv');
    }
*/
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
export { ValidationError, SixGroup, IBAN };
