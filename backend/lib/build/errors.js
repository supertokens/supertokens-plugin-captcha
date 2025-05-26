"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CaptchaPluginError = void 0;
const error_1 = __importDefault(require("supertokens-node/lib/build/error"));
class CaptchaPluginError extends error_1.default {
    constructor(type, message) {
        super({ type, message });
    }
}
exports.CaptchaPluginError = CaptchaPluginError;
