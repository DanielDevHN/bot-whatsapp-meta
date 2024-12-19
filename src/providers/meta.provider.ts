import { MetaProvider as Provider } from "@builderbot/provider-meta";
import { createProvider } from "@builderbot/bot";
import { config } from "~/config";


export const provider = createProvider(Provider, {
    jwtToken: config.jwtToken,
    numberId: config.numberId,
    verifyToken: config.verifyToken,
    version: 'v21.0'
})

provider.on("message", (payload) => {
    console.log("📥 Mensaje recibido:", payload);
});