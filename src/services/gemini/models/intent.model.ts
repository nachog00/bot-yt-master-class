// node --version # Should be >= 18
// npm install @google/generative-ai

import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_API_KEY, defaultGenerationConfig, safetySettings } from "../defaults";

const MODEL_NAME = "tunedModels/intent-recognition-paraninfo-rn2sxn9eg2y";

export async function runIntent(convo: string) {

    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
        model: MODEL_NAME, 
        generationConfig: { ...defaultGenerationConfig },
        safetySettings
    });

    const parts = [
        { text: `input: ${convo}` },
        { text: "output:" },
    ]

    const result = await model.generateContent({
        contents: [{ role: "user", parts }],
    });

    const response = result.response;
    console.log(response.text());
}
