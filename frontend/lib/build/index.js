'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var react = require('react');

var PLUGIN_ID = "supertokens-plugin-captcha";
var CAPTCHA_ELEMENT_ID = "captcha-container";

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

var PluginConfig;
var SupportedCaptchaTypes = ["reCAPTCHAv3", "reCAPTCHAv2", "turnstile"];
function setPluginConfig(config) {
    var _a, _b, _c;
    if (!SupportedCaptchaTypes.includes(config.type)) {
        throw new Error("Unsupported CAPTCHA type");
    }
    if (config.type === "reCAPTCHAv3" && !((_a = config.reCAPTCHAv3) === null || _a === void 0 ? void 0 : _a.siteKey)) {
        throw new Error("reCAPTCHAv3 site key is required");
    }
    if (config.type === "reCAPTCHAv2" && !((_b = config.reCAPTCHAv2) === null || _b === void 0 ? void 0 : _b.siteKey)) {
        throw new Error("reCAPTCHAv2 site key is required");
    }
    if (config.type === "turnstile" && !((_c = config.turnstile) === null || _c === void 0 ? void 0 : _c.siteKey)) {
        throw new Error("turnstile site key is required");
    }
    PluginConfig = config;
}
function getPluginConfig() {
    if (!PluginConfig) {
        throw new Error("The plugin was not initialised");
    }
    return PluginConfig;
}

var Captcha = /** @class */ (function () {
    function Captcha() {
        var _this = this;
        this.isLoaded = false;
        this.token = null;
        this.domElement = null;
        this.preAPIHook = function (input) { return __awaiter(_this, void 0, void 0, function () {
            var config, payload, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        config = getPluginConfig();
                        if (!this.isLoaded) {
                            throw new Error("CAPTCHA not loaded");
                        }
                        try {
                            payload = JSON.parse(input.requestInit.body);
                        }
                        catch (e) {
                            console.error(e);
                            throw new Error("Error setting CAPTCHA token");
                        }
                        if (!(config.type === "turnstile")) return [3 /*break*/, 1];
                        payload.catpcha = this.getTurnstileToken();
                        return [3 /*break*/, 5];
                    case 1:
                        if (!(config.type === "reCAPTCHAv2")) return [3 /*break*/, 2];
                        payload.catpcha = this.getReCAPTCHAv2Token();
                        return [3 /*break*/, 5];
                    case 2:
                        if (!(config.type === "reCAPTCHAv3")) return [3 /*break*/, 4];
                        _a = payload;
                        return [4 /*yield*/, this.getReCAPTCHAv3Token()];
                    case 3:
                        _a.catpcha = _b.sent();
                        return [3 /*break*/, 5];
                    case 4: throw new Error("Unsupported CAPTCHA type");
                    case 5:
                        if (!payload.captcha) {
                            throw new Error("Error setting CAPTCHA token");
                        }
                        payload.captchaType = config.type;
                        input.requestInit.body = JSON.stringify(payload);
                        return [2 /*return*/, input];
                }
            });
        }); };
        this.setToken = function (token) {
            _this.token = token;
        };
        this.loadReCAPTCHAv2 = function () { return __awaiter(_this, void 0, void 0, function () {
            var config, siteKey, onLoad;
            var _this = this;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        config = getPluginConfig();
                        siteKey = (_a = config === null || config === void 0 ? void 0 : config.reCAPTCHAv2) === null || _a === void 0 ? void 0 : _a.siteKey;
                        if (!siteKey) {
                            throw new Error("reCAPTCHAv2 site key is required");
                        }
                        onLoad = function () {
                            if (_this.isLoaded)
                                return;
                            if (!_this.domElement) {
                                throw new Error("Captcha container not found");
                            }
                            window.grecaptcha.render(_this.domElement, {
                                sitekey: siteKey,
                                callback: _this.setToken,
                            });
                            _this.isLoaded = true;
                        };
                        window.onLoadReCAPTCHAv2 = onLoad;
                        return [4 /*yield*/, loadScript("https://www.google.com/recaptcha/api.js?onload=onLoadReCAPTCHAv2&render=explicit")];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        this.loadReCAPTCHAv3 = function () { return __awaiter(_this, void 0, void 0, function () {
            var config, siteKey;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.isLoaded)
                            return [2 /*return*/];
                        config = getPluginConfig();
                        siteKey = (_a = config === null || config === void 0 ? void 0 : config.reCAPTCHAv3) === null || _a === void 0 ? void 0 : _a.siteKey;
                        if (!siteKey) {
                            throw new Error("reCAPTCHAv3 site key is required");
                        }
                        return [4 /*yield*/, loadScript("https://www.google.com/recaptcha/api.js?render=".concat(siteKey))];
                    case 1:
                        _b.sent();
                        this.isLoaded = true;
                        return [2 /*return*/];
                }
            });
        }); };
        this.loadTurnstile = function () { return __awaiter(_this, void 0, void 0, function () {
            var config, siteKey, onLoad;
            var _this = this;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        config = getPluginConfig();
                        siteKey = (_a = config === null || config === void 0 ? void 0 : config.turnstile) === null || _a === void 0 ? void 0 : _a.siteKey;
                        onLoad = function () {
                            if (!siteKey) {
                                throw new Error("turnstile site key is required");
                            }
                            if (_this.isLoaded)
                                return;
                            if (!_this.domElement) {
                                throw new Error("Captcha container not found");
                            }
                            window.turnstile.render(_this.domElement, {
                                sitekey: siteKey,
                                callback: _this.setToken,
                            });
                        };
                        window.onLoadTurnstile = onLoad;
                        return [4 /*yield*/, loadScript("https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onLoadTurnstile")];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); };
    }
    Captcha.prototype.load = function () {
        this.domElement = document.getElementById("captcha-container");
        if (!this.domElement) {
            throw new Error("Captcha container not found");
        }
        var config = getPluginConfig();
        if (config.type === "turnstile")
            return this.loadTurnstile();
        if (config.type === "reCAPTCHAv2")
            return this.loadReCAPTCHAv2();
        if (config.type === "reCAPTCHAv3")
            return this.loadReCAPTCHAv3();
        throw new Error("Unsupported CAPTCHA type");
    };
    Captcha.prototype.getReCAPTCHAv2Token = function () {
        return this.token;
    };
    Captcha.prototype.getTurnstileToken = function () {
        return this.token;
    };
    Captcha.prototype.getReCAPTCHAv3Token = function () {
        return __awaiter(this, void 0, void 0, function () {
            var config, siteKey, actionName, token;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        config = getPluginConfig();
                        siteKey = (_a = config.reCAPTCHAv3) === null || _a === void 0 ? void 0 : _a.siteKey;
                        actionName = ((_b = config.reCAPTCHAv3) === null || _b === void 0 ? void 0 : _b.actionName) || "submit";
                        if (!siteKey) {
                            throw new Error("reCAPTCHAv3 site key is required");
                        }
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                window.grecaptcha.ready(function () {
                                    window.grecaptcha
                                        .execute(siteKey, { action: actionName })
                                        .then(resolve)
                                        .catch(reject);
                                });
                            })];
                    case 1:
                        token = _c.sent();
                        return [2 /*return*/, token];
                }
            });
        });
    };
    return Captcha;
}());
var LoadedScripts = {};
function loadScript(url) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    if (LoadedScripts[url])
                        return resolve();
                    var script = document.createElement("script");
                    script.type = "application/javascript";
                    script.async = true;
                    script.defer = true;
                    script.src = url;
                    script.onload = function () {
                        LoadedScripts[url] = true;
                        resolve();
                    };
                    script.onerror = function (e) {
                        delete LoadedScripts[url];
                        reject(e);
                    };
                    document.head.appendChild(script);
                })];
        });
    });
}

var EmailPasswordSignInForm = function () {
    return function (_a) {
        var DefaultComponent = _a.DefaultComponent, props = __rest(_a, ["DefaultComponent"]);
        var captchaRef = react.useRef(new Captcha());
        react.useEffect(function () {
            captchaRef.current.load();
        }, []);
        return (jsxRuntime.jsx(DefaultComponent, __assign({}, props, { recipeImplementation: __assign(__assign({}, props.recipeImplementation), { signIn: function (input) {
                    return props.recipeImplementation.signIn(__assign(__assign({}, input), { options: {
                            preAPIHook: captchaRef.current.preAPIHook,
                        } }));
                } }), footer: jsxRuntime.jsx(jsxRuntime.Fragment, { children: jsxRuntime.jsx("div", { id: CAPTCHA_ELEMENT_ID, style: { display: "inline-block", margin: "0 auto" } }) }) })));
    };
};

// Open questions:
// - Does shadow dom affect this
// - Do we want people to be able to customize when the captcha is shown
var init = function (config) {
    setPluginConfig(config);
    return {
        id: PLUGIN_ID,
        overrideMap: {
            emailpassword: {
                components: {
                    EmailPasswordSignInForm_Override: EmailPasswordSignInForm(),
                },
            },
        },
    };
};

var index = { init: init };

exports.PLUGIN_ID = PLUGIN_ID;
exports.default = index;
exports.init = init;
