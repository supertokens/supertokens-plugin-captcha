import { BaseRequest, BaseResponse } from "supertokens-node/lib/build/framework";
export declare const isAuthorised: (req: BaseRequest, res: BaseResponse, role?: string | {
    any: string[];
} | {
    all: string[];
} | false) => Promise<boolean>;
export declare const getAuthorisedUserId: (req: BaseRequest, res: BaseResponse, role?: string | {
    any: string[];
} | {
    all: string[];
} | false) => Promise<string | false>;
