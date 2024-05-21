import BotWhatsapp from '@bot-whatsapp/bot';
import { ChatCompletionMessageParam } from 'openai/resources';
// import { run, runDetermine } from 'src/services/openai';
import chatbotFlow from './chatbot.flow';
import { runChat, runIntent } from 'src/services/gemini';
import { Content } from '@google/generative-ai';

/**
 * Un flujo conversacion que es por defecto cunado no se contgiene palabras claves en otros flujos
 */
export default BotWhatsapp.addKeyword(BotWhatsapp.EVENTS.WELCOME)
    // .addAction(async (ctx, {state, gotoFlow}) => {
    //     try{
    //         const history = (state.getMyState()?.history ?? []) as Content[]
    //         // const ai = await runDetermine(history)
    //         const ai = await runIntent(history)

    //         console.log(`[INTENT]:`,ai.toLowerCase())

    //         if(ai.toLowerCase().includes('unknown')){
    //             return 
    //         }

    //         if(ai.toLowerCase().includes('chatbot')){
    //             return gotoFlow(chatbotFlow)
    //         }
            

    //         /**..... */

    //     }catch(err){
    //         console.log(`[ERROR]:`,err)
    //         return
    //     }
    // })
    .addAction(async (ctx, { flowDynamic, state }) => {
        try{

            // if()
            const newHistory = (state.getMyState()?.history ?? []) as Content[]
            
            const name = ctx?.pushName ?? ''
    
            console.log(`[HISTORY]:`,newHistory)
    
            // newHistory.push({
            //     role: 'user',
            //     parts: [{ text: ctx.body }]
            // })
    
            const largeResponse = await runChat(newHistory, ctx.body)

            // const chunks = largeResponse.split(/(?<!\d)\.\s+/g);
            // for (const chunk of chunks) {
            //     await flowDynamic(chunk)
            // }

            // newHistory.push({
            //     role: 'assistant',
            //     content: largeResponse
            // })
        
            await state.update({history: newHistory})

            flowDynamic(largeResponse)
    
        }catch(err){
            console.log(`[ERROR]:`,err)
        }
    })


