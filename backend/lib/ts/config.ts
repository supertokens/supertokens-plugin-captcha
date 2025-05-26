import { SuperTokensPluginCaptchaConfig } from "./types";
import { logDebugMessage } from "supertokens-node/lib/build/logger";

import { CaptchaPluginError } from "./errors";

export const PLUGIN_ID = "supertokens-plugin-captcha";
export const PLUGIN_SDK_VERSION = "21.1.0";

let PluginConfig: SuperTokensPluginCaptchaConfig;

export function getPluginConfig() {
  if (!PluginConfig) {
    throw new CaptchaPluginError(
      "PLUGIN_INITIALIZATION_ERROR",
      "The plugin was not initialised"
    );
  }

  return PluginConfig;
}

export function setPluginConfig(config: SuperTokensPluginCaptchaConfig) {
  logDebugMessage("Validating plugin config");

  if (!config.type) {
    throw new CaptchaPluginError(
      "PLUGIN_INITIALIZATION_ERROR",
      "The captcha type is required"
    );
  }

  if (
    config.type === "reCAPTCHAv3" &&
    config.reCAPTCHAv3?.secretKey === undefined
  ) {
    throw new CaptchaPluginError(
      "PLUGIN_INITIALIZATION_ERROR",
      "reCAPTCHAv3 secretKey is required"
    );
  }

  if (
    config.type === "reCAPTCHAv2" &&
    config.reCAPTCHAv2?.secretKey === undefined
  ) {
    throw new CaptchaPluginError(
      "PLUGIN_INITIALIZATION_ERROR",
      "reCAPTCHAv2 secretKey is required"
    );
  }

  if (
    config.type === "turnstile" &&
    config.turnstile?.secretKey === undefined
  ) {
    throw new CaptchaPluginError(
      "PLUGIN_INITIALIZATION_ERROR",
      "turnstile secretKey is required"
    );
  }

  PluginConfig = config;
}
