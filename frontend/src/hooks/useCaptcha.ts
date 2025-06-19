import { useCallback, useMemo, useSyncExternalStore } from 'react';
import { Captcha, captcha } from '../captcha';
import { getPluginConfig, logDebugMessage } from '../config';
import { CAPTCHA_INPUT_CONTAINER_ID } from '../constants';

export function useCaptcha() {
  const captchaInputContainerId = useMemo(() => {
    const config = getPluginConfig();
    return config.inputContainerId || CAPTCHA_INPUT_CONTAINER_ID;
  }, []);

  const captchaState = useSyncExternalStore(
    captchaStore.subscribe,
    captchaStore.getSnapshot,
    () => DefaultCaptchaState
  );

  const loadAndRenderCaptcha = useCallback(async (onRender?: () => void) => {
    await captchaStore.load();
    await captchaStore.render();
  }, []);

  return {
    state: captchaState,
    load: captchaStore.load,
    render: captchaStore.render,
    loadAndRender: loadAndRenderCaptcha,
    containerId: captchaInputContainerId,
  };
}

type CaptchaState = {
  error: string | undefined;
  token: string | undefined;
  isLoading: boolean;
  isRendering: boolean;
};

const DefaultCaptchaState: CaptchaState = {
  error: undefined,
  token: undefined,
  isLoading: false,
  isRendering: false,
};

// Store used to connect the `Captcha` logic to a React UI component.
// It servers serveral purposes:
// - Wraps calls in try-catch blocks and saves the error states
// - Exposes a state property that can be referenced in the UI
// - Prevents multiple/redundant calls to the `Captcha` logic
class CaptchaStore {
  private listeners: Set<() => void>;
  public state: CaptchaState;
  public captcha: Captcha;

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

  async load() {
    if (this.state.isLoading || this.state.isRendering) {
      logDebugMessage(
        `CaptchaStore load skipped: isLoading=${this.state.isLoading}, isRendering=${this.state.isRendering}`
      );
      return;
    }

    try {
      if (this.captcha.state === 'uninitialised') {
        this.captcha.init(getPluginConfig());
      }
      this.state = { ...this.state, isLoading: true };
      this.notifyListeners();
      await this.captcha.load();
      this.state = { ...this.state, isLoading: false, error: undefined };
      this.notifyListeners();
    } catch (err) {
      logDebugMessage(`CaptchaStore load error - ${getErrorMessage(err)}`);
      this.state = {
        ...this.state,
        error: getErrorMessage(err),
      };
      this.notifyListeners();
    }
    return true;
  }

  async render() {
    if (this.state.isRendering || this.state.isLoading) {
      logDebugMessage(
        `CaptchaStore render skipped - isRendering=${this.state.isRendering}, isLoading=${this.state.isLoading}`
      );
      return;
    }

    try {
      this.state = { ...this.state, isRendering: true };
      this.notifyListeners();
      const onSubmit = (token: string) => {
        logDebugMessage(`Captcha token received`);
        this.state = {
          ...this.state,
          isRendering: false,
          error: undefined,
          token,
        };
        this.notifyListeners();
      };
      const onError = (error: Error) => {
        logDebugMessage(`Captcha render error - ${getErrorMessage(error)}`);
        this.state = {
          ...this.state,
          error: getErrorMessage(error),
        };
        this.notifyListeners();
      };
      this.captcha.render(onSubmit, onError);
    } catch (err) {
      logDebugMessage(`CaptchaStore render error - ${getErrorMessage(err)}`);
      this.state = {
        ...this.state,
        error: getErrorMessage(err),
      };
      this.notifyListeners();
    }
  }

  private notifyListeners() {
    this.listeners.forEach((listener) => listener());
  }
}

const captchaStore = new CaptchaStore();

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === 'string') {
    return error;
  }

  if (error && typeof error === 'object' && 'message' in error) {
    return String((error as { message: unknown }).message);
  }

  return String(error);
}
