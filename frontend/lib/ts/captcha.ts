import { getPluginConfig } from "./config";
import { CaptchaProvider } from "./types";
import { CAPTCHA_ELEMENT_ID } from "./constants";

export class Captcha {
  private provider: CaptchaProvider;

  constructor() {
    const config = getPluginConfig();
    if (config.type === "turnstile") {
      this.provider = new TurnstileProvider();
    } else if (config.type === "reCAPTCHAv2") {
      this.provider = new ReCAPTCHAv2Provider();
    } else if (config.type === "reCAPTCHAv3") {
      this.provider = new ReCAPTCHAv3Provider();
    } else {
      throw new Error("Unsupported CAPTCHA type");
    }
  }

  load(recipe: "emailpassword", form: "signIn" | "signUp") {
    const config = getPluginConfig();
    let shoudRender = true;
    if (config.shouldRender) {
      shoudRender = config.shouldRender({
        recipe,
        form,
        action: "onLoad",
      });
    }
    this.provider.load(shoudRender);
  }

  getPreAPIHook = (
    recipe: "emailpassword",
    form: "signIn" | "signUp"
  ) => async (input: any) => {
    const config = getPluginConfig();

    let payload: Record<string, any> & { captcha: string | null };
    try {
      payload = JSON.parse(input.requestInit.body as string);
    } catch (e) {
      console.error(e);
      throw new Error("Error setting CAPTCHA token");
    }

    let shouldRender = false;
    if (config.shouldRender) {
      shouldRender = config.shouldRender({
        recipe,
        form,
        action: "onSubmit",
        input,
      });
    }

    if (shouldRender) {
      if (!this.provider.render) {
        throw new Error(
          "CAPTCHA provider does not support conditional rendering"
        );
      }

      if (
        !config.shouldRender ||
        (config.shouldRender && config.shouldRender(input))
      ) {
        payload.catpcha = await this.provider.render();
      }
    } else {
      payload.catpcha = await this.provider.getToken();
    }

    if (!payload.captcha) {
      throw new Error("Unable to set the CAPTCHA token");
    }

    payload.captchaType = config.type;
    input.requestInit.body = JSON.stringify(payload);
    return input;
  };
}

export class ReCAPTCHAv2Provider implements CaptchaProvider {
  private token: string | null = null;
  private isLoaded = false;

  setToken = (token: string) => {
    this.token = token;
  };

  private get captchaContainer() {
    const element = document.getElementById(CAPTCHA_ELEMENT_ID);
    if (!element) {
      throw new Error("Captcha container not found");
    }
    return element;
  }

  async load(render = true) {
    const config = getPluginConfig();
    const siteKey = config?.reCAPTCHAv2?.siteKey;
    if (!siteKey) {
      throw new Error("reCAPTCHAv2 site key is required");
    }
    if (this.isLoaded) return;

    const onLoad = () => {
      if (!render) {
        return;
      }
      this.render();
    };

    window.onLoadReCAPTCHAv2 = onLoad;
    await loadScript(
      `https://www.google.com/recaptcha/api.js?onload=onLoadReCAPTCHAv2&render=explicit`
    );
    this.isLoaded = true;
  }

  render() {
    const config = getPluginConfig();
    const siteKey = config?.reCAPTCHAv2?.siteKey;
    if (!siteKey) {
      throw new Error("reCAPTCHAv2 site key is required");
    }
    if (!window.grecaptcha) {
      throw new Error("ReCAPTCHAv2 is not loaded");
    }

    return new Promise<string>((resolve) => {
      window.grecaptcha.render(this.captchaContainer, {
        sitekey: siteKey,
        callback: (token) => {
          this.token = token;
          resolve(token);
        },
      });
    });
  }

  async getToken(): Promise<string> {
    if (!this.token) {
      throw new Error("No CAPTCHA token available");
    }
    return Promise.resolve(this.token);
  }
}

export class ReCAPTCHAv3Provider implements CaptchaProvider {
  private isLoaded = false;

  async load() {
    const config = getPluginConfig();
    const siteKey = config?.reCAPTCHAv3?.siteKey;
    if (!siteKey) {
      throw new Error("reCAPTCHAv3 site key is required");
    }
    if (this.isLoaded) return;

    await loadScript(
      `https://www.google.com/recaptcha/api.js?render=${siteKey}`
    );
    this.isLoaded = true;
  }

  async getToken(): Promise<string> {
    const config = getPluginConfig();
    const siteKey = config.reCAPTCHAv3?.siteKey;
    const actionName = config.reCAPTCHAv3?.actionName || "submit";
    if (!siteKey) {
      throw new Error("reCAPTCHAv3 site key is required");
    }
    if (!window.grecaptcha) {
      throw new Error("ReCAPTCHAv3 is not loaded");
    }
    const token: string = await new Promise((resolve, reject) => {
      window.grecaptcha.ready(function () {
        window.grecaptcha
          .execute(siteKey, { action: actionName })
          .then(resolve)
          .catch(reject);
      });
    });
    return token;
  }
}

export class TurnstileProvider implements CaptchaProvider {
  private token: string | null = null;
  private isLoaded = false;

  setToken = (token: string) => {
    this.token = token;
  };

  private get captchaContainer() {
    const element = document.getElementById(CAPTCHA_ELEMENT_ID);
    if (!element) {
      throw new Error("Captcha container not found");
    }
    return element;
  }

  async load(render = true) {
    const config = getPluginConfig();
    const siteKey = config?.reCAPTCHAv2?.siteKey;
    if (!siteKey) {
      throw new Error("reCAPTCHAv2 site key is required");
    }
    if (this.isLoaded) return;

    const onLoad = () => {
      if (!render) {
        return;
      }
      this.render();
    };

    window.onLoadTurnstile = onLoad;
    await loadScript(
      `https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onLoadTurnstile`
    );
    this.isLoaded = true;
  }

  render() {
    const config = getPluginConfig();
    const siteKey = config?.reCAPTCHAv2?.siteKey;
    if (!siteKey) {
      throw new Error("turnstile site key is required");
    }
    if (!window.turnstile) {
      throw new Error("Turnstile is not loaded");
    }

    return new Promise<string>((resolve) => {
      window.turnstile.render(this.captchaContainer, {
        sitekey: siteKey,
        callback: (token) => {
          this.token = token;
          resolve(token);
        },
      });
    });
  }

  async getToken(): Promise<string> {
    if (!this.token) {
      throw new Error("No CAPTCHA token available");
    }
    return Promise.resolve(this.token);
  }
}

const LoadedScripts: Record<string, boolean> = {};
async function loadScript(url: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    if (LoadedScripts[url]) return resolve();

    const script = document.createElement("script");
    script.type = "application/javascript";
    script.async = true;
    script.defer = true;
    script.src = url;

    script.onload = () => {
      LoadedScripts[url] = true;
      resolve();
    };
    script.onerror = (e) => {
      delete LoadedScripts[url];
      reject(e);
    };

    document.head.appendChild(script);
  });
}
