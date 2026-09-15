import { HTTPError } from "../util.js";
async function sixGroupAPI() {
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('User-Agent', 'Mini projet personnel/0.0.1');
    const options = {
        method: 'GET',
        headers
    };
    const response = await fetch('https://api.six-group.com/api/epcd/bankmaster/v3/bankmaster.json', options);
    //console.debug(response.status, response.statusText);
    if (!response.ok) {
        throw new HTTPError(response.status, response.statusText);
    }
    return await response.json();
}
function toNumber(character) {
    const code = character.charCodeAt(0);
    if (code >= 65 && code <= 90) {
        return (code - 55).toString();
    }
    return character;
}
function check(iban) {
    iban = iban.replace(/\s+/g, "").toUpperCase();
    if (/^CH\d{2}[0-9A-Z]{17}$/.test(iban)) {
        iban = iban.substring(4) + iban.substring(0, 4);
        iban = iban.split("").map(toNumber).join("");
        try {
            return BigInt(iban) % 97n === 1n;
        }
        catch {
            return false;
        }
    }
    return false;
}
class SixGroup {
}
export { check, sixGroupAPI };
