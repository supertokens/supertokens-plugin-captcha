"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CaptchaValidators = exports.SupportedCaptchaTypes = void 0;
exports.verifyReCaptchaV3 = verifyReCaptchaV3;
const config_1 = require("./config");
const errors_1 = require("./errors");
exports.SupportedCaptchaTypes = [
    "reCAPTCHAv3",
    "reCAPTCHAv2",
    "turnstile",
];
exports.CaptchaValidators = {
    reCAPTCHAv3: verifyReCaptchaV3,
    reCAPTCHAv2: verifyReCaptchaV2,
    turnstile: verifyTurnstile,
};
async function verifyReCaptchaV3(captcha) {
    var _a;
    const config = (0, config_1.getPluginConfig)();
    const reCAPTCHAv3Key = (_a = config.reCAPTCHAv3) === null || _a === void 0 ? void 0 : _a.secretKey;
    if (!reCAPTCHAv3Key) {
        throw new errors_1.CaptchaPluginError("PLUGIN_CONFIG_ERROR", "reCAPTCHAv3 secretKey is required");
    }
    const response = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${reCAPTCHAv3Key}&response=${captcha}`, { method: "POST" });
    if (!response.ok) {
        throw new errors_1.CaptchaPluginError("CAPTCHA_VERIFICATION_ERROR", "CAPTCHA verification failed");
    }
    const data = await response.json();
    if (!data.success) {
        throw new errors_1.CaptchaPluginError("CAPTCHA_VERIFICATION_ERROR", "CAPTCHA verification failed");
    }
}
async function verifyReCaptchaV2(captcha) {
    var _a;
    const config = (0, config_1.getPluginConfig)();
    const reCAPTCHAv2Key = (_a = config.reCAPTCHAv2) === null || _a === void 0 ? void 0 : _a.secretKey;
    if (!reCAPTCHAv2Key) {
        throw new errors_1.CaptchaPluginError("PLUGIN_CONFIG_ERROR", "reCAPTCHAv2 secretKey is required");
    }
    const response = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${reCAPTCHAv2Key}&response=${captcha}`, { method: "POST" });
    if (!response.ok) {
        throw new errors_1.CaptchaPluginError("CAPTCHA_VERIFICATION_ERROR", "CAPTCHA verification failed");
    }
    const data = await response.json();
    if (!data.success) {
        throw new errors_1.CaptchaPluginError("CAPTCHA_VERIFICATION_ERROR", "CAPTCHA verification failed");
    }
}
async function verifyTurnstile(captcha) {
    var _a, _b;
    const config = (0, config_1.getPluginConfig)();
    const turnstileKey = (_a = config.turnstile) === null || _a === void 0 ? void 0 : _a.secretKey;
    if (!turnstileKey) {
        throw new errors_1.CaptchaPluginError("PLUGIN_CONFIG_ERROR", "turnstile secretKey is required");
    }
    const response = await fetch(`https://challenges.cloudflare.com/turnstile/v0/siteverify`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            secret: (_b = config.turnstile) === null || _b === void 0 ? void 0 : _b.secretKey,
            response: captcha,
        }),
    });
    if (!response.ok) {
        throw new errors_1.CaptchaPluginError("CAPTCHA_VERIFICATION_ERROR", "CAPTCHA verification failed");
    }
    const data = await response.json();
    if (!data.success) {
        throw new errors_1.CaptchaPluginError("CAPTCHA_VERIFICATION_ERROR", "CAPTCHA verification failed");
    }
}
