import { useCallback, useState } from "react";
import { loadScript } from "../utils";
import { SuperTokensPluginCaptchaConfig } from "../types";

export const useCaptcha = ({
  targetRef,
  ...config
}: {
  targetRef: React.RefObject<HTMLDivElement>;
} & SuperTokensPluginCaptchaConfig) => {
  const [token, setToken] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  const updateToken = useCallback((token: string) => {
    setToken(token);
  }, []);

  const load_reCAPTCHAv2 = useCallback(async () => {
    const onLoad = () => {
      if (loaded) return;
      setLoaded(true);

      // todo: add typings
      // @ts-ignore
      window.grecaptcha.render(targetRef.current, {
        sitekey: config.reCAPTCHAv2?.siteKey,
        callback: updateToken,
      });
    };

    // @ts-ignore
    window.onLoad_reCAPTCHAv2 = onLoad;

    await loadScript(
      "http://www.google.com/recaptcha/api.js?onload=onLoad_reCAPTCHAv2&render=explicit",
      {
        async: true,
        defer: true,
      }
    );
  }, [config, targetRef, loaded]);

  const load_reCAPTCHAv3 = useCallback(async () => {
    await loadScript(
      `https://www.google.com/recaptcha/api.js?render=${config.reCAPTCHAv3?.siteKey}`,
      {
        async: true,
        defer: true,
      }
    );

    setLoaded(true);
  }, [config, targetRef, loaded]);

  const load_turnstile = useCallback(async () => {
    const onLoad = () => {
      if (loaded) return;
      setLoaded(true);

      // todo: add typings
      // @ts-ignore
      window.turnstile.render(targetRef?.current, {
        sitekey: config.turnstile?.siteKey,
        callback: updateToken,
      });
    };

    // @ts-ignore
    window.onLoad_turnstile = onLoad;

    await loadScript(
      "https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onLoad_turnstile",
      {
        async: true,
        defer: true,
      }
    );
  }, [config, targetRef, loaded]);

  const load = useCallback(async () => {
    if (config.type === "turnstile") return load_turnstile();
    if (config.type === "reCAPTCHAv2") return load_reCAPTCHAv2();
    if (config.type === "reCAPTCHAv3") return load_reCAPTCHAv3();

    throw new Error("Unsupported CAPTCHA");
  }, [config]);

  const preAPIHook = useCallback(
    async (input: any) => {
      if (!loaded) {
        throw new Error("CAPTCHA not loaded");
      }

      let payload: Record<string, any> & { captcha?: string };
      try {
        payload = JSON.parse(input.requestInit.body as string);
      } catch (e) {
        console.error(e);
        throw new Error("Error setting CAPTCHA token");
      }

      if (config.type === "turnstile") {
        payload.captcha = token || undefined;
      }
      if (config.type === "reCAPTCHAv2") {
        payload.captcha = token || undefined;
      }
      if (config.type === "reCAPTCHAv3") {
        const token: string = await new Promise((resolve, reject) => {
          // @ts-ignore
          window.grecaptcha.ready(function () {
            // @ts-ignore
            window.grecaptcha
              .execute(config.reCAPTCHAv3?.siteKey, { action: "submit" })
              .then(resolve)
              .catch(reject);
          });
        });
        payload.captcha = token;
      }

      if (!payload.captcha) {
        throw new Error("Error setting CAPTCHA token");
      }

      input.requestInit.body = JSON.stringify(payload);
      return input;
    },
    [token, loaded]
  );

  return {
    load,
    loaded,
    token,
    preAPIHook,
  };
};
