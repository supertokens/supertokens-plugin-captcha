import {
  CaptchaProvider,
  isEmailPasswordCaptchaPreAndPostAPIHookAction,
  isPasswordlessCaptchaPreAndPostAPIHookAction,
  isTotpCaptchaPreAndPostAPIHookAction,
  ReCAPTCHAv2Config,
  ReCAPTCHAv3Config,
  SuperTokensPluginCaptchaConfig,
  TurnstileConfig,
} from "./types";

import { RecipePreAPIHookContext } from "supertokens-auth-react/lib/build/recipe/recipeModule/types";
import { PreAndPostAPIHookAction as EmailPasswordPreAndPostAPIHookAction } from "supertokens-auth-react/lib/build/recipe/emailpassword/types";
import { PreAndPostAPIHookAction as PasswordlessPreAndPostAPIHookAction } from "supertokens-auth-react/lib/build/recipe/passwordless/types";
import { PreAndPostAPIHookAction as TotpPreAndPostAPIHookAction } from "supertokens-auth-react/lib/build/recipe/totp/types";
import { CAPTCHA_ELEMENT_ID } from "./constants";
import { logDebugMessage } from "./config";

export class Captcha {
  private provider: CaptchaProvider | null = null;
  public state:
    | "uninitialised"
    | "initalised"
    | "loaded"
    | "rendered"
    | "disabled" = "uninitialised";
  private config: SuperTokensPluginCaptchaConfig | null = null;

  constructor() {}

  init(config: SuperTokensPluginCaptchaConfig) {
    logDebugMessage(`Initializing captcha`);
    this.config = config;
    if (config.type === "turnstile") {
      this.provider = new TurnstileProvider(config.captcha);
    } else if (config.type === "reCAPTCHAv2") {
      this.provider = new ReCAPTCHAv2Provider(config.captcha);
    } else if (config.type === "reCAPTCHAv3") {
      this.provider = new ReCAPTCHAv3Provider(config.captcha);
    } else {
      throw new Error("Unsupported CAPTCHA type");
    }
    this.state = "initalised";
  }

  get inputContainer(): HTMLDivElement {
    if (!this.config) {
      throw new Error("Captcha config is not initialised");
    }
    const containerId = this.config.inputContainerId || CAPTCHA_ELEMENT_ID;
    const element = document.getElementById(containerId);
    if (!element) {
      throw new Error("Captcha input container element not found");
    }
    return element as HTMLDivElement;
  }

  disable() {
    logDebugMessage("Disabling captcha");
    this.state = "disabled";
  }

  async load() {
    logDebugMessage(`Loading captcha`);
    if (this.state === "uninitialised") {
      throw new Error("Captcha has not been initialised");
    }
    if (!this.provider) {
      throw new Error("Captcha provider is not initialised");
    }
    if (!this.config) {
      throw new Error("Captcha config is not initialised");
    }

    if (this.state !== "initalised") {
      logDebugMessage(
        `Captcha already loaded or in wrong state - ${this.state}`
      );
      return;
    }

    await this.provider.load();
    this.state = "loaded";
  }

  render(onSubmit: (token: string) => void, onError: (error: Error) => void) {
    logDebugMessage(`Rendering captcha`);
    if (!this.provider) {
      throw new Error("Captcha provider is not initialised");
    }
    if (!this.provider.render) {
      logDebugMessage("Provider does not support rendering");
      return;
    }

    this.provider.render(this.inputContainer, onSubmit, onError);
    this.state = "rendered";
  }

  preAPIHook = async (
    context:
      | RecipePreAPIHookContext<EmailPasswordPreAndPostAPIHookAction>
      | RecipePreAPIHookContext<PasswordlessPreAndPostAPIHookAction>
      | RecipePreAPIHookContext<TotpPreAndPostAPIHookAction>
  ) => {
    const { action } = context;
    logDebugMessage(`PreAPIHook called`);

    if (this.state === "disabled") {
      logDebugMessage("Captcha disabled, skipping");
      return context;
    }

    if (
      !isEmailPasswordCaptchaPreAndPostAPIHookAction(action) &&
      !isPasswordlessCaptchaPreAndPostAPIHookAction(action) &&
      !isTotpCaptchaPreAndPostAPIHookAction(action)
    ) {
      logDebugMessage(`Action does not have captcha support - ${action}`);
      return context;
    }

    if (this.state !== "loaded" && this.state !== "rendered") {
      logDebugMessage(`Invalid captcha state for preAPIHook - ${this.state}`);
      throw new Error(`Invalid captcha state: ${this.state}`);
    }

    if (!this.provider) {
      throw new Error("Captcha provider is not initialised");
    }
    if (!this.config) {
      throw new Error("Captcha config is not initialised");
    }

    if (this.state !== "rendered" && this.provider.render) {
      logDebugMessage("Rendering captcha before token retrieval");
      await new Promise<string>((resolve, reject) => {
        this.render(resolve, reject);
      });
    }

    logDebugMessage("Getting captcha token");
    const token = await this.provider.getToken();
    let payload: Record<string, any> & {
      captcha: string | null;
      captchaType: "reCAPTCHAv3" | "reCAPTCHAv2" | "turnstile";
    };
    try {
      payload = JSON.parse(context.requestInit.body as string);
    } catch (e) {
      console.error(e);
      throw new Error("Error setting CAPTCHA token");
    }

    payload.captcha = token;
    payload.captchaType = this.config.type;
    context.requestInit.body = JSON.stringify(payload);
    return context;
  };
}

export class ReCAPTCHAv2Provider implements CaptchaProvider {
  private token: string | null = null;

  constructor(private config: ReCAPTCHAv2Config) {}

  setToken = (token: string) => {
    this.token = token;
  };

  async load() {
    if (!this.config.sitekey) {
      throw new Error("reCAPTCHAv2 site key is required");
    }

    return new Promise<void>(async (resolve, reject) => {
      window.onLoadReCAPTCHAv2 = () => {
        resolve();
      };
      try {
        await loadScript(
          `https://www.google.com/recaptcha/api.js?onload=onLoadReCAPTCHAv2&render=explicit`
        );
      } catch (error) {
        console.error("Failed to load reCAPTCHA v2:", error);
        reject("Failed to load reCAPTCHA v2 script");
      }
    });
  }

  render(
    containerElement: HTMLDivElement,
    onSubmit: (token: string) => void,
    onError: (error: Error) => void
  ) {
    if (!this.config.sitekey) {
      throw new Error("reCAPTCHAv2 site key is required");
    }
    if (!window.grecaptcha) {
      throw new Error("ReCAPTCHAv2 is not loaded");
    }

    try {
      window.grecaptcha.render(containerElement, {
        ...this.config,
        sitekey: this.config.sitekey,
        callback: (token) => {
          if (this.config.callback) {
            this.config.callback(token);
          }
          this.token = token;
          onSubmit(token);
        },
        "error-callback": () => {
          if (this.config["error-callback"]) {
            this.config["error-callback"]();
          }
          onError(new Error("reCAPTCHA v2 verification failed"));
        },
        "expired-callback": () => {
          this.token = null;
          onError(new Error("reCAPTCHA v2 token expired"));
        },
      });
    } catch (error) {
      throw new Error(`Failed to render reCAPTCHA v2: ${error}`);
    }
  }

  async getToken(): Promise<string> {
    if (!this.token) {
      throw new Error("No CAPTCHA token available");
    }
    return Promise.resolve(this.token);
  }
}

export class ReCAPTCHAv3Provider implements CaptchaProvider {
  constructor(private config: ReCAPTCHAv3Config) {}

  async load() {
    if (!this.config.sitekey) {
      throw new Error("reCAPTCHAv3 site key is required");
    }

    await loadScript(
      `https://www.google.com/recaptcha/api.js?render=${this.config.sitekey}`
    );
  }

  async getToken(): Promise<string> {
    const captchaConfig = this.config;
    if (!captchaConfig.sitekey) {
      throw new Error("reCAPTCHAv3 site key is required");
    }
    if (!window.grecaptcha) {
      throw new Error("ReCAPTCHAv3 is not loaded");
    }
    const actionName = captchaConfig.action || "submit";
    const token: string = await new Promise((resolve) => {
      window.grecaptcha.ready(function () {
        window.grecaptcha
          .execute(captchaConfig.sitekey, { action: actionName })
          .then(resolve);
      });
    });
    return token;
  }
}

export class TurnstileProvider implements CaptchaProvider {
  private token: string | null = null;

  constructor(private config: TurnstileConfig) {}

  setToken = (token: string) => {
    this.token = token;
  };

  async load() {
    if (!this.config.sitekey) {
      throw new Error("Turnstile site key is required");
    }

    return new Promise<void>(async (resolve, reject) => {
      window.onLoadTurnstile = () => {
        resolve();
      };
      try {
        await loadScript(
          `https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onLoadTurnstile`
        );
      } catch (error) {
        console.error("Failed to load Turnstile:", error);
        reject("Failed to load Turnstile script");
      }
    });
  }

  render(
    container: HTMLDivElement,
    onSubmit: (token: string) => void,
    onError: (error: Error) => void
  ) {
    if (!container) {
      throw new Error("Container element is required");
    }
    if (!this.config.sitekey) {
      throw new Error("Turnstile site key is required");
    }
    if (!window.turnstile) {
      throw new Error("Turnstile is not loaded");
    }

    const widgetId = window.turnstile.render(container, {
      sitekey: this.config.sitekey,
      callback: (token) => {
        this.token = token;
        if (this.config.callback) {
          this.config.callback(token);
        }
        onSubmit(token);
      },
      "expired-callback": (token: string) => {
        this.token = null;
        if (this.config["expired-callback"]) {
          this.config["expired-callback"](token);
        }
        onError(new Error("Turnstile token expired"));
      },
      "error-callback": (error: string) => {
        this.token = null;
        if (this.config["error-callback"]) {
          this.config["error-callback"](error);
        }
        onError(new Error(`Turnstile verification failed - ${error}`));
      },
      "timeout-callback": () => {
        this.token = null;
        if (this.config["timeout-callback"]) {
          this.config["timeout-callback"]();
        }
        onError(new Error("Turnstile verification timed out"));
      },
      "unsupported-callback": () => {
        this.token = null;
        if (this.config["unsupported-callback"]) {
          this.config["unsupported-callback"]();
        }
        onError(new Error("Turnstile is not supported by your browser"));
      },
    });
    if (widgetId === "undefined") {
      throw new Error("Turnstile widget rendering failed");
    }
  }

  async getToken(): Promise<string> {
    if (!this.token) {
      throw new Error("No CAPTCHA token available");
    }
    return Promise.resolve(this.token);
  }
}

const LoadedScripts: Record<string, "loading" | "loaded"> = {};
async function loadScript(url: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    logDebugMessage(`Loading script - ${url}`);
    if (LoadedScripts[url]) {
      logDebugMessage(`Script already loaded - ${url}`);
      return resolve();
    }
    LoadedScripts[url] = "loading";

    const script = document.createElement("script");
    script.type = "application/javascript";
    script.async = true;
    script.defer = true;
    script.src = url;

    const timeout = setTimeout(() => {
      if (LoadedScripts[url] === "loading") {
        logDebugMessage(`Script loading timeout - ${url}`);
        delete LoadedScripts[url];
        document.head.removeChild(script);
        reject(new Error(`Script loading timeout: ${url}`));
      }
    }, 30000);

    script.onload = () => {
      clearTimeout(timeout);
      LoadedScripts[url] = "loaded";
      logDebugMessage(`Script loaded successfully - ${url}`);
      resolve();
    };
    script.onerror = (e) => {
      clearTimeout(timeout);
      delete LoadedScripts[url];
      logDebugMessage(`Script loading error`);
      reject(e);
    };

    document.head.appendChild(script);
  });
}

export const captcha = new Captcha();
