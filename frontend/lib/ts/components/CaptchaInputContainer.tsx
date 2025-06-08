import { forwardRef, useCallback, useEffect } from "react";
import { captchaStore, useCaptchaInputContainerId } from "../hooks";
import { CaptchInputContainerProps } from "../types";

export const CaptchaInputContainer = forwardRef<
  HTMLDivElement,
  CaptchInputContainerProps
>((props, ref) => {
  const { form, ...rest } = props;
  const containerId = useCaptchaInputContainerId();

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
      id={containerId}
      style={{ display: "inline-block", margin: "0 auto", paddingTop: "20px" }}
      {...rest}
    />
  );
});

CaptchaInputContainer.displayName = "CaptchaInputContainer";
