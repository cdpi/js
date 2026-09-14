import { HTTPError } from "../util.js";
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
class User {
    api;
    slug;
    constructor(api, slug) {
        this.api = api;
        this.slug = slug;
    }
}
class Person extends User {
}
class Organization extends User {
    async getInformations() {
        return await this.api.get(`${EndPoint}orgs/${this.slug}`);
    }
    async getRepositories() {
        return await this.api.get(`${EndPoint}orgs/${this.slug}/repos`);
    }
}
class API {
    constructor() {
    }
    getOrganization(slug) {
        return new Organization(this, slug);
    }
    async api(url, options = null) {
        const response = await fetch(url, options || {});
        //console.debug(response.status, response.statusText);
        if (!response.ok) {
            throw new HTTPError(response.status, response.statusText);
        }
        return await response.json();
    }
    async get(url) {
        return await this.api(url);
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
export { API, Organization };
