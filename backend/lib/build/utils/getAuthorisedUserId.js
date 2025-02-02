"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuthorisedUserId = exports.isAuthorised = void 0;
const session_1 = __importDefault(require("supertokens-node/recipe/session"));
const userroles_1 = __importDefault(require("supertokens-node/recipe/userroles"));
const _1 = require(".");
const isAuthorised = async (req, res, role) => {
    return !!(await (0, exports.getAuthorisedUserId)(req, res, role));
};
exports.isAuthorised = isAuthorised;
const getAuthorisedUserId = async (req, res, role) => {
    const validators = [];
    if (typeof role === "string") {
        validators.push(userroles_1.default.UserRoleClaim.validators.includes(role));
    }
    else if (role && "any" in role) {
        validators.push(userroles_1.default.UserRoleClaim.validators.includesAny(role.any));
    }
    else if (role && "all" in role) {
        validators.push(userroles_1.default.UserRoleClaim.validators.includesAll(role.all));
    }
    let userId;
    try {
        let session = await session_1.default.getSession(req, res, {
            overrideGlobalClaimValidators: async (globalValidators) => [
                ...globalValidators,
                ...validators,
            ],
        });
        userId = session.getUserId();
    }
    catch (e) {
        (0, _1.sendUnauthorisedAccess)(res);
        return false;
    }
    if (!userId) {
        (0, _1.sendUnauthorisedAccess)(res);
        return false;
    }
    return userId;
};
exports.getAuthorisedUserId = getAuthorisedUserId;
