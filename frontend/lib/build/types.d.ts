export type SuperTokensPluginCaptchaConfig = {
  type: "reCAPTCHAv3" | "reCAPTCHAv2";
  reCAPTCHAv3?: {
    siteKey: string;
  };
  reCAPTCHAv2?: {
    siteKey: string;
  };
};
