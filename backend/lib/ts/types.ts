export type SuperTokensPluginCaptchaConfig = {
  type: "reCAPTCHAv3" | "reCAPTCHAv2" | "turnstile";
  reCAPTCHAv3?: {
    secretKey: string;
  };
  reCAPTCHAv2?: {
    secretKey: string;
  };
  turnstile?: {
    secretKey: string;
  };
  // By default the captcha validation is performed on all the form submit actions
  // Use this property to specify when to perform the validation
  shouldValidate?: (payload: {
    recipe: "emailpassword";
    action: "signInPOST" | "signUpPOST";
    // TODO: Add the proper API input types here
    input: any;
  }) => boolean;
};

export type ReCaptchaV3Response = {
  success: boolean;
  "error-codes": string[];
  hostname: string;
  action: string;
  score: number;
  challenge_ts: string;
};

export type ReCaptchaV2Response = {
  success: boolean;
  action: string;
  "error-codes": string[];
  challenge_ts: string;
};

export type TurnstileResponse = {
  success: boolean;
  "error-codes": string[];
  hostname: string;
  challenge_ts: string;
};
