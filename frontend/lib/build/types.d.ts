import { RecipePreAPIHookContext } from "supertokens-auth-react/lib/build/recipe/recipeModule/types";
import { AllRecipeConfigs } from "supertokens-auth-react/lib/build/types";
import { PreAndPostAPIHookAction as EmailPasswordPreAndPostAPIHookAction } from "supertokens-auth-react/lib/build/recipe/emailpassword/types";
import { PreAndPostAPIHookAction as PasswordlessPreAndPostAPIHookAction } from "supertokens-auth-react/lib/build/recipe/passwordless/types";
import { PreAndPostAPIHookAction as TotpPreAndPostAPIHookAction } from "supertokens-auth-react/lib/build/recipe/totp/types";
declare global {
    interface Window {
        grecaptcha: ReCaptchaV2.ReCaptcha;
        turnstile: Turnstile.Turnstile;
        onLoadReCAPTCHAv2: () => void;
        onLoadTurnstile: () => void;
    }
}
export interface CaptchaProvider {
    load: (onLoad?: () => void) => Promise<void>;
    render?: (container: HTMLDivElement, onSubmit: (token: string) => void, onError: (error: Error) => void) => void;
    getToken: () => Promise<string>;
}
export type ReCAPTCHAv2Config = ReCaptchaV2.Parameters;
export type ReCAPTCHAv3Config = {
    /**
     * Your sitekey.
     */
    sitekey: string;
    /**
     * the name of the action. Actions may only contain alphanumeric characters and slashes, and must not be user-specific.
     */
    action?: string;
};
export type TurnstileConfig = Turnstile.RenderParameters;
type CaptchaConfig = {
    type: "reCAPTCHAv3";
    captcha: ReCAPTCHAv3Config;
} | {
    type: "reCAPTCHAv2";
    captcha: ReCAPTCHAv2Config;
} | {
    type: "turnstile";
    captcha: TurnstileConfig;
};
export type EmailPasswordCaptchaPreAndPostAPIHookActions = Extract<EmailPasswordPreAndPostAPIHookAction, "EMAIL_PASSWORD_SIGN_UP" | "EMAIL_PASSWORD_SIGN_IN" | "SUBMIT_NEW_PASSWORD">;
export declare function isEmailPasswordCaptchaPreAndPostAPIHookAction(action: string): action is EmailPasswordCaptchaPreAndPostAPIHookActions;
export type PasswordlessCaptchaPreAndPostAPIHookActions = Extract<PasswordlessPreAndPostAPIHookAction, "PASSWORDLESS_CONSUME_CODE" | "PASSWORDLESS_CREATE_CODE" | "PASSWORDLESS_RESEND_CODE">;
export declare function isPasswordlessCaptchaPreAndPostAPIHookAction(action: string): action is PasswordlessCaptchaPreAndPostAPIHookActions;
export type TotpCaptchaPreAndPostAPIHookActions = Extract<TotpPreAndPostAPIHookAction, "VERIFY_CODE">;
export declare function isTotpCaptchaPreAndPostAPIHookAction(action: string): action is TotpCaptchaPreAndPostAPIHookActions;
export type CaptchaRecipeName = Extract<keyof AllRecipeConfigs, "emailpassword" | "passwordless" | "totp">;
interface ShouldRender {
    (recipe: "emailpassword", action: EmailPasswordCaptchaPreAndPostAPIHookActions, renderPhase: "onLoad"): boolean | Promise<boolean>;
    (recipe: "emailpassword", action: EmailPasswordCaptchaPreAndPostAPIHookActions, renderPhase: "onSubmit", preAPIHookContext: RecipePreAPIHookContext<EmailPasswordCaptchaPreAndPostAPIHookActions>): boolean | Promise<boolean>;
    (recipe: "passwordless", action: PasswordlessCaptchaPreAndPostAPIHookActions, renderPhase: "onLoad"): boolean | Promise<boolean>;
    (recipe: "passwordless", action: PasswordlessCaptchaPreAndPostAPIHookActions, renderPhase: "onSubmit", preAPIHookContext: RecipePreAPIHookContext<PasswordlessCaptchaPreAndPostAPIHookActions>): boolean | Promise<boolean>;
    (recipe: "totp", action: TotpCaptchaPreAndPostAPIHookActions, renderPhase: "onLoad"): boolean | Promise<boolean>;
    (recipe: "totp", action: TotpCaptchaPreAndPostAPIHookActions, renderPhase: "onSubmit", preAPIHookContext: RecipePreAPIHookContext<TotpCaptchaPreAndPostAPIHookActions>): boolean | Promise<boolean>;
}
export type SuperTokensPluginCaptchaConfig = CaptchaConfig & {
    shouldRender?: ShouldRender;
    InputContainer?: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
    inputContainerId?: string;
};
export {};
