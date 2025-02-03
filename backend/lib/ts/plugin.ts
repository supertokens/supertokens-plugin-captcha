import { SuperTokensPlugin } from "supertokens-node/types";
import { PLUGIN_ID, PLUGIN_SDK_VERSION } from "./config";
import { SuperTokensPluginCaptchaConfig } from "./types";
import axios from "axios";

export const init = (
  config: SuperTokensPluginCaptchaConfig
): SuperTokensPlugin => {
  console.log(config);

  return {
    id: PLUGIN_ID,
    compatibleSDKVersions: PLUGIN_SDK_VERSION,
    routeHandlers: [],
    overrideMap: {
      emailpassword: {
        apis: (originalImplementation) => {
          if (!originalImplementation.signInPOST) {
            return originalImplementation;
          } else {
            return {
              ...originalImplementation,
              signInPOST: async (input) => {
                const body = await input.options.req.getJSONBody();

                const captcha = "captcha" in body ? body.captcha : null;
                const type = "captchaType" in body ? body.captchaType : null;

                if (!captcha) {
                  return {
                    status: "GENERAL_ERROR",
                    message: "CAPTCHA verification is required",
                  };
                }

                if (type !== config.type) {
                  return {
                    status: "GENERAL_ERROR",
                    message: "CAPTCHA type not supported",
                  };
                }

                let result;
                if (config.type === "reCAPTCHAv3") {
                  result = await axios.post(
                    `https://www.google.com/recaptcha/api/siteverify?secret=${config.reCAPTCHAv3?.secretKey}&response=${captcha}`
                  );
                } else if (config.type === "reCAPTCHAv2") {
                  result = await axios.post(
                    `https://www.google.com/recaptcha/api/siteverify?secret=${config.reCAPTCHAv2?.secretKey}&response=${captcha}`
                  );
                } else if (config.type === "turnstile") {
                  result = await axios.post(
                    `https://challenges.cloudflare.com/turnstile/v0/siteverify`,
                    {
                      secret: config.turnstile?.secretKey,
                      response: captcha,
                    }
                  );
                } else {
                  return {
                    status: "GENERAL_ERROR",
                    message: "CAPTCHA type not supported",
                  };
                }

                if (result.data.success) {
                  return originalImplementation.signInPOST!(input);
                } else {
                  console.error(result.data);
                  return {
                    status: "GENERAL_ERROR",
                    message: "CAPTCHA verification failed",
                  };
                }
              },
            };
          }
        },
      },
    },
  };
};
