import { SuperTokensPluginCaptchaConfig } from "../types";
export declare const useCaptcha: ({
  targetRef,
  ...config
}: {
  targetRef: React.RefObject<HTMLDivElement>;
} & SuperTokensPluginCaptchaConfig) => {
  load: () => Promise<void>;
  loaded: boolean;
  token: string | null;
  preAPIHook: (input: any) => Promise<any>;
};
