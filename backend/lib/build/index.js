"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PLUGIN_ID = exports.init = void 0;
const plugin_1 = require("./plugin");
Object.defineProperty(exports, "init", { enumerable: true, get: function () { return plugin_1.init; } });
var config_1 = require("./config");
Object.defineProperty(exports, "PLUGIN_ID", { enumerable: true, get: function () { return config_1.PLUGIN_ID; } });
exports.default = { init: plugin_1.init };
