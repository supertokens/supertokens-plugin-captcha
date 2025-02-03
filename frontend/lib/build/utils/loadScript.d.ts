export declare const loadScript: (
  url: string,
  {
    once,
    async,
    defer,
  }?: {
    once?: boolean;
    async?: boolean;
    defer?: boolean;
  }
) => Promise<void>;
