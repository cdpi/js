import { type Nullable } from "../util.js";
declare abstract class User {
    protected readonly api: API;
    protected readonly slug: string;
    constructor(api: API, slug: string);
}
declare class Organization extends User {
    getInformations(): Promise<any>;
    getRepositories(): Promise<any>;
}
declare class API {
    constructor();
    getOrganization(slug: string): Organization;
    api<T>(url: string, options?: Nullable<RequestInit>): Promise<T>;
    get<T>(url: string): Promise<T>;
}
export { API, Organization };
