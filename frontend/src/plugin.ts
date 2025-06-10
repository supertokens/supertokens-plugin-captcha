import { SuperTokensPlugin } from "supertokens-auth-react/lib/build/types";
import { PLUGIN_ID } from "./constants";
import { ComponentOverrides } from "./components";
import { captcha } from "./captcha";
import { SuperTokensPluginCaptchaConfig } from "./types";
import { setPluginConfig, validatePublicConfig, enableLogging } from "./config";

export const init = (
  config: SuperTokensPluginCaptchaConfig
): SuperTokensPlugin => {
  setPluginConfig(config);
  return {
    id: PLUGIN_ID,
    init: (config) => {
      if(config.enableDebugLogs) enableLogging();
      validatePublicConfig(config);
    },
    overrideMap: {
      emailpassword: {
        config: (config) => {
          return {
            ...config,
            preAPIHook: captcha.preAPIHook,
          };
        },
        components: {
          EmailPasswordSignInForm_Override: ComponentOverrides.EmailPasswordSignInForm(),
          EmailPasswordSignUpForm_Override: ComponentOverrides.EmailPasswordSignUpForm(),
        },
      },
      passwordless: {
        config: (config) => {
          return {
            ...config,
            preAPIHook: captcha.preAPIHook,
          };
        },
        components: {
          PasswordlessEmailForm_Override: ComponentOverrides.PasswordlessEmailForm(),
          PasswordlessPhoneForm_Override: ComponentOverrides.PasswordlessPhoneForm(),
          PasswordlessEmailOrPhoneForm_Override: ComponentOverrides.PasswordlessEmailOrPhoneForm(),
          PasswordlessUserInputCodeForm_Override: ComponentOverrides.PasswordlessUserInputCodeForm(),
        },
      },
    },
  };
};
