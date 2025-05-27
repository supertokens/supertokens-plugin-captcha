export declare class Captcha {
    private isLoaded;
    private token;
    private domElement;
    constructor();
    load(): Promise<void>;
    preAPIHook: (input: any) => Promise<any>;
    setToken: (token: string) => void;
    private loadReCAPTCHAv2;
    private loadReCAPTCHAv3;
    private loadTurnstile;
    private getReCAPTCHAv2Token;
    private getTurnstileToken;
    private getReCAPTCHAv3Token;
}
