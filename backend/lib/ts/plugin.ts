import { SuperTokensPlugin } from "supertokens-node/types";
import { PLUGIN_ID, PLUGIN_SDK_VERSION } from "./config";
import { SuperTokensPluginCaptchaConfig } from "./types";

export const init = (
  config: SuperTokensPluginCaptchaConfig
): SuperTokensPlugin => {
  console.log(config);

  return {
    id: PLUGIN_ID,
    compatibleSDKVersions: PLUGIN_SDK_VERSION,
    routeHandlers: [],
    overrideMap: {},
  };
};
