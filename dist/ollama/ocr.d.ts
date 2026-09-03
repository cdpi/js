import { API } from "./api.js";
declare class OCR extends API {
    process(path: string): Promise<void>;
}
export { OCR };
