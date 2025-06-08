'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var react = require('react');

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

var PLUGIN_ID = "supertokens-plugin-captcha";
var CAPTCHA_INPUT_CONTAINER_ID = "captcha-container";

/// <reference types="@types/cloudflare-turnstile" />
/// <reference types="@types/grecaptcha" />
function isEmailPasswordCaptchaPreAndPostAPIHookAction(action) {
    return (action === "EMAIL_PASSWORD_SIGN_UP" ||
        action === "EMAIL_PASSWORD_SIGN_IN" ||
        action === "SUBMIT_NEW_PASSWORD");
}
function isPasswordlessCaptchaPreAndPostAPIHookAction(action) {
    return (action === "PASSWORDLESS_CONSUME_CODE" ||
        action === "PASSWORDLESS_CREATE_CODE" ||
        action === "PASSWORDLESS_RESEND_CODE");
}
function isTotpCaptchaPreAndPostAPIHookAction(action) {
    return action === "VERIFY_CODE";
}

var PluginConfig;
var SupportedCaptchaTypes = ["reCAPTCHAv3", "reCAPTCHAv2", "turnstile"];
var SUPERTOKENS_DEBUG_NAMESPACE = "com.supertokens.plugin-captcha";
function logDebugMessage(message) {
    console.log("".concat(SUPERTOKENS_DEBUG_NAMESPACE, " {t: \"").concat(new Date().toISOString(), "\", message: \"").concat(message, "\", supertokens-plugin-captcha: \"\"}"));
}
function setPluginConfig(config) {
    logDebugMessage("Setting plugin config for type: ".concat(config.type));
    if (PluginConfig) {
        throw new Error("Plugin was already initialised");
    }
    if (!SupportedCaptchaTypes.includes(config.type)) {
        logDebugMessage("Unsupported CAPTCHA type: ".concat(config.type));
        throw new Error("Unsupported CAPTCHA type");
    }
    if (config.type === "reCAPTCHAv3" && !config.captcha.sitekey) {
        throw new Error("reCAPTCHAv3 site key is required");
    }
    if (config.type === "reCAPTCHAv2" && !config.captcha.sitekey) {
        throw new Error("reCAPTCHAv2 site key is required");
    }
    if (config.type === "turnstile" && !config.captcha.sitekey) {
        throw new Error("turnstile site key is required");
    }
    if (config.type === "reCAPTCHAv3" && config.InputContainer) {
        throw new Error("reCAPTCHAv3 does not support rendering");
    }
    PluginConfig = config;
    logDebugMessage("Plugin config set successfully");
}
function getPluginConfig() {
    if (!PluginConfig) {
        logDebugMessage("Plugin config not found - plugin was not initialised");
        throw new Error("The plugin was not initialised");
    }
    return PluginConfig;
}
function validatePublicConfig(config) {
    logDebugMessage("Validating public config");
    var pluginConfig = getPluginConfig();
    if (config.useShadowDom && pluginConfig.type !== "reCAPTCHAv3") {
        logDebugMessage("Shadow DOM incompatible with captcha type: ".concat(pluginConfig.type));
        throw new Error("The captcha input cannot be rendered when using shadow dom");
    }
    logDebugMessage("Public config validation passed");
}

var Captcha = /** @class */ (function () {
    function Captcha() {
        var _this = this;
        this.provider = null;
        this.state = "uninitialised";
        this.config = null;
        this.preAPIHook = function (context) { return __awaiter(_this, void 0, void 0, function () {
            var action, token, payload;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        action = context.action;
                        logDebugMessage("PreAPIHook called");
                        if (this.state === "disabled") {
                            logDebugMessage("Captcha disabled, skipping");
                            return [2 /*return*/, context];
                        }
                        if (!isEmailPasswordCaptchaPreAndPostAPIHookAction(action) &&
                            !isPasswordlessCaptchaPreAndPostAPIHookAction(action) &&
                            !isTotpCaptchaPreAndPostAPIHookAction(action)) {
                            logDebugMessage("Action does not have captcha support - ".concat(action));
                            return [2 /*return*/, context];
                        }
                        if (this.state !== "loaded" && this.state !== "rendered") {
                            logDebugMessage("Invalid captcha state for preAPIHook - ".concat(this.state));
                            throw new Error("Invalid captcha state: ".concat(this.state));
                        }
                        if (!this.provider) {
                            throw new Error("Captcha provider is not initialised");
                        }
                        if (!this.config) {
                            throw new Error("Captcha config is not initialised");
                        }
                        if (!(this.state !== "rendered" && this.provider.render)) return [3 /*break*/, 2];
                        logDebugMessage("Rendering captcha before token retrieval");
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                _this.render(resolve, reject);
                            })];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        logDebugMessage("Getting captcha token");
                        return [4 /*yield*/, this.provider.getToken()];
                    case 3:
                        token = _a.sent();
                        try {
                            payload = JSON.parse(context.requestInit.body);
                        }
                        catch (e) {
                            console.error(e);
                            throw new Error("Error setting CAPTCHA token");
                        }
                        payload.captcha = token;
                        payload.captchaType = this.config.type;
                        context.requestInit.body = JSON.stringify(payload);
                        return [2 /*return*/, context];
                }
            });
        }); };
    }
    Captcha.prototype.init = function (config) {
        logDebugMessage("Initializing captcha");
        this.config = config;
        if (config.type === "turnstile") {
            this.provider = new TurnstileProvider(config.captcha);
        }
        else if (config.type === "reCAPTCHAv2") {
            this.provider = new ReCAPTCHAv2Provider(config.captcha);
        }
        else if (config.type === "reCAPTCHAv3") {
            this.provider = new ReCAPTCHAv3Provider(config.captcha);
        }
        else {
            throw new Error("Unsupported CAPTCHA type");
        }
        this.state = "initalised";
    };
    Object.defineProperty(Captcha.prototype, "inputContainer", {
        get: function () {
            if (!this.config) {
                throw new Error("Captcha config is not initialised");
            }
            var containerId = this.config.inputContainerId || CAPTCHA_INPUT_CONTAINER_ID;
            var element = document.getElementById(containerId);
            if (!element) {
                throw new Error("Captcha input container element not found");
            }
            return element;
        },
        enumerable: false,
        configurable: true
    });
    Captcha.prototype.disable = function () {
        logDebugMessage("Disabling captcha");
        this.state = "disabled";
    };
    Captcha.prototype.load = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        logDebugMessage("Loading captcha");
                        if (this.state === "uninitialised") {
                            throw new Error("Captcha has not been initialised");
                        }
                        if (!this.provider) {
                            throw new Error("Captcha provider is not initialised");
                        }
                        if (!this.config) {
                            throw new Error("Captcha config is not initialised");
                        }
                        if (this.state !== "initalised") {
                            logDebugMessage("Captcha already loaded or in wrong state - ".concat(this.state));
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.provider.load()];
                    case 1:
                        _a.sent();
                        this.state = "loaded";
                        return [2 /*return*/];
                }
            });
        });
    };
    Captcha.prototype.render = function (onSubmit, onError) {
        logDebugMessage("Rendering captcha");
        if (!this.provider) {
            throw new Error("Captcha provider is not initialised");
        }
        if (!this.provider.render) {
            logDebugMessage("Provider does not support rendering");
            return;
        }
        this.provider.render(this.inputContainer, onSubmit, onError);
        this.state = "rendered";
    };
    return Captcha;
}());
var ReCAPTCHAv2Provider = /** @class */ (function () {
    function ReCAPTCHAv2Provider(config) {
        var _this = this;
        this.config = config;
        this.token = null;
        this.setToken = function (token) {
            _this.token = token;
        };
    }
    ReCAPTCHAv2Provider.prototype.load = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (!this.config.sitekey) {
                    throw new Error("reCAPTCHAv2 site key is required");
                }
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var error_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    window.onLoadReCAPTCHAv2 = function () {
                                        resolve();
                                    };
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 3, , 4]);
                                    return [4 /*yield*/, loadScript("https://www.google.com/recaptcha/api.js?onload=onLoadReCAPTCHAv2&render=explicit")];
                                case 2:
                                    _a.sent();
                                    return [3 /*break*/, 4];
                                case 3:
                                    error_1 = _a.sent();
                                    console.error("Failed to load reCAPTCHA v2:", error_1);
                                    reject("Failed to load reCAPTCHA v2 script");
                                    return [3 /*break*/, 4];
                                case 4: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    ReCAPTCHAv2Provider.prototype.render = function (containerElement, onSubmit, onError) {
        var _this = this;
        if (!this.config.sitekey) {
            throw new Error("reCAPTCHAv2 site key is required");
        }
        if (!window.grecaptcha) {
            throw new Error("ReCAPTCHAv2 is not loaded");
        }
        try {
            window.grecaptcha.render(containerElement, __assign(__assign({}, this.config), { sitekey: this.config.sitekey, callback: function (token) {
                    if (_this.config.callback) {
                        _this.config.callback(token);
                    }
                    _this.token = token;
                    onSubmit(token);
                }, "error-callback": function () {
                    if (_this.config["error-callback"]) {
                        _this.config["error-callback"]();
                    }
                    onError(new Error("reCAPTCHA v2 verification failed"));
                }, "expired-callback": function () {
                    _this.token = null;
                    onError(new Error("reCAPTCHA v2 token expired"));
                } }));
        }
        catch (error) {
            throw new Error("Failed to render reCAPTCHA v2: ".concat(error));
        }
    };
    ReCAPTCHAv2Provider.prototype.getToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!this.token) {
                    throw new Error("No CAPTCHA token available");
                }
                return [2 /*return*/, Promise.resolve(this.token)];
            });
        });
    };
    return ReCAPTCHAv2Provider;
}());
var ReCAPTCHAv3Provider = /** @class */ (function () {
    function ReCAPTCHAv3Provider(config) {
        this.config = config;
    }
    ReCAPTCHAv3Provider.prototype.load = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.config.sitekey) {
                            throw new Error("reCAPTCHAv3 site key is required");
                        }
                        return [4 /*yield*/, loadScript("https://www.google.com/recaptcha/api.js?render=".concat(this.config.sitekey))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ReCAPTCHAv3Provider.prototype.getToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            var captchaConfig, actionName, token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        captchaConfig = this.config;
                        if (!captchaConfig.sitekey) {
                            throw new Error("reCAPTCHAv3 site key is required");
                        }
                        if (!window.grecaptcha) {
                            throw new Error("ReCAPTCHAv3 is not loaded");
                        }
                        actionName = captchaConfig.action || "submit";
                        return [4 /*yield*/, new Promise(function (resolve) {
                                window.grecaptcha.ready(function () {
                                    window.grecaptcha
                                        .execute(captchaConfig.sitekey, { action: actionName })
                                        .then(resolve);
                                });
                            })];
                    case 1:
                        token = _a.sent();
                        return [2 /*return*/, token];
                }
            });
        });
    };
    return ReCAPTCHAv3Provider;
}());
var TurnstileProvider = /** @class */ (function () {
    function TurnstileProvider(config) {
        var _this = this;
        this.config = config;
        this.token = null;
        this.setToken = function (token) {
            _this.token = token;
        };
    }
    TurnstileProvider.prototype.load = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (!this.config.sitekey) {
                    throw new Error("Turnstile site key is required");
                }
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var error_2;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    window.onLoadTurnstile = function () {
                                        resolve();
                                    };
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 3, , 4]);
                                    return [4 /*yield*/, loadScript("https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onLoadTurnstile")];
                                case 2:
                                    _a.sent();
                                    return [3 /*break*/, 4];
                                case 3:
                                    error_2 = _a.sent();
                                    console.error("Failed to load Turnstile:", error_2);
                                    reject("Failed to load Turnstile script");
                                    return [3 /*break*/, 4];
                                case 4: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    TurnstileProvider.prototype.render = function (container, onSubmit, onError) {
        var _this = this;
        if (!container) {
            throw new Error("Container element is required");
        }
        if (!this.config.sitekey) {
            throw new Error("Turnstile site key is required");
        }
        if (!window.turnstile) {
            throw new Error("Turnstile is not loaded");
        }
        var widgetId = window.turnstile.render(container, {
            sitekey: this.config.sitekey,
            callback: function (token) {
                _this.token = token;
                if (_this.config.callback) {
                    _this.config.callback(token);
                }
                onSubmit(token);
            },
            "expired-callback": function (token) {
                _this.token = null;
                if (_this.config["expired-callback"]) {
                    _this.config["expired-callback"](token);
                }
                onError(new Error("Turnstile token expired"));
            },
            "error-callback": function (error) {
                _this.token = null;
                if (_this.config["error-callback"]) {
                    _this.config["error-callback"](error);
                }
                onError(new Error("Turnstile verification failed - ".concat(error)));
            },
            "timeout-callback": function () {
                _this.token = null;
                if (_this.config["timeout-callback"]) {
                    _this.config["timeout-callback"]();
                }
                onError(new Error("Turnstile verification timed out"));
            },
            "unsupported-callback": function () {
                _this.token = null;
                if (_this.config["unsupported-callback"]) {
                    _this.config["unsupported-callback"]();
                }
                onError(new Error("Turnstile is not supported by your browser"));
            },
        });
        if (widgetId === "undefined") {
            throw new Error("Turnstile widget rendering failed");
        }
    };
    TurnstileProvider.prototype.getToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!this.token) {
                    throw new Error("No CAPTCHA token available");
                }
                return [2 /*return*/, Promise.resolve(this.token)];
            });
        });
    };
    return TurnstileProvider;
}());
var LoadedScripts = {};
function loadScript(url) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    logDebugMessage("Loading script - ".concat(url));
                    if (LoadedScripts[url]) {
                        logDebugMessage("Script already loaded - ".concat(url));
                        return resolve();
                    }
                    LoadedScripts[url] = "loading";
                    var script = document.createElement("script");
                    script.type = "application/javascript";
                    script.async = true;
                    script.defer = true;
                    script.src = url;
                    var timeout = setTimeout(function () {
                        if (LoadedScripts[url] === "loading") {
                            logDebugMessage("Script loading timeout - ".concat(url));
                            delete LoadedScripts[url];
                            document.head.removeChild(script);
                            reject(new Error("Script loading timeout: ".concat(url)));
                        }
                    }, 30000);
                    script.onload = function () {
                        clearTimeout(timeout);
                        LoadedScripts[url] = "loaded";
                        logDebugMessage("Script loaded successfully - ".concat(url));
                        resolve();
                    };
                    script.onerror = function (e) {
                        clearTimeout(timeout);
                        delete LoadedScripts[url];
                        logDebugMessage("Script loading error");
                        reject(e);
                    };
                    document.head.appendChild(script);
                })];
        });
    });
}
var captcha = new Captcha();

function useCaptcha() {
    var captchaState = react.useSyncExternalStore(captchaStore.subscribe, captchaStore.getSnapshot, function () { return DefaultCaptchaState; });
    return captchaState;
}
var DefaultCaptchaState = {
    state: "uninitialised",
    error: null,
    token: null,
};
var CaptchaStore = /** @class */ (function () {
    function CaptchaStore() {
        var _this = this;
        this.getSnapshot = function () {
            return _this.state;
        };
        this.subscribe = function (listener) {
            _this.listeners.add(listener);
            return function () { return _this.listeners.delete(listener); };
        };
        this.state = DefaultCaptchaState;
        this.captcha = captcha;
        this.listeners = new Set();
    }
    CaptchaStore.prototype.init = function () {
        logDebugMessage("CaptchaStore init called - ".concat(this.state.state));
        var config = getPluginConfig();
        if (this.state.state !== "uninitialised") {
            logDebugMessage("CaptchaStore already initialized - ".concat(this.state.state));
            return;
        }
        try {
            this.captcha.init(config);
            this.state = __assign(__assign({}, this.state), { state: this.captcha.state });
            logDebugMessage("CaptchaStore initialized successfully - ".concat(this.state.state));
            this.notifyListeners();
        }
        catch (err) {
            logDebugMessage("CaptchaStore init error - ".concat(getErrorMessage(err)));
            this.state = __assign(__assign({}, this.state), { state: "error", error: getErrorMessage(err) });
            this.notifyListeners();
        }
    };
    CaptchaStore.prototype.disable = function () {
        logDebugMessage("CaptchaStore disable called");
        this.captcha.disable();
        this.state = __assign(__assign({}, this.state), { state: this.captcha.state });
        this.notifyListeners();
    };
    CaptchaStore.prototype.load = function () {
        return __awaiter(this, void 0, void 0, function () {
            var err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        logDebugMessage("CaptchaStore load called - ".concat(this.state.state));
                        if (this.state.state === "loading" ||
                            this.state.state === "loaded" ||
                            this.state.state === "rendered" ||
                            this.state.state === "rendering") {
                            logDebugMessage("CaptchaStore load skipped - already in progress or done - ".concat(this.state.state));
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        if (this.state.state === "uninitialised") {
                            logDebugMessage("Initializing captcha from load");
                            this.captcha.init(getPluginConfig());
                            this.state = __assign(__assign({}, this.state), { state: this.captcha.state });
                            this.notifyListeners();
                        }
                        logDebugMessage("Setting state to loading");
                        this.state = __assign(__assign({}, this.state), { state: "loading" });
                        this.notifyListeners();
                        return [4 /*yield*/, this.captcha.load()];
                    case 2:
                        _a.sent();
                        this.state = __assign(__assign({}, this.state), { state: this.captcha.state });
                        logDebugMessage("CaptchaStore load completed - ".concat(this.state.state));
                        this.notifyListeners();
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        logDebugMessage("CaptchaStore load error - ".concat(getErrorMessage(err_1)));
                        this.state = __assign(__assign({}, this.state), { state: "error", error: getErrorMessage(err_1) });
                        this.notifyListeners();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, true];
                }
            });
        });
    };
    CaptchaStore.prototype.render = function () {
        return __awaiter(this, void 0, void 0, function () {
            var onSubmit, onError;
            var _this = this;
            return __generator(this, function (_a) {
                logDebugMessage("CaptchaStore render called - ".concat(this.state.state));
                if (this.state.state === "rendering" ||
                    this.state.state === "rendered" ||
                    this.state.state === "loading") {
                    logDebugMessage("CaptchaStore render skipped - ".concat(this.state.state));
                    return [2 /*return*/];
                }
                try {
                    logDebugMessage("Setting state to rendering");
                    this.state = __assign(__assign({}, this.state), { state: "rendering" });
                    this.notifyListeners();
                    onSubmit = function (token) {
                        logDebugMessage("Captcha token received");
                        _this.state = __assign(__assign({}, _this.state), { state: "rendered", error: null, token: token });
                        _this.notifyListeners();
                    };
                    onError = function (error) {
                        logDebugMessage("Captcha render error - ".concat(getErrorMessage(error)));
                        _this.state = __assign(__assign({}, _this.state), { state: "error", error: getErrorMessage(error) });
                        _this.notifyListeners();
                    };
                    this.captcha.render(onSubmit, onError);
                    this.state = __assign(__assign({}, this.state), { state: this.captcha.state });
                    logDebugMessage("CaptchaStore render completed - ".concat(this.state.state));
                    this.notifyListeners();
                }
                catch (err) {
                    logDebugMessage("CaptchaStore render error - ".concat(getErrorMessage(err)));
                    this.state = __assign(__assign({}, this.state), { state: "error", error: getErrorMessage(err) });
                    this.notifyListeners();
                }
                return [2 /*return*/];
            });
        });
    };
    CaptchaStore.prototype.notifyListeners = function () {
        this.listeners.forEach(function (listener) { return listener(); });
    };
    return CaptchaStore;
}());
var captchaStore = new CaptchaStore();
function getErrorMessage(error) {
    if (error instanceof Error) {
        return error.message;
    }
    if (typeof error === "string") {
        return error;
    }
    if (error && typeof error === "object" && "message" in error) {
        return String(error.message);
    }
    return String(error);
}

var CaptchaInputContainer = react.forwardRef(function (props, ref) {
    props.form; var rest = __rest(props, ["form"]);
    var containerId = useCaptchaInputContainerId();
    var loadAndRenderCaptcha = react.useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, captchaStore.load()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, captchaStore.render()];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); }, []);
    react.useEffect(function () {
        loadAndRenderCaptcha();
    }, [loadAndRenderCaptcha]);
    return (jsxRuntime.jsx("div", __assign({ ref: ref, id: containerId, style: { display: "inline-block", margin: "0 auto", paddingTop: "20px" } }, rest)));
});
CaptchaInputContainer.displayName = "CaptchaInputContainer";

function useCaptchaInputContainer() {
    return react.useMemo(function () {
        var config = getPluginConfig();
        if (config.InputContainer) {
            return config.InputContainer;
        }
        return CaptchaInputContainer;
    }, []);
}

function useCaptchaInputContainerId() {
    return react.useMemo(function () {
        var config = getPluginConfig();
        return config.inputContainerId || CAPTCHA_INPUT_CONTAINER_ID;
    }, []);
}

var EmailPasswordSignInForm = function () {
    return function (_a) {
        var DefaultComponent = _a.DefaultComponent, props = __rest(_a, ["DefaultComponent"]);
        var CaptchaContainer = useCaptchaInputContainer();
        return (jsxRuntime.jsx(DefaultComponent, __assign({}, props, { footer: jsxRuntime.jsx(CaptchaContainer, { form: "EmailPasswordSignInForm" }) })));
    };
};
var EmailPasswordSignUpForm = function () {
    return function (_a) {
        var DefaultComponent = _a.DefaultComponent, props = __rest(_a, ["DefaultComponent"]);
        var CaptchaContainer = useCaptchaInputContainer();
        return (jsxRuntime.jsx(DefaultComponent, __assign({}, props, { footer: jsxRuntime.jsx(jsxRuntime.Fragment, { children: jsxRuntime.jsx(CaptchaContainer, { form: "EmailPasswordSignUpForm" }) }) })));
    };
};
// export const EmailPasswordResetPasswordEmail = (): EmailPasswordComponentOverrideMap["EmailPasswordResetPasswordEmail_Override"] => {
//   return ({ DefaultComponent, ...props }) => {
//     return (
//       <DefaultComponent
//         {...props}
//         footer={
//           <>
//             <CaptchaContainer form="EmailPasswordResetPasswordEmail" />
//           </>
//         }
//       />
//     );
//   };
// };
//
// export const EmailPasswordSubmitNewPassword = (): EmailPasswordComponentOverrideMap["EmailPasswordSubmitNewPassword_Override"] => {
//   return ({ DefaultComponent, ...props }) => {
//     return (
//       <DefaultComponent
//         {...props}
//         footer={
//           <>
//             <CaptchaContainer form="EmailPasswordSubmitNewPassword" />
//           </>
//         }
//       />
//     );
//   };
// };
var PasswordlessEmailForm = function () {
    return function (_a) {
        var DefaultComponent = _a.DefaultComponent, props = __rest(_a, ["DefaultComponent"]);
        var CaptchaContainer = useCaptchaInputContainer();
        return (jsxRuntime.jsx(DefaultComponent, __assign({}, props, { footer: jsxRuntime.jsx(CaptchaContainer, { form: "PasswordlessEmailForm" }) })));
    };
};
var PasswordlessPhoneForm = function () {
    return function (_a) {
        var DefaultComponent = _a.DefaultComponent, props = __rest(_a, ["DefaultComponent"]);
        var CaptchaContainer = useCaptchaInputContainer();
        return (jsxRuntime.jsx(DefaultComponent, __assign({}, props, { footer: jsxRuntime.jsx(CaptchaContainer, { form: "PasswordlessPhoneForm" }) })));
    };
};
var PasswordlessEmailOrPhoneForm = function () {
    return function (_a) {
        var DefaultComponent = _a.DefaultComponent, props = __rest(_a, ["DefaultComponent"]);
        var CaptchaContainer = useCaptchaInputContainer();
        return (jsxRuntime.jsx(DefaultComponent, __assign({}, props, { footer: jsxRuntime.jsx(CaptchaContainer, { form: "PasswordlessEmailOrPhoneForm" }) })));
    };
};
// export const PasswordlessEPComboEmailForm = (): PasswordlessComponentOverrideMap["PasswordlessEPComboEmailForm_Override"] => {
//   return ({ DefaultComponent, ...props }) => {
//     return (
//       <DefaultComponent
//         {...props}
//         footer={
//           <>
//             <CaptchaContainer form="PasswordlessEPComboEmailForm" />
//           </>
//         }
//       />
//     );
//   };
// };
// export const PasswordlessEPComboEmailOrPhoneForm = (): PasswordlessComponentOverrideMap["PasswordlessEPComboEmailOrPhoneForm_Override"] => {
//   return ({ DefaultComponent, ...props }) => {
//     return (
//       <DefaultComponent
//         {...props}
//         footer={
//           <>
//             <CaptchaContainer form="PasswordlessEPComboEmailOrPhoneForm" />
//           </>
//         }
//       />
//     );
//   };
// };
var PasswordlessUserInputCodeForm = function () {
    return function (_a) {
        var DefaultComponent = _a.DefaultComponent, props = __rest(_a, ["DefaultComponent"]);
        var CaptchaContainer = useCaptchaInputContainer();
        return (jsxRuntime.jsx(DefaultComponent, __assign({}, props, { footer: jsxRuntime.jsx(CaptchaContainer, { form: "PasswordlessUserInputForm" }) })));
    };
};
var TOTPCodeForm = function () {
    return function (_a) {
        var DefaultComponent = _a.DefaultComponent, props = __rest(_a, ["DefaultComponent"]);
        var CaptchaContainer = useCaptchaInputContainer();
        return (jsxRuntime.jsx(DefaultComponent, __assign({}, props, { footer: jsxRuntime.jsx(CaptchaContainer, { form: "TOTPCodeForm" }) })));
    };
};

var init = function (config) {
    setPluginConfig(config);
    return {
        id: PLUGIN_ID,
        init: function (config) {
            validatePublicConfig(config);
        },
        overrideMap: {
            emailpassword: {
                config: function (config) {
                    return __assign(__assign({}, config), { preAPIHook: captcha.preAPIHook });
                },
                components: {
                    EmailPasswordSignInForm_Override: EmailPasswordSignInForm(),
                    EmailPasswordSignUpForm_Override: EmailPasswordSignUpForm(),
                },
            },
            passwordless: {
                config: function (config) {
                    return __assign(__assign({}, config), { preAPIHook: captcha.preAPIHook });
                },
                components: {
                    PasswordlessEmailForm_Override: PasswordlessEmailForm(),
                    PasswordlessPhoneForm_Override: PasswordlessPhoneForm(),
                    PasswordlessEmailOrPhoneForm_Override: PasswordlessEmailOrPhoneForm(),
                    PasswordlessUserInputCodeForm_Override: PasswordlessUserInputCodeForm(),
                },
            },
            totp: {
                config: function (config) {
                    return __assign(__assign({}, config), { preAPIHook: captcha.preAPIHook });
                },
                components: {
                    TOTPCodeForm_Override: TOTPCodeForm(),
                },
            },
        },
    };
};

var index = { init: init };

exports.PLUGIN_ID = PLUGIN_ID;
exports.default = index;
exports.init = init;
exports.useCaptcha = useCaptcha;
exports.useCaptchaInputContainer = useCaptchaInputContainer;
exports.useCaptchaInputContainerId = useCaptchaInputContainerId;
