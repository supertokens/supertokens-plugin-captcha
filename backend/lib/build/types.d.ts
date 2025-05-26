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
export type ReCaptchaV3Response = {
    success: boolean;
    "error-codes": string[];
    hostname: string;
    action: string;
    score: number;
    challenge_ts: string;
};
export type ReCaptchaV2Response = {
    success: boolean;
    action: string;
    "error-codes": string[];
    challenge_ts: string;
};
export type TurnstileResponse = {
    success: boolean;
    "error-codes": string[];
    hostname: string;
    challenge_ts: string;
};
