"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PLUGIN_SDK_VERSION = exports.PLUGIN_ID = void 0;
exports.getPluginConfig = getPluginConfig;
exports.setPluginConfig = setPluginConfig;
const errors_1 = require("./errors");
exports.PLUGIN_ID = "supertokens-plugin-captcha";
exports.PLUGIN_SDK_VERSION = "22.1.0-canary-plugins.0";
let PluginConfig;
function getPluginConfig() {
    if (!PluginConfig) {
        throw new errors_1.CaptchaPluginError("PLUGIN_INITIALIZATION_ERROR", "The plugin was not initialised");
    }
    return PluginConfig;
}
function setPluginConfig(config) {
    var _a, _b, _c;
    if (!config.type) {
        throw new errors_1.CaptchaPluginError("PLUGIN_INITIALIZATION_ERROR", "The captcha type is required");
    }
    if (config.type === "reCAPTCHAv3" &&
        ((_a = config.captcha) === null || _a === void 0 ? void 0 : _a.secretKey) === undefined) {
        throw new errors_1.CaptchaPluginError("PLUGIN_INITIALIZATION_ERROR", "reCAPTCHAv3 secretKey is required");
    }
    if (config.type === "reCAPTCHAv2" &&
        ((_b = config.captcha) === null || _b === void 0 ? void 0 : _b.secretKey) === undefined) {
        throw new errors_1.CaptchaPluginError("PLUGIN_INITIALIZATION_ERROR", "reCAPTCHAv2 secretKey is required");
    }
    if (config.type === "turnstile" && ((_c = config.captcha) === null || _c === void 0 ? void 0 : _c.secretKey) === undefined) {
        throw new errors_1.CaptchaPluginError("PLUGIN_INITIALIZATION_ERROR", "turnstile secretKey is required");
    }
    PluginConfig = config;
}
