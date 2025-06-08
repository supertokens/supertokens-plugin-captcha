"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const config_1 = require("./config");
const captcha_1 = require("./captcha");
const init = (config) => {
    (0, config_1.setPluginConfig)(config);
    return {
        id: config_1.PLUGIN_ID,
        compatibleSDKVersions: [config_1.PLUGIN_SDK_VERSION],
        overrideMap: {
            emailpassword: {
                apis: (originalImplementation) => {
                    if (!originalImplementation.signInPOST) {
                        return originalImplementation;
                    }
                    return {
                        ...originalImplementation,
                        signUpPOST: async (input) => {
                            if (config.shouldValidate) {
                                const validateResult = config.shouldValidate("signUpPOST", input);
                                let shouldValidate = validateResult;
                                if (validateResult instanceof Promise) {
                                    shouldValidate = await validateResult;
                                }
                                if (!shouldValidate) {
                                    return originalImplementation.signUpPOST(input);
                                }
                            }
                            const body = await input.options.req.getJSONBody();
                            try {
                                await (0, captcha_1.validateCaptcha)(body);
                            }
                            catch (e) {
                                return {
                                    status: "GENERAL_ERROR",
                                    message: "CAPTCHA verification failed",
                                };
                            }
                            return originalImplementation.signUpPOST(input);
                        },
                        passwordResetPOST: async (input) => {
                            if (config.shouldValidate) {
                                const validateResult = config.shouldValidate("passwordResetPOST", input);
                                let shouldValidate = validateResult;
                                if (validateResult instanceof Promise) {
                                    shouldValidate = await validateResult;
                                }
                                if (!shouldValidate) {
                                    return originalImplementation.passwordResetPOST(input);
                                }
                            }
                            const body = await input.options.req.getJSONBody();
                            try {
                                await (0, captcha_1.validateCaptcha)(body);
                            }
                            catch (e) {
                                return {
                                    status: "GENERAL_ERROR",
                                    message: "CAPTCHA verification failed",
                                };
                            }
                            return originalImplementation.passwordResetPOST(input);
                        },
                        generatePasswordResetTokenPOST: async (input) => {
                            if (config.shouldValidate) {
                                const validateResult = config.shouldValidate("generatePasswordResetTokenPOST", input);
                                let shouldValidate = validateResult;
                                if (validateResult instanceof Promise) {
                                    shouldValidate = await validateResult;
                                }
                                if (!shouldValidate) {
                                    return originalImplementation.generatePasswordResetTokenPOST(input);
                                }
                            }
                            const body = await input.options.req.getJSONBody();
                            try {
                                await (0, captcha_1.validateCaptcha)(body);
                            }
                            catch (e) {
                                return {
                                    status: "GENERAL_ERROR",
                                    message: "CAPTCHA verification failed",
                                };
                            }
                            return originalImplementation.generatePasswordResetTokenPOST(input);
                        },
                        signInPOST: async (input) => {
                            if (config.shouldValidate) {
                                const validateResult = config.shouldValidate("signInPOST", input);
                                let shouldValidate = validateResult;
                                if (validateResult instanceof Promise) {
                                    shouldValidate = await validateResult;
                                }
                                if (!shouldValidate) {
                                    return originalImplementation.signInPOST(input);
                                }
                            }
                            const body = await input.options.req.getJSONBody();
                            try {
                                await (0, captcha_1.validateCaptcha)(body);
                            }
                            catch (e) {
                                return {
                                    status: "GENERAL_ERROR",
                                    message: "CAPTCHA verification failed",
                                };
                            }
                            return originalImplementation.signInPOST(input);
                        },
                    };
                },
            },
            passwordless: {
                apis: (originalImplementation) => {
                    return {
                        ...originalImplementation,
                        consumeCodePOST: async (input) => {
                            if (config.shouldValidate) {
                                const validateResult = config.shouldValidate("consumeCodePOST", input);
                                let shouldValidate = validateResult;
                                if (validateResult instanceof Promise) {
                                    shouldValidate = await validateResult;
                                }
                                if (!shouldValidate) {
                                    return originalImplementation.consumeCodePOST(input);
                                }
                            }
                            const body = await input.options.req.getJSONBody();
                            try {
                                await (0, captcha_1.validateCaptcha)(body);
                            }
                            catch (e) {
                                return {
                                    status: "GENERAL_ERROR",
                                    message: "CAPTCHA verification failed",
                                };
                            }
                            return originalImplementation.consumeCodePOST(input);
                        },
                        createCodePOST: async (input) => {
                            if (config.shouldValidate) {
                                const validateResult = config.shouldValidate("createCodePOST", input);
                                let shouldValidate = validateResult;
                                if (validateResult instanceof Promise) {
                                    shouldValidate = await validateResult;
                                }
                                if (!shouldValidate) {
                                    return originalImplementation.createCodePOST(input);
                                }
                            }
                            const body = await input.options.req.getJSONBody();
                            try {
                                await (0, captcha_1.validateCaptcha)(body);
                            }
                            catch (e) {
                                return {
                                    status: "GENERAL_ERROR",
                                    message: "CAPTCHA verification failed",
                                };
                            }
                            return originalImplementation.createCodePOST(input);
                        },
                        resendCodePOST: async (input) => {
                            if (config.shouldValidate) {
                                const validateResult = config.shouldValidate("resendCodePOST", input);
                                let shouldValidate = validateResult;
                                if (validateResult instanceof Promise) {
                                    shouldValidate = await validateResult;
                                }
                                if (!shouldValidate) {
                                    return originalImplementation.resendCodePOST(input);
                                }
                            }
                            const body = await input.options.req.getJSONBody();
                            try {
                                await (0, captcha_1.validateCaptcha)(body);
                            }
                            catch (e) {
                                return {
                                    status: "GENERAL_ERROR",
                                    message: "CAPTCHA verification failed",
                                };
                            }
                            return originalImplementation.resendCodePOST(input);
                        },
                    };
                },
            },
            totp: {
                apis: (originalImplementation) => {
                    return {
                        ...originalImplementation,
                        verifyTOTPPOST: async (input) => {
                            if (config.shouldValidate) {
                                const validateResult = config.shouldValidate("verifyTOTPPOST", input);
                                let shouldValidate = validateResult;
                                if (validateResult instanceof Promise) {
                                    shouldValidate = await validateResult;
                                }
                                if (!shouldValidate) {
                                    return originalImplementation.verifyTOTPPOST(input);
                                }
                            }
                            const body = await input.options.req.getJSONBody();
                            try {
                                await (0, captcha_1.validateCaptcha)(body);
                            }
                            catch (e) {
                                return {
                                    status: "GENERAL_ERROR",
                                    message: "CAPTCHA verification failed",
                                };
                            }
                            return originalImplementation.verifyTOTPPOST(input);
                        },
                    };
                },
            },
        },
    };
};
exports.init = init;
