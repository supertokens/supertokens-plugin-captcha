export declare const getQuerier: (basePath: string) => {
    get: <T>(path: string, { withSession, params, }: {
        withSession: boolean;
        params?: Record<string, string>;
    }) => Promise<T>;
    post: <T>(path: string, body: any, { withSession, params, }: {
        withSession: boolean;
        params?: Record<string, string>;
    }) => Promise<T>;
};
export declare const useQuerier: (basePath: string) => {
    get: <T>(path: string, { withSession, params, }: {
        withSession: boolean;
        params?: Record<string, string>;
    }) => Promise<T>;
    post: <T>(path: string, body: any, { withSession, params, }: {
        withSession: boolean;
        params?: Record<string, string>;
    }) => Promise<T>;
};
