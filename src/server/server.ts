import "dotenv/config";
import { createBot, createFlow } from "@builderbot/bot";
import { adapterDB, connectToMongoDB } from "../database/mongo.db";
import { provider } from "../providers/meta.provider";
import { loadDynamicFlow } from "../flows/dynamic.flow";


const PORT = process.env.PORT ?? 3003

export const startServer = async () => {
    try {
        const db = await connectToMongoDB();
        const dynamicFlowArray = await loadDynamicFlow(db);
        const dynamicFlows = createFlow(dynamicFlowArray);
        const adapterProvider = provider;
    
        const { handleCtx, httpServer } = await createBot({
            flow: dynamicFlows,
            provider,
            database: adapterDB,
        })
    
        adapterProvider.server.post(
            '/v1/register',
            handleCtx(async (bot, req, res) => {
                const { number, name } = req.body
                await bot.dispatch('REGISTER_FLOW', { from: number, name })
                return res.end('trigger')
            })
        )
    
        adapterProvider.server.post(
            '/v1/flow',
            handleCtx(async (bot, req, res) => {
                try {
                    const { number } = req.body
                    await bot.dispatch('TEST', { from: number, name: 'bot' })
                    return res.end('ok')
    
                } catch (error) {
                    console.log(error)
                    return res.end('error')
                }
            })
        )
    
        httpServer(+PORT)
        console.log(`🚀 Bot is running on port ${PORT}`);
    } catch (error) {
        console.error("❌ Error starting the bot:", error); 
    }
}