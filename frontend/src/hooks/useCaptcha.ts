import { useSyncExternalStore } from "react";
import { Captcha, captcha } from "../captcha";
import { getPluginConfig, logDebugMessage } from "../config";

export function useCaptcha() {
  const captchaState = useSyncExternalStore(
    captchaStore.subscribe,
    captchaStore.getSnapshot,
    () => DefaultCaptchaState
  );

  return captchaState;
}

type CaptchaState = {
  state: Captcha["state"] | "loading" | "error" | "rendering";
  error: string | null;
  token: string | null;
};

const DefaultCaptchaState: CaptchaState = {
  state: "uninitialised",
  error: null,
  token: null,
};

class CaptchaStore {
  private state: CaptchaState;
  private listeners: Set<() => void>;
  private captcha: Captcha;

  constructor() {
    this.state = DefaultCaptchaState;
    this.captcha = captcha;
    this.listeners = new Set();
  }

  getSnapshot = () => {
    return this.state;
  };

  subscribe = (listener: () => void) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };

  init() {
    logDebugMessage(`CaptchaStore init called - ${this.state.state}`);
    const config = getPluginConfig();
    if (this.state.state !== "uninitialised") {
      logDebugMessage(`CaptchaStore already initialized - ${this.state.state}`);
      return;
    }
    try {
      this.captcha.init(config);
      this.state = { ...this.state, state: this.captcha.state };
      logDebugMessage(
        `CaptchaStore initialized successfully - ${this.state.state}`
      );
      this.notifyListeners();
    } catch (err) {
      logDebugMessage(`CaptchaStore init error - ${getErrorMessage(err)}`);
      this.state = {
        ...this.state,
        state: "error",
        error: getErrorMessage(err),
      };
      this.notifyListeners();
    }
  }

  disable() {
    logDebugMessage("CaptchaStore disable called");
    this.captcha.disable();
    this.state = { ...this.state, state: this.captcha.state };
    this.notifyListeners();
  }

  async load() {
    logDebugMessage(`CaptchaStore load called - ${this.state.state}`);
    if (
      this.state.state === "loading" ||
      this.state.state === "loaded" ||
      this.state.state === "rendered" ||
      this.state.state === "rendering"
    ) {
      logDebugMessage(
        `CaptchaStore load skipped - already in progress or done - ${this.state.state}`
      );
      return;
    }
    try {
      if (this.state.state === "uninitialised") {
        logDebugMessage("Initializing captcha from load");
        this.captcha.init(getPluginConfig());
        this.state = { ...this.state, state: this.captcha.state };
        this.notifyListeners();
      }
      logDebugMessage("Setting state to loading");
      this.state = { ...this.state, state: "loading" };
      this.notifyListeners();
      await this.captcha.load();
      this.state = { ...this.state, state: this.captcha.state };
      logDebugMessage(`CaptchaStore load completed - ${this.state.state}`);
      this.notifyListeners();
    } catch (err) {
      logDebugMessage(`CaptchaStore load error - ${getErrorMessage(err)}`);
      this.state = {
        ...this.state,
        state: "error",
        error: getErrorMessage(err),
      };
      this.notifyListeners();
    }
    return true;
  }

  async render() {
    logDebugMessage(`CaptchaStore render called - ${this.state.state}`);
    if (
      this.state.state === "rendering" ||
      this.state.state === "rendered" ||
      this.state.state === "loading"
    ) {
      logDebugMessage(`CaptchaStore render skipped - ${this.state.state}`);
      return;
    }
    try {
      logDebugMessage("Setting state to rendering");
      this.state = { ...this.state, state: "rendering" };
      this.notifyListeners();
      const onSubmit = (token: string) => {
        logDebugMessage(`Captcha token received`);
        this.state = { ...this.state, state: "rendered", error: null, token };
        this.notifyListeners();
      };
      const onError = (error: Error) => {
        logDebugMessage(`Captcha render error - ${getErrorMessage(error)}`);
        this.state = {
          ...this.state,
          state: "error",
          error: getErrorMessage(error),
        };
        this.notifyListeners();
      };
      this.captcha.render(onSubmit, onError);
      this.state = { ...this.state, state: this.captcha.state };
      logDebugMessage(`CaptchaStore render completed - ${this.state.state}`);
      this.notifyListeners();
    } catch (err) {
      logDebugMessage(`CaptchaStore render error - ${getErrorMessage(err)}`);
      this.state = {
        ...this.state,
        state: "error",
        error: getErrorMessage(err),
      };
      this.notifyListeners();
    }
  }

  private notifyListeners() {
    this.listeners.forEach((listener) => listener());
  }
}

export const captchaStore = new CaptchaStore();

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "string") {
    return error;
  }

  if (error && typeof error === "object" && "message" in error) {
    return String((error as { message: unknown }).message);
  }

  return String(error);
}
