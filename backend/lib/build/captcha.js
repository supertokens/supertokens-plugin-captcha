"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CaptchaValidators = exports.SupportedCaptchaTypes = void 0;
exports.validateCaptcha = validateCaptcha;
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
async function validateCaptcha(body) {
    const config = (0, config_1.getPluginConfig)();
    const captcha = "captcha" in body ? body.captcha : null;
    const type = "captchaType" in body ? body.captchaType : null;
    if (!captcha) {
        throw new errors_1.CaptchaPluginError("CAPTCHA_VERIFICATION_ERROR", "The 'captcha' field is required");
    }
    if (!type) {
        throw new errors_1.CaptchaPluginError("CAPTCHA_VERIFICATION_ERROR", "The 'captchaType' field is required");
    }
    if (type !== config.type) {
        throw new errors_1.CaptchaPluginError("CAPTCHA_VERIFICATION_ERROR", `Invalid captcha type. Expected ${config.type} but got ${type}`);
    }
    const validator = exports.CaptchaValidators[config.type];
    if (!validator) {
        throw new errors_1.CaptchaPluginError("CAPTCHA_VERIFICATION_ERROR", `Unsupported captcha type: ${config.type}. Must be one of ${exports.SupportedCaptchaTypes.join(", ")}`);
    }
    await validator(captcha);
}
async function verifyReCaptchaV3(captcha) {
    const config = (0, config_1.getPluginConfig)();
    const reCAPTCHAv3Key = config.captcha.secretKey;
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
    const config = (0, config_1.getPluginConfig)();
    const reCAPTCHAv2Key = config.captcha.secretKey;
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
    var _a;
    const config = (0, config_1.getPluginConfig)();
    const turnstileKey = (_a = config.captcha) === null || _a === void 0 ? void 0 : _a.secretKey;
    if (!turnstileKey) {
        throw new errors_1.CaptchaPluginError("PLUGIN_CONFIG_ERROR", "turnstile secretKey is required");
    }
    const response = await fetch(`https://challenges.cloudflare.com/turnstile/v0/siteverify`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            secret: turnstileKey,
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
