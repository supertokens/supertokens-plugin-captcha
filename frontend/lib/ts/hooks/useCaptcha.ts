import { useEffect, useRef } from "react";
import { Captcha } from "../captcha";

export function useCaptcha(recipe: "emailpassword", form: "signIn" | "signUp") {
  const captchaRef = useRef(new Captcha());

  useEffect(() => {
    captchaRef.current.load(recipe, form);
  }, []);

  return captchaRef;
}
