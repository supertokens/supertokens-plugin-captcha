import { ComponentOverrideMap } from "supertokens-auth-react/lib/build/recipe/emailpassword/types";
import { loadScript } from "../../utils";
import { useCallback, useEffect, useRef, useState } from "react";
import { SuperTokensPluginCaptchaConfig } from "../../types";

export const EmailPasswordSignInForm = (
  config: SuperTokensPluginCaptchaConfig
): ComponentOverrideMap["EmailPasswordSignInForm_Override"] => {
  console.log("EmailPasswordSignInForm init", config);

  return ({ DefaultComponent, ...props }) => {
    const [captchaLoaded, setCaptchaLoaded] = useState(false);
    console.log("overrides/EmailPasswordSignInForm");

    const captchaContainerRef = useRef<HTMLDivElement>(null);

    console.log(captchaLoaded);

    const loadCaptcha = useCallback(async () => {
      if (captchaLoaded) return;

      console.log("captcha loading");
      if (config.type === "reCAPTCHAv3") {
        try {
          await loadScript(
            `http://www.google.com/recaptcha/api.js?render=${
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
          if (captchaLoaded) return;

          setCaptchaLoaded(true);
          console.log(config.type, "captcha callback loaded");
          // @ts-ignore
          window.grecaptcha.render(captchaContainerRef?.current, {
            sitekey: config.reCAPTCHAv2?.siteKey,
            callback: (...params: any[]) => {
              console.log("captcha render callback", params);
            },
          });
        };
        await loadScript(
          "http://www.google.com/recaptcha/api.js?onload=onCaptchaLoad&render=explicit",
          {
            async: true,
            defer: true,
          }
        );
        console.log(config.type, "captcha loaded");
      } else if (config.type === "turnstile") {
        // @ts-ignore
        window.onCaptchaLoad = () => {
          setCaptchaLoaded(true);
          console.log(config.type, "captcha callback loaded");

          if (!captchaContainerRef?.current) {
            console.log(config.type, "captcha container not found");
            return;
          }

          // @ts-ignore
          window.turnstile.render("#captcha-container", {
            sitekey: config.turnstile?.siteKey,
            callback: (...params: any[]) => {
              console.log("captcha render callback", params);
            },
          });
        };

        await loadScript(
          "https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onCaptchaLoad",
          {
            async: true,
            defer: true,
          }
        );
      }
    }, []);

    useEffect(() => {
      loadCaptcha();
    }, []);

    return (
      <DefaultComponent
        {...props}
        footer={<CaptchaContainer _ref={captchaContainerRef} />}
      />
    );
  };
};

const CaptchaContainer = ({
  _ref,
}: {
  _ref: React.RefObject<HTMLDivElement>;
}) => {
  useEffect(() => {
    console.log("captcha container mounting");
    return () => {
      console.log("captcha container unmounting");
    };
  }, []);
  return <div id="captcha-container" ref={_ref}></div>;
};
