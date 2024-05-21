import { ModelParams } from "@google/generative-ai";

export type PromptParams = {
    name: string;
    description: string;
    value: ModelParams['systemInstruction'];
};
