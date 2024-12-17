import "dotenv/config";
import { createBot } from '@builderbot/bot'
import { provider } from './providers/meta.provider'
import { database } from './database'
import { flow } from './flows/flows'
import { config } from "./config";

const PORT = process.env.PORT ?? 3009


const main = async () => {
    const adapterProvider = provider;

    const { handleCtx, httpServer } = await createBot({
        flow,
        provider,
        database,
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
}

main()
