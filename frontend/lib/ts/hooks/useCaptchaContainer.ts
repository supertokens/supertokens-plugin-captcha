import { useMemo } from "react";
import { getPluginConfig } from "../config";
import { CaptchaContainer } from "../components/CaptchaContainer";

export function useCaptchaContainer() {
  return useMemo(() => {
    const config = getPluginConfig();
    if (config.InputContainer) {
      return config.InputContainer;
    }
    return CaptchaContainer;
  }, []);
}
