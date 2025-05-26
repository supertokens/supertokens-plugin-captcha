import { getPluginConfig } from "./config";

export class Captcha {
  private isLoaded = false;
  private token: string | null = null;
  private domElement: HTMLElement | null = null;

  constructor() {}

  load() {
    this.domElement = document.getElementById("captcha-container");
    if (!this.domElement) {
      throw new Error("Captcha container not found");
    }
    const config = getPluginConfig();

    if (config.type === "turnstile") return this.loadTurnstile();
    if (config.type === "reCAPTCHAv2") return this.loadReCAPTCHAv2();
    if (config.type === "reCAPTCHAv3") return this.loadReCAPTCHAv3();

    throw new Error("Unsupported CAPTCHA type");
  }

  preAPIHook = async (input: any) => {
    const config = getPluginConfig();
    if (!this.isLoaded) {
      throw new Error("CAPTCHA not loaded");
    }

    let payload: Record<string, any> & { captcha: string | null };
    try {
      payload = JSON.parse(input.requestInit.body as string);
    } catch (e) {
      console.error(e);
      throw new Error("Error setting CAPTCHA token");
    }

    if (config.type === "turnstile") {
      payload.catpcha = this.getTurnstileToken();
    } else if (config.type === "reCAPTCHAv2") {
      payload.catpcha = this.getReCAPTCHAv2Token();
    } else if (config.type === "reCAPTCHAv3") {
      payload.catpcha = await this.getReCAPTCHAv3Token();
    } else {
      throw new Error("Unsupported CAPTCHA type");
    }

    if (!payload.captcha) {
      throw new Error("Error setting CAPTCHA token");
    }

    payload.captchaType = config.type;
    input.requestInit.body = JSON.stringify(payload);
    return input;
  };

  setToken = (token: string) => {
    this.token = token;
  };

  private loadReCAPTCHAv2 = async () => {
    const config = getPluginConfig();
    const siteKey = config?.reCAPTCHAv2?.siteKey;
    if (!siteKey) {
      throw new Error("reCAPTCHAv2 site key is required");
    }
    const onLoad = () => {
      if (this.isLoaded) return;
      if (!this.domElement) {
        throw new Error("Captcha container not found");
      }
      window.grecaptcha.render(this.domElement, {
        sitekey: siteKey,
        callback: this.setToken,
      });
      this.isLoaded = true;
    };

    window.onLoadReCAPTCHAv2 = onLoad;
    await loadScript(
      `https://www.google.com/recaptcha/api.js?onload=onLoadReCAPTCHAv2&render=explicit`
    );
  };

  private loadReCAPTCHAv3 = async () => {
    if (this.isLoaded) return;
    const config = getPluginConfig();
    const siteKey = config?.reCAPTCHAv3?.siteKey;
    if (!siteKey) {
      throw new Error("reCAPTCHAv3 site key is required");
    }

    await loadScript(
      `https://www.google.com/recaptcha/api.js?render=${siteKey}`
    );
    this.isLoaded = true;
  };

  private loadTurnstile = async () => {
    const config = getPluginConfig();
    const siteKey = config?.turnstile?.siteKey;
    const onLoad = () => {
      if (!siteKey) {
        throw new Error("turnstile site key is required");
      }
      if (this.isLoaded) return;
      if (!this.domElement) {
        throw new Error("Captcha container not found");
      }
      window.turnstile.render(this.domElement, {
        sitekey: siteKey,
        callback: this.setToken,
      });
    };

    window.onLoadTurnstile = onLoad;
    await loadScript(
      `https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onLoadTurnstile`
    );
  };

  private getReCAPTCHAv2Token() {
    return this.token;
  }

  private getTurnstileToken() {
    return this.token;
  }

  private async getReCAPTCHAv3Token() {
    const config = getPluginConfig();
    const siteKey = config.reCAPTCHAv3?.siteKey;
    const actionName = config.reCAPTCHAv3?.actionName || "submit";
    if (!siteKey) {
      throw new Error("reCAPTCHAv3 site key is required");
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
