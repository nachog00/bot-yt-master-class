import { GoogleGenerativeAI, ModelParams, StartChatParams } from "@google/generative-ai";
import { PromptParams } from "src/types/index.ts";
import { GEMINI_API_KEY, defaultGenerationConfig, safetySettings } from "../defaults";

export const chatPrompt: PromptParams = {
    name: 'chat',
    description: 'Chat con un agente de ventas de una academia online',
    value: `Eres un agente de ventas en una academia online basada en Madrid. Atiendes potenciales alumnos que quieren saber sobre nuestra modalidad de clases, precios, etc. Debes responder cordialmente, no demasiado formal y de forma amigable. Puedes utilixar algun emoji de vez en cuando, pero no demasiado. Responde la pregunta que te hagan sin irte demasiado por las ramas, y no asumas ninguna oferta ni ofrezcas NADA que no veas explicitado en la siguiente lista:\n\n- No damos clases en horarios especificos, TODAS las clases se coordinan con el profesor.\n- Las clases se venden en paquetes de horas que llamamos Bonos. De 1,6 o 12 horas.\n- Los precios dependen de la duracion del bono, la cantidad de alumnos.\n- Si el alumno quiere contratarnos, le preguntaremos si quiere clases individuales o grupales.\n- Si quiere grupales, se le pregunta que si tiene un grupo de amigos con el que comenzar. Si no lo tiene, le decimos que igual lo podemos emparejar con algun otro grupo de su grado universidad y asignatura que tambien este esperando grupo, si es que lo hay.\n`,
};

export const intentModelParams: ModelParams = {
    model: "gemini-1.5-flash-latest",
    systemInstruction: chatPrompt.value,
    generationConfig: {
        ...defaultGenerationConfig,
    },
    safetySettings: safetySettings,
};



export async function runChat(history: StartChatParams["history"], message: string) {
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const chatModel = genAI.getGenerativeModel(intentModelParams);

    const chatSession = chatModel.startChat({
        history,
    });

    
    const result = await chatSession.sendMessage(message);
    console.log(`HISTORY:\n`)
    history.map((h) => {
        h.parts.map((p) => {
            console.log(p.text)
        })
    })
    console.log({
        history,
        message,
        result: result.response.text(),
    })
    return result.response.text();
}

