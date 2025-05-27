"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const config_1 = require("./config");
const errors_1 = require("./errors");
const init = (config) => {
    (0, config_1.setPluginConfig)(config);
    return {
        id: config_1.PLUGIN_ID,
        compatibleSDKVersions: config_1.PLUGIN_SDK_VERSION,
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
                                    message: `Unsupported captcha type: ${config.type}. Must be one of ${SupportedCaptchaTypes.join(", ")}`,
                                };
                            }
                            try {
                                await validator(captcha);
                                return originalImplementation.signInPOST(input);
                            }
                            catch (e) {
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
exports.init = init;
const SupportedCaptchaTypes = ["reCAPTCHAv3", "reCAPTCHAv2", "turnstile"];
const CaptchaValidators = {
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
