import { SuperTokensPlugin } from "supertokens-auth-react/lib/build/types";
import { PLUGIN_ID } from "./constants";
import { EmailPasswordSignInForm } from "./components";
import { SuperTokensPluginCaptchaConfig } from "./types";
import { setPluginConfig } from "./config";

// Open questions:
// - Does shadow dom affect this
// - Do we want people to be able to customize when the captcha is shown
export const init = (
  config: SuperTokensPluginCaptchaConfig
): SuperTokensPlugin => {
  setPluginConfig(config);
  return {
    id: PLUGIN_ID,
    overrideMap: {
      emailpassword: {
        components: {
          EmailPasswordSignInForm_Override: EmailPasswordSignInForm(),
        },
      },
    },
  };
};
