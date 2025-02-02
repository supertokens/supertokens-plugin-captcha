export type SuperTokensPluginCaptchaConfig = {
    type: "reCAPTCHAv3" | "reCAPTCHAv2";
    reCAPTCHAv3?: {
        secretKey: string;
    };
    reCAPTCHAv2?: {};
};
