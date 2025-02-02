"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const config_1 = require("./config");
const init = (config) => {
    console.log(config);
    return {
        id: config_1.PLUGIN_ID,
        compatibleSDKVersions: config_1.PLUGIN_SDK_VERSION,
        routeHandlers: [],
        overrideMap: {},
    };
};
exports.init = init;
