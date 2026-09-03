import { createCancelableFetch } from "../fetch.js";
class API {
    fetch;
    constructor() {
        this.fetch = createCancelableFetch();
    }
    async getModels() {
        return this.get("http://localhost:11434/api/tags", 5000);
    }
    async ask(model, prompt, timeout) {
        const body = { model, prompt, stream: false, format: "json" };
        const response = await this.post("http://localhost:11434/api/generate", body, timeout);
        if (response && response.response) {
            return JSON.parse(response.response);
        }
        return null;
    }
    async get(url, timeout) {
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        };
        return await this.fetch(url, options, timeout);
    }
    async post(url, body, timeout) {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        };
        return await this.fetch(url, options, timeout);
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
export { API };
