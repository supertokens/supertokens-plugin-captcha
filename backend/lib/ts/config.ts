import { SuperTokensPluginCaptchaConfig } from "./types";

import { CaptchaPluginError } from "./errors";

export const PLUGIN_ID = "supertokens-plugin-captcha";
export const PLUGIN_SDK_VERSION = "22.1.0-canary-plugins.0";

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
  if (!config.type) {
    throw new CaptchaPluginError(
      "PLUGIN_INITIALIZATION_ERROR",
      "The captcha type is required"
    );
  }

  if (
    config.type === "reCAPTCHAv3" &&
    config.captcha?.secretKey === undefined
  ) {
    throw new CaptchaPluginError(
      "PLUGIN_INITIALIZATION_ERROR",
      "reCAPTCHAv3 secretKey is required"
    );
  }

  if (
    config.type === "reCAPTCHAv2" &&
    config.captcha?.secretKey === undefined
  ) {
    throw new CaptchaPluginError(
      "PLUGIN_INITIALIZATION_ERROR",
      "reCAPTCHAv2 secretKey is required"
    );
  }

  if (config.type === "turnstile" && config.captcha?.secretKey === undefined) {
    throw new CaptchaPluginError(
      "PLUGIN_INITIALIZATION_ERROR",
      "turnstile secretKey is required"
    );
  }

  PluginConfig = config;
}
