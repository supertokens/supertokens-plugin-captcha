import { ComponentOverrideMap } from "supertokens-auth-react/lib/build/recipe/emailpassword/types";
import { loadScript } from "../../utils";
import { useCallback, useEffect } from "react";

export const EmailPasswordSignInForm = (
  key: string
): ComponentOverrideMap["EmailPasswordSignInForm_Override"] => ({
  DefaultComponent,
  ...props
}) => {
  console.log("overrides/EmailPasswordSignInForm");

  const loadCaptcha = useCallback(async () => {
    console.log("captcha loading");
    try {
      await loadScript(`https://www.google.com/recaptcha/api.js?render=${key}`);
      console.log("captcha loaded");
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    loadCaptcha();
  }, []);

  return (
    <DefaultComponent
      {...props}
      config={{
        ...props.config,
      }}
    />
  );
};
