export type SuperTokensPluginCaptchaConfig = {
    type: "reCAPTCHAv3" | "reCAPTCHAv2" | "turnstile";
    reCAPTCHAv3?: {
        siteKey: string;
    };
    reCAPTCHAv2?: {
        siteKey: string;
    };
    turnstile?: {
        siteKey: string;
    };
};
