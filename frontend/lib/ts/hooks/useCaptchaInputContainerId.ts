import { useMemo } from "react";
import { getPluginConfig } from "../config";
import { CAPTCHA_INPUT_CONTAINER_ID } from "../constants";

export function useCaptchaInputContainerId() {
  return useMemo(() => {
    const config = getPluginConfig();
    return config.inputContainerId || CAPTCHA_INPUT_CONTAINER_ID;
  }, []);
}
