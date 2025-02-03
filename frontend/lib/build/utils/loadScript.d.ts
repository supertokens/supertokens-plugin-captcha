export declare const loadScript: (
  url: string,
  {
    async,
    defer,
  }?: {
    async?: boolean;
    defer?: boolean;
  }
) => Promise<void>;
