import { Db } from "mongodb";
import { addKeyword } from "@builderbot/bot";
import { loadFlowsFromDB } from "../services/flows.service";
import { Flow } from "../types/flow.type";

export const loadDynamicFlow = async (db: Db) => {
  const dbFlows: Flow[] = await loadFlowsFromDB(db);
  
  const flows = dbFlows.map((flow, index) => {
    const lowerCaseTriggers: [string, ...string[]] = [
      flow.trigger_words[0].toLowerCase(),
      ...flow.trigger_words.slice(1).map((t) => t.toLowerCase()),
    ];
  
    // Inicializamos el flujo con los triggers
    let flowBuilder = addKeyword(lowerCaseTriggers);
  
    flow.responses.forEach((response, responseIndex) => {
      if (response.type === "text") {
        flowBuilder = flowBuilder.addAnswer(response.content);
      } else if (response.type === "list") {
  
        // Construir lista dinámicamente
        const list = {
          header: {
            type: "text",
            text: response.content.header || "Opciones disponibles",
          },
          body: {
            text: response.content.body || "Selecciona una opción:",
          },
          footer: {
            text: response.content.footer || "Estoy para ayudarte.",
          },
          action: {
            button: response.content.button || "Seleccionar",
            sections: response.content.sections.map((section: any) => ({
              title: section.title,
              rows: section.rows.map((row: any) => ({
                id: row.id,
                title: row.title,
                //description: row.description,
              })),
            })),
          },
        };
  
        // Agregar la lista al flujo
        flowBuilder = flowBuilder.addAnswer(
          response.content.body,
          null,
          async (ctx, { provider }) => {
            await provider.sendList(ctx.from, list);
          }
        );
  
        // Configurar acciones en base a la selección de la lista
        flowBuilder = flowBuilder.addAction(
          { capture: true },
          async (ctx, { flowDynamic }) => {
            const selectedOption = ctx.body;
  
            // Buscar la acción correspondiente en las filas de las secciones
            let matchedRow = null;
            response.content.sections.forEach((section: any) => {
              const match = section.rows.find((row: any) => row.id === selectedOption);
              if (match) matchedRow = match;
            });
  
            if (matchedRow) {
              await flowDynamic(`Seleccionaste: ${matchedRow.title}`);
              await flowDynamic(matchedRow.description);
            } else {
              await flowDynamic("No seleccionaste una opción válida. Inténtalo nuevamente.");
            }
          }
        );
      }
    });
  
    return flowBuilder;
  });
  

  return flows;
};
