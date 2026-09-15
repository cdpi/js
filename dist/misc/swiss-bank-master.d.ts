import { type Nullable } from "../util.js";
declare class ValidationError extends Error {
    readonly code: string;
    constructor(code: string, message?: string);
}
interface IbanResponse {
    validationResult: string;
    iid?: number;
}
declare abstract class SixGroup {
    readonly userAgent: string;
    constructor(userAgent: string);
    protected get<T>(url: string, accept?: string): Promise<T>;
}
declare class IBAN extends SixGroup {
    constructor(userAgent: string);
    validate(iban: string): Promise<Nullable<number>>;
}
export { ValidationError, IbanResponse, SixGroup, IBAN };
