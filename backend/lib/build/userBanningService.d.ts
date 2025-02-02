import { UserContext } from "supertokens-node/types";
export declare class UserBanningService {
    protected cache: Map<string, boolean>;
    constructor();
    getBanStatus(userId: string, userContext?: UserContext): Promise<{
        status: "OK";
        banned: boolean | undefined;
    }>;
    setBanStatus(userId: string, isBanned: boolean, userContext?: UserContext): Promise<{
        status: "OK";
    }>;
    setBanStatusToCache(userId: string, isBanned: boolean): void;
    getBanStatusFromCache(userId: string): boolean | undefined;
}
