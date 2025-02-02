"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const supertokens_node_1 = __importDefault(require("supertokens-node"));
const session_1 = __importDefault(require("supertokens-node/recipe/session"));
const config_1 = require("./config");
const userBanningService_1 = require("./userBanningService");
// import { isAuthorised, sendUnauthorisedAccess } from "./utils";
// todo: feedback: have more exposed apis from the sdk - can't list users, cant get a user by email (or other fields), etc.
const init = () => {
    const userBanningService = new userBanningService_1.UserBanningService();
    return {
        id: config_1.PLUGIN_ID,
        compatibleSDKVersions: config_1.PLUGIN_SDK_VERSION,
        routeHandlers: [
            {
                path: config_1.HANDLE_BASE_PATH + "/ban",
                method: "post",
                handler: async (req, res, _, userContext) => {
                    // make sure the user is allowed to ban other users
                    // if (!(await isAuthorised(req, res, "admin"))) {
                    //   sendUnauthorisedAccess(res);
                    //   return null;
                    // }
                    var _a;
                    let tenantId = await req.getKeyValueFromQuery("tenantId");
                    if (!tenantId) {
                        res.setStatusCode(400);
                        res.sendJSONResponse({
                            status: "BAD_INPUT_ERROR",
                            message: "tenantId is required",
                        });
                        return null;
                    }
                    // make sure the request is valid
                    const body = await req.getJSONBody();
                    if (typeof body.isBanned !== "boolean") {
                        res.setStatusCode(400);
                        res.sendJSONResponse({
                            status: "BAD_INPUT_ERROR",
                            message: "isBanned are required",
                        });
                        return null;
                    }
                    let userId;
                    if (body.userId) {
                        userId = body.userId;
                    }
                    else if (body.email) {
                        const user = await supertokens_node_1.default.listUsersByAccountInfo(tenantId, {
                            email: body.email.toLowerCase(),
                        });
                        userId = (_a = user === null || user === void 0 ? void 0 : user[0]) === null || _a === void 0 ? void 0 : _a.id;
                    }
                    else {
                        res.setStatusCode(400);
                        res.sendJSONResponse({
                            status: "BAD_INPUT_ERROR",
                            message: "userId or email is required",
                        });
                        return null;
                    }
                    if (!userId) {
                        res.setStatusCode(400);
                        res.sendJSONResponse({
                            status: "BAD_INPUT_ERROR",
                            message: "user not found",
                        });
                        return null;
                    }
                    // set the ban status
                    const result = await userBanningService.setBanStatus(userId, body.isBanned, userContext);
                    // revoke all sessions if the user is banned
                    if (body.isBanned) {
                        await session_1.default.revokeAllSessionsForUser(userId);
                    }
                    if (result.status === "OK") {
                        res.setStatusCode(200);
                        res.sendJSONResponse({ status: "OK" });
                    }
                    else {
                        res.setStatusCode(400);
                        res.sendJSONResponse(result);
                    }
                    return null;
                },
            },
            {
                path: config_1.HANDLE_BASE_PATH + "/ban",
                method: "get",
                handler: async (req, res, _, userContext) => {
                    // make sure the user is allowed to get the ban status
                    // if (!(await isAuthorised(req, res, "admin"))) {
                    //   sendUnauthorisedAccess(res);
                    //   return null;
                    // }
                    var _a;
                    let tenantId = await req.getKeyValueFromQuery("tenantId");
                    if (!tenantId) {
                        res.setStatusCode(400);
                        res.sendJSONResponse({
                            status: "BAD_INPUT_ERROR",
                            message: "tenantId is required",
                        });
                        return null;
                    }
                    // make sure the request is valid
                    let userId = await req.getKeyValueFromQuery("userId");
                    let email = await req.getKeyValueFromQuery("email");
                    if (email) {
                        const user = await supertokens_node_1.default.listUsersByAccountInfo(tenantId, {
                            email: email.toLowerCase(),
                        });
                        userId = (_a = user === null || user === void 0 ? void 0 : user[0]) === null || _a === void 0 ? void 0 : _a.id;
                    }
                    userId = userId === null || userId === void 0 ? void 0 : userId.trim();
                    if (!userId) {
                        res.setStatusCode(400);
                        res.sendJSONResponse({
                            status: "BAD_INPUT_ERROR",
                            message: "userId or email is required",
                        });
                        return null;
                    }
                    // get the ban status
                    const result = await userBanningService.getBanStatus(userId, userContext);
                    if (result.status === "OK") {
                        res.setStatusCode(200);
                        res.sendJSONResponse(result);
                    }
                    else {
                        res.setStatusCode(400);
                        res.sendJSONResponse(result);
                    }
                    return null;
                },
            },
        ],
        overrideMap: {
            session: {
                functions: (originalImplementation) => {
                    return Object.assign(Object.assign({}, originalImplementation), { createNewSession: async (input) => {
                            const result = await userBanningService.getBanStatus(input.userId, input.userContext);
                            if (result.status !== "OK") {
                                throw new Error("Failed to get user metadata");
                            }
                            // throw an error if the user is banned. Can't return a status, because the createNewSession doesn't allow for returning a status.
                            if (result.banned) {
                                throw new Error("User banned");
                            }
                            return originalImplementation.createNewSession(input);
                        }, getSession: async (input) => {
                            const result = await originalImplementation.getSession(input);
                            if (!result)
                                return undefined;
                            const userId = result.getUserId(input.userContext);
                            if (!userId)
                                return result;
                            const banned = userBanningService.getBanStatusFromCache(userId);
                            if (!banned)
                                return result; // even if undefined, we still return the result, because we won't be hitting the database
                            return undefined;
                        } });
                },
            },
        },
    };
};
exports.init = init;
