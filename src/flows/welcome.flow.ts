import { addKeyword } from "@builderbot/bot";
import { youtubeFlow } from "./youtube.flow";
import { facebookFlow } from "./facebook.flow";
import { registrationFlow } from "./registration.flow";


export const welcomeFlow = addKeyword(["hola", "hello", "buenos días"])
  .addAnswer("¡Hola! ¿En qué puedo ayudarte?", null, async (ctx, { provider }) => {
    // Lista interactiva
    const list = {
      header: {
        type: "text",
        text: "🌟 Opciones",
      },
      body: {
        text: "Selecciona una opcion:",
      },
      footer: {
        text: "Estoy para ayudarte.",
      },
      action: {
        button: "Seleccionar",
        sections: [
          {
            title: "Redes Sociales",
            rows: [
              {
                id: "open_youtube",
                title: "Open YouTube",
                description: "Visit YouTube now",
              },
              {
                id: "open_facebook",
                title: "Open Facebook",
                description: "Visit Facebook now",
              },
            ],
          },
          {
            title: "Acciones",
            rows: [
              {
                id: "register",
                title: "Register",
                description: "Start the registration process",
              },
              {
                id: "help",
                title: "Help",
                description: "Request assistance from an agent",
              },
            ],
          },
        ],
      },
    };

    // Enviar la lista al usuario
    await provider.sendList(ctx.from, list);
  })
  .addAction(
    { capture: true },
    async (ctx, { flowDynamic }) => {
      const selectedOption = ctx.body;

      switch (selectedOption) {
        case "open_youtube":
          await flowDynamic("Redirecting to YouTube: https://www.youtube.com");
          return youtubeFlow;
        case "open_facebook":
          await flowDynamic("Redirecting to Facebook: https://www.facebook.com");
          return facebookFlow;
        case "register":
          await flowDynamic("Redirecting to registration process.");
          return registrationFlow;
        case "help":
          await flowDynamic("An agent will contact you shortly for assistance.");
          break;
        default:
          await flowDynamic("Invalid option. Please select a valid option from the list.");
      }
    }
  );


// Ejemplo de como enviar un mensaje con botones
/* .addAnswer("Aqui tienes algunas opciones para empezar: ", {
  buttons: [
    {body: "Abrir YouTube"},
    {body: "Abrir Facebook"},
    {body: "Registrarme"}
  ]
})
.addAction(
  {capture: true},
  async (ctx, { flowDynamic }) => {
    const userInput = ctx.body.toLowerCase();

    if (userInput === "abrir youtube") {
      await flowDynamic("");
      return youtubeFlow;
    } else if (userInput === "abrir facebook") {
      await flowDynamic("");
      return facebookFlow;
    } else if (userInput === "registrarme") {
      await flowDynamic("");
      return facebookFlow;
    } else {
      await flowDynamic("Ops! No entiendo lo que quieres decir. ¿Podrías intentar de nuevo?");
      return 
    }

  }
) */
