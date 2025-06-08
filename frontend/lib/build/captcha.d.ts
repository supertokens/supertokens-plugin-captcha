import { CaptchaProvider, ReCAPTCHAv2Config, ReCAPTCHAv3Config, SuperTokensPluginCaptchaConfig, TurnstileConfig } from "./types";
import { RecipePreAPIHookContext } from "supertokens-auth-react/lib/build/recipe/recipeModule/types";
import { PreAndPostAPIHookAction as EmailPasswordPreAndPostAPIHookAction } from "supertokens-auth-react/lib/build/recipe/emailpassword/types";
import { PreAndPostAPIHookAction as PasswordlessPreAndPostAPIHookAction } from "supertokens-auth-react/lib/build/recipe/passwordless/types";
import { PreAndPostAPIHookAction as TotpPreAndPostAPIHookAction } from "supertokens-auth-react/lib/build/recipe/totp/types";
export declare class Captcha {
    private provider;
    state: "uninitialised" | "initalised" | "loaded" | "rendered" | "disabled";
    private config;
    constructor();
    init(config: SuperTokensPluginCaptchaConfig): void;
    get inputContainer(): HTMLDivElement;
    disable(): void;
    load(): Promise<void>;
    render(onSubmit: (token: string) => void, onError: (error: Error) => void): void;
    preAPIHook: (context: RecipePreAPIHookContext<EmailPasswordPreAndPostAPIHookAction> | RecipePreAPIHookContext<PasswordlessPreAndPostAPIHookAction> | RecipePreAPIHookContext<TotpPreAndPostAPIHookAction>) => Promise<RecipePreAPIHookContext<EmailPasswordPreAndPostAPIHookAction> | RecipePreAPIHookContext<PasswordlessPreAndPostAPIHookAction> | RecipePreAPIHookContext<TotpPreAndPostAPIHookAction>>;
}
export declare class ReCAPTCHAv2Provider implements CaptchaProvider {
    private config;
    private token;
    constructor(config: ReCAPTCHAv2Config);
    setToken: (token: string) => void;
    load(): Promise<void>;
    render(containerElement: HTMLDivElement, onSubmit: (token: string) => void, onError: (error: Error) => void): void;
    getToken(): Promise<string>;
}
export declare class ReCAPTCHAv3Provider implements CaptchaProvider {
    private config;
    constructor(config: ReCAPTCHAv3Config);
    load(): Promise<void>;
    getToken(): Promise<string>;
}
export declare class TurnstileProvider implements CaptchaProvider {
    private config;
    private token;
    constructor(config: TurnstileConfig);
    setToken: (token: string) => void;
    load(): Promise<void>;
    render(container: HTMLDivElement, onSubmit: (token: string) => void, onError: (error: Error) => void): void;
    getToken(): Promise<string>;
}
export declare const captcha: Captcha;
