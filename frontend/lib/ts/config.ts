import { SuperTokensPluginCaptchaConfig } from "./types";

let PluginConfig: SuperTokensPluginCaptchaConfig;
const SupportedCaptchaTypes = ["reCAPTCHAv3", "reCAPTCHAv2", "turnstile"];

export function setPluginConfig(config: SuperTokensPluginCaptchaConfig) {
  if (!SupportedCaptchaTypes.includes(config.type)) {
    throw new Error("Unsupported CAPTCHA type");
  }

  if (config.type === "reCAPTCHAv3" && !config.reCAPTCHAv3?.siteKey) {
    throw new Error("reCAPTCHAv3 site key is required");
  }
  if (config.type === "reCAPTCHAv2" && !config.reCAPTCHAv2?.siteKey) {
    throw new Error("reCAPTCHAv2 site key is required");
  }
  if (config.type === "turnstile" && !config.turnstile?.siteKey) {
    throw new Error("turnstile site key is required");
  }

  PluginConfig = config;
}

export function getPluginConfig() {
  if (!PluginConfig) {
    throw new Error("The plugin was not initialised");
  }
  return PluginConfig;
}
