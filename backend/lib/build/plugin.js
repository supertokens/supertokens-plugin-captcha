"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const config_1 = require("./config");
const captcha_1 = require("./captcha");
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
                            const validator = captcha_1.CaptchaValidators[config.type];
                            if (!validator) {
                                return {
                                    status: "GENERAL_ERROR",
                                    message: `Unsupported captcha type: ${config.type}. Must be one of ${captcha_1.SupportedCaptchaTypes.join(", ")}`,
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
