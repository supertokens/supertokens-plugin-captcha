export type SuperTokensPluginCaptchaConfig = {
  type: "reCAPTCHAv3" | "reCAPTCHAv2" | "turnstile";
  reCAPTCHAv3?: {
    siteKey: string;
    actionName?: string;
  };
  reCAPTCHAv2?: {
    siteKey: string;
  };
  turnstile?: {
    siteKey: string;
  };
  // By default the captcha is rendered on all the forms, during the initial load phase
  // Use this property to specify when to render the captcha
  shouldRender?: (
    payload:
      | {
          recipe: "emailpassword";
          form: "signIn" | "signUp";
          action: "onLoad";
        }
      | {
          recipe: "emailpassword";
          form: "signIn" | "signUp";
          action: "onSubmit";
          // TODO: Add the actual preAPIHook types
          input: any;
        }
  ) => boolean;
};

declare global {
  interface Window {
    grecaptcha: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
        }
      ) => void;
      ready: (callback: () => void) => void;
      execute: (
        siteKey: string,
        options: { action: string }
      ) => Promise<string>;
    };
    turnstile: {
      render: (
        container: HTMLElement | null,
        options: {
          sitekey: string;
          callback: (token: string) => void;
        }
      ) => void;
    };
    onLoadReCAPTCHAv2: () => void;
    onLoadTurnstile: () => void;
  }
}

export interface CaptchaProvider {
  load: (render?: boolean) => Promise<void>;
  render?: () => Promise<string>;
  getToken: () => Promise<string>;
}
