import { forwardRef, useCallback, useEffect } from "react";
import { CAPTCHA_ELEMENT_ID } from "../constants";
import { captchaStore } from "../hooks";

export type CaptchConatinerProps = {
  form:
    | "EmailPasswordSignInForm"
    | "EmailPasswordSignUpForm"
    | "EmailPasswordResetPasswordEmail"
    | "EmailPasswordSubmitNewPassword"
    | "PasswordlessEmailForm"
    | "PasswordlessPhoneForm"
    | "PasswordlessEmailOrPhoneForm"
    | "PasswordlessEPComboEmailForm"
    | "PasswordlessEPComboEmailOrPhoneForm"
    | "PasswordlessUserInputForm"
    | "TOTPCodeForm";
} & React.HTMLAttributes<HTMLDivElement>;

export const CaptchaContainer = forwardRef<
  HTMLDivElement,
  CaptchConatinerProps
>((props, ref) => {
  const { form, ...rest } = props;

  const loadAndRenderCaptcha = useCallback(async () => {
    await captchaStore.load();
    await captchaStore.render();
  }, []);

  useEffect(() => {
    loadAndRenderCaptcha();
  }, [loadAndRenderCaptcha]);

  return (
    <div
      ref={ref}
      id={CAPTCHA_ELEMENT_ID}
      style={{ display: "inline-block", margin: "0 auto", paddingTop: "20px" }}
      {...rest}
    />
  );
});

CaptchaContainer.displayName = "CaptchaContainer";
