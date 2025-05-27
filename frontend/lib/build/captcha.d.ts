import { CaptchaProvider } from "./types";
export declare class Captcha {
    private provider;
    constructor();
    load(recipe: "emailpassword", form: "signIn" | "signUp"): void;
    getPreAPIHook: (recipe: "emailpassword", form: "signIn" | "signUp") => (input: any) => Promise<any>;
}
export declare class ReCAPTCHAv2Provider implements CaptchaProvider {
    private token;
    private isLoaded;
    setToken: (token: string) => void;
    private get captchaContainer();
    load(render?: boolean): Promise<void>;
    render(): Promise<string>;
    getToken(): Promise<string>;
}
export declare class ReCAPTCHAv3Provider implements CaptchaProvider {
    private isLoaded;
    load(): Promise<void>;
    getToken(): Promise<string>;
}
export declare class TurnstileProvider implements CaptchaProvider {
    private token;
    private isLoaded;
    setToken: (token: string) => void;
    private get captchaContainer();
    load(render?: boolean): Promise<void>;
    render(): Promise<string>;
    getToken(): Promise<string>;
}
