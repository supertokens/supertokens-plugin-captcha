export type SuperTokensPluginCaptchaConfig = {
    type: "reCAPTCHAv3" | "reCAPTCHAv2" | "turnstile";
    reCAPTCHAv3?: {
        secretKey: string;
    };
    reCAPTCHAv2?: {
        secretKey: string;
    };
    turnstile?: {
        secretKey: string;
    };
};
