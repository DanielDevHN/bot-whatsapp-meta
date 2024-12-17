import { addKeyword } from "@builderbot/bot";

export const facebookFlow = addKeyword("abrir facebook")
  .addAnswer("Abriendo Facebook...", {
    buttons: [{ body: "Regresar al menú" }],
  })
  .addAction(async (_, { flowDynamic }) => {
    await flowDynamic("Aquí está el enlace: https://www.facebook.com");
  });
