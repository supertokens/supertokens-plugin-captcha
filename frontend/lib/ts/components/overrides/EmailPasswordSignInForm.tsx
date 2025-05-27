import { ComponentOverrideMap } from "supertokens-auth-react/lib/build/recipe/emailpassword/types";
import { CAPTCHA_ELEMENT_ID } from "../../constants";
import { useCaptcha } from "../../hooks";

export const EmailPasswordSignInForm = (): ComponentOverrideMap["EmailPasswordSignInForm_Override"] => {
  return ({ DefaultComponent, ...props }) => {
    const captchaRef = useCaptcha("emailpassword", "signIn");

    return (
      <DefaultComponent
        {...props}
        recipeImplementation={{
          ...props.recipeImplementation,
          signIn: (input) =>
            props.recipeImplementation.signIn({
              ...input,
              options: {
                preAPIHook: captchaRef.current.getPreAPIHook(
                  "emailpassword",
                  "signIn"
                ),
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
