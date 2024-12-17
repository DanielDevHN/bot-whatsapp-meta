import { createFlow } from "@builderbot/bot";
import { welcomeFlow } from "~/flows/welcome.flow";
import { youtubeFlow } from "./youtube.flow";
import { facebookFlow } from "./facebook.flow";
import { registrationFlow } from "./registration.flow";


export const flow = createFlow([welcomeFlow, youtubeFlow, facebookFlow, registrationFlow])