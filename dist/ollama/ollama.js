//import { HTTPError } from "besso/util/error.js";
class API {
    model;
    constructor(model = "home") {
        this.model = model;
    }
    async getModels() {
        return this.get("http://localhost:11434/api/tags");
    }
    async invoke(prompt) {
        const body = {
            model: this.model,
            prompt,
            stream: false,
            format: "json"
        };
        //createCancelableFetch
        const response = await this.post(body);
        const json = JSON.parse(response.response);
        return json;
    }
    async post(body) {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        };
        const response = await fetch("http://localhost:11434/api/generate", options);
        if (!response.ok) {
            //throw new HTTPError(response.status, response.statusText);
        }
        const json = await response.json();
        return json;
    }
    async get(url) {
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        };
        const response = await fetch(url, options);
        if (!response.ok) {
            //throw new HTTPError(response.status, response.statusText);
        }
        const json = await response.json();
        return json;
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
export { API };
