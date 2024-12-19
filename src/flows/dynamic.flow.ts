import { Db } from "mongodb";
import { addKeyword } from "@builderbot/bot";
import { loadFlowsFromDB } from "~/services/flows.service";
import { Flow } from "~/types/flow.type";

export const loadDynamicFlow = async (db: Db) => {
  const dbFlows: Flow[] = await loadFlowsFromDB(db);

  const flows = dbFlows.map((flow, index) => {
    const lowerCaseTriggers: [string, ...string[]] = [
      flow.trigger_words[0].toLowerCase(),
      ...flow.trigger_words.slice(1).map((t) => t.toLowerCase()),
    ];

    console.log(`🧩 Triggers procesados para este flujo [${index}]:`, lowerCaseTriggers);

    const flowBuilder = addKeyword(lowerCaseTriggers);

    flow.responses.forEach((response, responseIndex) => {
      if (response.type === "text") {
        console.log(`📝 Respuesta de texto [${responseIndex}]:`, response.content);
        flowBuilder.addAnswer(response.content);
      } else if (response.type === "list") {
        console.log(`📋 Respuesta de lista [${responseIndex}]:`, response.content);
        flowBuilder.addAnswer(
          response.content.body,
          null,
          async (ctx, { provider }) => {
            console.log(`📤 Enviando lista al usuario:`, response.content);
            await provider.sendList(ctx.from, response.content);
          }
        );
      }
    });

    return flowBuilder;
  });

  console.log(
    "✅ Flujos convertidos para BuilderBot:",
    flows.map((flow, i) => `Flujo [${i}] -> ${JSON.stringify(flow?.toJson())}`)
  );

  return flows;
};
