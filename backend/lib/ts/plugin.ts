import { SuperTokensPlugin } from "supertokens-node/types";
import {
  PLUGIN_ID,
  PLUGIN_SDK_VERSION,
  getPluginConfig,
  setPluginConfig,
} from "./config";
import { SuperTokensPluginCaptchaConfig } from "./types";
import { CaptchaPluginError } from "./errors";

export const init = (
  config: SuperTokensPluginCaptchaConfig
): SuperTokensPlugin => {
  setPluginConfig(config);
  return {
    id: PLUGIN_ID,
    compatibleSDKVersions: PLUGIN_SDK_VERSION,
    overrideMap: {
      emailpassword: {
        apis: (originalImplementation) => {
          if (!originalImplementation.signInPOST) {
            return originalImplementation;
          }

          return {
            ...originalImplementation,
            signInPOST: async (input) => {
              const body = await input.options.req.getJSONBody();
              const captcha = "captcha" in body ? body.captcha : null;
              const type = "captchaType" in body ? body.captchaType : null;

              if (!captcha) {
                return {
                  status: "GENERAL_ERROR",
                  message: 'The "captcha" field is required',
                };
              }

              if (!type) {
                return {
                  status: "GENERAL_ERROR",
                  message: 'The "captchaType" field is required',
                };
              }

              if (type !== config.type) {
                return {
                  status: "GENERAL_ERROR",
                  message: `Invalid captcha type. Expected ${config.type} but got ${type}`,
                };
              }

              const validator = CaptchaValidators[config.type];
              if (!validator) {
                return {
                  status: "GENERAL_ERROR",
                  message: `Unsupported captcha type: ${
                    config.type
                  }. Must be one of ${SupportedCaptchaTypes.join(", ")}`,
                };
              }

              try {
                await validator(captcha);
                return originalImplementation.signInPOST!(input);
              } catch (e) {
                return {
                  status: "GENERAL_ERROR",
                  message: "CAPTCHA verification failed",
                };
              }
            },
          };
        },
      },
    },
  };
};

const SupportedCaptchaTypes = ["reCAPTCHAv3", "reCAPTCHAv2", "turnstile"];

const CaptchaValidators: Record<
  SuperTokensPluginCaptchaConfig["type"],
  (captcha: string) => Promise<void>
> = {
  reCAPTCHAv3: verifyReCaptchaV3,
  reCAPTCHAv2: verifyReCaptchaV2,
  turnstile: verifyTurnstile,
};

async function verifyReCaptchaV3(captcha: string): Promise<void> {
  const config = getPluginConfig();
  const reCAPTCHAv3Key = config.reCAPTCHAv3?.secretKey;
  if (!reCAPTCHAv3Key) {
    throw new CaptchaPluginError(
      "PLUGIN_CONFIG_ERROR",
      "reCAPTCHAv3 secretKey is required"
    );
  }

  const response = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${reCAPTCHAv3Key}&response=${captcha}`,
    { method: "POST" }
  );
  if (!response.ok) {
    throw new CaptchaPluginError(
      "CAPTCHA_VERIFICATION_ERROR",
      "CAPTCHA verification failed"
    );
  }

  const data = await response.json();
  if (!data.success) {
    throw new CaptchaPluginError(
      "CAPTCHA_VERIFICATION_ERROR",
      "CAPTCHA verification failed"
    );
  }
}

async function verifyReCaptchaV2(captcha: string): Promise<void> {
  const config = getPluginConfig();
  const reCAPTCHAv2Key = config.reCAPTCHAv2?.secretKey;
  if (!reCAPTCHAv2Key) {
    throw new CaptchaPluginError(
      "PLUGIN_CONFIG_ERROR",
      "reCAPTCHAv2 secretKey is required"
    );
  }

  const response = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${reCAPTCHAv2Key}&response=${captcha}`,
    { method: "POST" }
  );
  if (!response.ok) {
    throw new CaptchaPluginError(
      "CAPTCHA_VERIFICATION_ERROR",
      "CAPTCHA verification failed"
    );
  }

  const data = await response.json();
  if (!data.success) {
    throw new CaptchaPluginError(
      "CAPTCHA_VERIFICATION_ERROR",
      "CAPTCHA verification failed"
    );
  }
}

async function verifyTurnstile(captcha: string): Promise<void> {
  const config = getPluginConfig();
  const turnstileKey = config.turnstile?.secretKey;
  if (!turnstileKey) {
    throw new CaptchaPluginError(
      "PLUGIN_CONFIG_ERROR",
      "turnstile secretKey is required"
    );
  }

  const response = await fetch(
    `https://challenges.cloudflare.com/turnstile/v0/siteverify`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        secret: config.turnstile?.secretKey,
        response: captcha,
      }),
    }
  );
  if (!response.ok) {
    throw new CaptchaPluginError(
      "CAPTCHA_VERIFICATION_ERROR",
      "CAPTCHA verification failed"
    );
  }

  const data = await response.json();
  if (!data.success) {
    throw new CaptchaPluginError(
      "CAPTCHA_VERIFICATION_ERROR",
      "CAPTCHA verification failed"
    );
  }
}
