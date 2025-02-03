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
                console.log(input);

                const body = await input.options.req.getJSONBody();
                console.log("body", body);

                const captcha = "captcha" in body ? body.captcha : null;
                if (!captcha) {
                  return {
                    status: "GENERAL_ERROR",
                    message: "CAPTCHA verification is required",
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
                } else {
                  return originalImplementation.signInPOST!(input);
                }

                console.log(result.data);

                if (result.data.success) {
                  return originalImplementation.signInPOST!(input);
                } else {
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
