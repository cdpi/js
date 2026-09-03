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
    protected readonly model: string;
    constructor(model?: string);
    getModels(): Promise<Models>;
    invoke(prompt: string): Promise<any>;
    private post;
    private get;
}
export { type Models, type Model, type Details, API };
