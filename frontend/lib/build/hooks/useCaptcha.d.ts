import { Captcha } from "../captcha";
export declare function useCaptcha(): CaptchaState;
type CaptchaState = {
    state: Captcha["state"] | "loading" | "error" | "rendering";
    error: string | null;
    token: string | null;
};
declare class CaptchaStore {
    private state;
    private listeners;
    private captcha;
    constructor();
    getSnapshot: () => CaptchaState;
    subscribe: (listener: () => void) => () => boolean;
    init(): void;
    disable(): void;
    load(): Promise<true | undefined>;
    render(): Promise<void>;
    private notifyListeners;
}
export declare const captchaStore: CaptchaStore;
export {};
