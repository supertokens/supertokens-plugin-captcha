import { ComponentOverrideMap } from "supertokens-auth-react/lib/build/recipe/emailpassword/types";
import { loadScript } from "../../utils";
import { useCallback, useEffect, useState } from "react";
import { SuperTokensPluginCaptchaConfig } from "../../types";

export const EmailPasswordSignInForm = (
  config: SuperTokensPluginCaptchaConfig
): ComponentOverrideMap["EmailPasswordSignInForm_Override"] => ({
  DefaultComponent,
  ...props
}) => {
  const [captchaLoaded, setCaptchaLoaded] = useState(false);
  console.log("overrides/EmailPasswordSignInForm");

  console.log(captchaLoaded);

  const loadCaptcha = useCallback(async () => {
    console.log("captcha loading");
    if (config.type === "reCAPTCHAv3") {
      try {
        await loadScript(
          `https://www.google.com/recaptcha/api.js?render=${
            config.type === "reCAPTCHAv3"
              ? config.reCAPTCHAv3?.siteKey
              : config.reCAPTCHAv2?.siteKey
          }`
        );
        setCaptchaLoaded(true);
        console.log("captcha loaded");
      } catch (e) {
        console.error(e);
      }
    } else if (config.type === "reCAPTCHAv2") {
      console.log(config.type, "captcha loading");
      // @ts-ignore
      window.onCaptchaLoad = () => {
        setCaptchaLoaded(true);
        console.log(config.type, "captcha callback loaded");
        // @ts-ignore
        window.grecaptcha.render("captcha-container", {
          sitekey: config.reCAPTCHAv2?.siteKey,
          callback: (...params: any[]) => {
            console.log("captcha render callback", params);
          },
        });
      };
      await loadScript(
        "https://www.google.com/recaptcha/api.js?onload=onCaptchaLoad&render=explicit",
        {
          async: true,
          defer: true,
          once: true,
        }
      );
      console.log(config.type, "captcha loaded");
    }
  }, []);

  useEffect(() => {
    loadCaptcha();
  }, []);

  return (
    <DefaultComponent
      {...props}
      footer={<div id="captcha-container"></div>}
      config={{
        ...props.config,
        override: {
          functions: (originalImplementation) => {
            return {
              ...originalImplementation,
              signIn: async (input) => {
                console.log(config.type, "signIn", input);
                return originalImplementation.signIn(input);
              },
            };
          },
        },
      }}
    />
  );
};
