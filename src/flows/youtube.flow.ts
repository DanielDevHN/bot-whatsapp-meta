import { addKeyword } from "@builderbot/bot";

export const youtubeFlow = addKeyword("abrir youtube")
  .addAnswer("Abriendo YouTube...", {
    buttons: [{ body: "Regresar al menú" }
    ],
  })
  .addAction(async (_, { flowDynamic }) => {
    await flowDynamic("Aquí está el enlace: https://www.youtube.com");
  });
