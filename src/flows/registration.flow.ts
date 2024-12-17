import { addKeyword } from "@builderbot/bot";

export const registrationFlow = addKeyword("register")
  .addAnswer("¡Vamos a registrarte! Por favor, envíame tu nombre.")
  .addAction(
    { capture: true },
    async (ctx, { flowDynamic }) => {
      const name = ctx.body;
      await flowDynamic(`¡Gracias ${name}! Tu registro ha sido completado.`);
    }
  );
