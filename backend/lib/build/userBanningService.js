"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBanningService = void 0;
const usermetadata_1 = __importDefault(require("supertokens-node/recipe/usermetadata"));
const config_1 = require("./config");
class UserBanningService {
    constructor() {
        this.cache = new Map();
    }
    async getBanStatus(userId, userContext) {
        const result = await usermetadata_1.default.getUserMetadata(userId, userContext);
        this.setBanStatusToCache(userId, result.metadata[config_1.USER_METADATA_BAN_STATUS_KEY]);
        return {
            status: "OK",
            banned: result.metadata[config_1.USER_METADATA_BAN_STATUS_KEY],
        };
    }
    async setBanStatus(userId, isBanned, userContext) {
        await usermetadata_1.default.updateUserMetadata(userId, { [config_1.USER_METADATA_BAN_STATUS_KEY]: !!isBanned }, userContext);
        this.setBanStatusToCache(userId, !!isBanned);
        return { status: "OK" };
    }
    setBanStatusToCache(userId, isBanned) {
        this.cache.set(userId, isBanned);
    }
    getBanStatusFromCache(userId) {
        return this.cache.get(userId);
    }
}
exports.UserBanningService = UserBanningService;
