import { API } from "./api.js";
import { readAsBase64 } from "../io.js";
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
const MODEL = "qwen2.5vl:7b";
//const PROMPT = "Fais l'OCR complet de cette image en français.";
const PROMPT = "Fais l'OCR complet de cette image en français. Utilise ’ comme apostrophe.";
class OCR extends API {
    async process(path) {
        const body = {
            model: MODEL,
            prompt: PROMPT,
            stream: false,
            images: [readAsBase64(path)],
            options: {
                num_ctx: 16384,
                num_predict: 8192
            }
        };
        const result = await this.post("http://localhost:11434/api/generate", body, 300_000); // 5mn
        console.log(result.response);
        console.log(result.done);
        console.log(result.done_reason);
        //console.log(result.total_duration);
        //console.log(ns2mn(result.total_duration));
        //console.log(ns2s(result.total_duration).toFixed(3));
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
export { OCR };
