import { ComponentOverrideMap } from "supertokens-auth-react/lib/build/recipe/emailpassword/types";
import { useEffect, useRef } from "react";
import { SuperTokensPluginCaptchaConfig } from "../../types";
import { useCaptcha } from "../useCaptcha";

export const EmailPasswordSignInForm = (
  config: SuperTokensPluginCaptchaConfig
): ComponentOverrideMap["EmailPasswordSignInForm_Override"] => {
  return ({ DefaultComponent, ...props }) => {
    const captchaContainerRef = useRef<HTMLDivElement>(null);
    const captcha = useCaptcha({
      targetRef: captchaContainerRef,
      ...config,
    });

    useEffect(() => {
      captcha.load();
    }, []);

    return (
      <DefaultComponent
        {...props}
        recipeImplementation={{
          ...props.recipeImplementation,
          signIn: (input) =>
            props.recipeImplementation.signIn({
              ...input,
              options: {
                preAPIHook: captcha.preAPIHook,
              },
            }),
        }}
        footer={
          <>
            {captcha.loaded && <br />}
            <div
              id="captcha-container"
              ref={captchaContainerRef}
              style={{ display: "inline-block", margin: "0 auto" }}
            ></div>
          </>
        }
      />
    );
  };
};
