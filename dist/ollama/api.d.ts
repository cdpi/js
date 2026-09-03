import { type CancelableFetch } from "../fetch.js";
type Details = {
    parent_model: string;
    format: string;
    family: string;
    families: Array<string>;
    parameter_size: string;
    quantization_level: string;
    context_length: number;
    embedding_length: number;
};
type Model = {
    name: string;
    model: string;
    modified_at: string;
    size: number;
    digest: string;
    details: Details;
    capabilities: Array<string>;
};
type Models = {
    models: Array<Model>;
};
declare class API {
    protected readonly fetch: CancelableFetch;
    constructor();
    getModels(): Promise<any>;
    ask(model: string, prompt: string, timeout: number): Promise<any>;
    get(url: string, timeout: number): Promise<any>;
    post(url: string, body: any, timeout: number): Promise<any>;
}
export { type Details, type Model, type Models, API };
