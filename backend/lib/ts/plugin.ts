import { SuperTokensPlugin } from "supertokens-node/types";
import { PLUGIN_ID, PLUGIN_SDK_VERSION, setPluginConfig } from "./config";
import { SuperTokensPluginCaptchaConfig } from "./types";
import { CaptchaValidators, SupportedCaptchaTypes } from "./captcha";

export const init = (
  config: SuperTokensPluginCaptchaConfig
): SuperTokensPlugin => {
  setPluginConfig(config);
  return {
    id: PLUGIN_ID,
    compatibleSDKVersions: [PLUGIN_SDK_VERSION],
    overrideMap: {
      emailpassword: {
        apis: (originalImplementation) => {
          if (!originalImplementation.signInPOST) {
            return originalImplementation;
          }
          return {
            ...originalImplementation,
            signInPOST: async (input) => {
              const body = await input.options.req.getJSONBody();
              const captcha = "captcha" in body ? body.captcha : null;
              const type = "captchaType" in body ? body.captchaType : null;

              if (
                config.shouldValidate &&
                !config.shouldValidate({
                  recipe: "emailpassword",
                  action: "signInPOST",
                  input,
                })
              ) {
                return originalImplementation.signInPOST!(input);
              }

              if (!captcha) {
                return {
                  status: "GENERAL_ERROR",
                  message: 'The "captcha" field is required',
                };
              }

              if (!type) {
                return {
                  status: "GENERAL_ERROR",
                  message: 'The "captchaType" field is required',
                };
              }

              if (type !== config.type) {
                return {
                  status: "GENERAL_ERROR",
                  message: `Invalid captcha type. Expected ${config.type} but got ${type}`,
                };
              }

              const validator = CaptchaValidators[config.type];
              if (!validator) {
                return {
                  status: "GENERAL_ERROR",
                  message: `Unsupported captcha type: ${
                    config.type
                  }. Must be one of ${SupportedCaptchaTypes.join(", ")}`,
                };
              }

              try {
                await validator(captcha);
                return originalImplementation.signInPOST!(input);
              } catch (e) {
                return {
                  status: "GENERAL_ERROR",
                  message: "CAPTCHA verification failed",
                };
              }
            },
          };
        },
      },
    },
  };
};
