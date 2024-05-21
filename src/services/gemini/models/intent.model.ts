// node --version # Should be >= 18
// npm install @google/generative-ai

import { Content, GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_API_KEY, defaultGenerationConfig, safetySettings } from "../defaults";

const MODEL_NAME = "tunedModels/intent-recognition-paraninfo-rn2sxn9eg2y";

export async function runIntent(convo: Content[] ) {

    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
        model: MODEL_NAME, 
        generationConfig: { ...defaultGenerationConfig },
        safetySettings
    });

    const parsedConvo = convo.map((content) => {
        return content.parts.map((part) => part.text).join(" ");
    }).join("\n");

    console.log('[ParsedConvo]:', parsedConvo, '\n')

    const parts = [
        { text: `input: ${parsedConvo}` },
        { text: "output:" },
    ]

    const result = await model.generateContent({
        contents: [{ role: "user", parts }],
    });

    const response = result.response;
    console.log(response.text());
    return response.text();
}
