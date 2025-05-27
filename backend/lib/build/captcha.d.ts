import { SuperTokensPluginCaptchaConfig } from "./types";
export declare const SupportedCaptchaTypes: string[];
export declare const CaptchaValidators: Record<SuperTokensPluginCaptchaConfig["type"], (captcha: string) => Promise<void>>;
export declare function verifyReCaptchaV3(captcha: string): Promise<void>;
