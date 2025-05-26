import { ComponentOverrideMap } from "supertokens-auth-react/lib/build/recipe/emailpassword/types";
import { useEffect, useRef } from "react";
import { Captcha } from "../../captcha";
import { CAPTCHA_ELEMENT_ID } from "../../constants";

export const EmailPasswordSignInForm = (): ComponentOverrideMap["EmailPasswordSignInForm_Override"] => {
  return ({ DefaultComponent, ...props }) => {
    const captchaRef = useRef(new Captcha());

    useEffect(() => {
      captchaRef.current.load();
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
                preAPIHook: captchaRef.current.preAPIHook,
              },
            }),
        }}
        footer={
          <>
            <div
              id={CAPTCHA_ELEMENT_ID}
              style={{ display: "inline-block", margin: "0 auto" }}
            />
          </>
        }
      />
    );
  };
};
