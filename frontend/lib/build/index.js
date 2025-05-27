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

var loadedScripts = {};
var loadScript = function (url, _a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.async, async = _c === void 0 ? false : _c, _d = _b.defer, defer = _d === void 0 ? false : _d;
    return new Promise(function (resolve, reject) {
        if (loadedScripts[url])
            return resolve();
        var script = document.createElement("script");
        script.type = "application/javascript";
        script.async = async;
        script.defer = defer;
        script.src = url;
        script.onload = function () {
            loadedScripts[url] = true;
            resolve();
        };
        script.onerror = function (e) {
            delete loadedScripts[url];
            reject(e);
        };
        document.head.appendChild(script);
    });
};

var useCaptcha = function (_a) {
    var targetRef = _a.targetRef, config = __rest(_a, ["targetRef"]);
    var _b = react.useState(null), token = _b[0], setToken = _b[1];
    var _c = react.useState(false), loaded = _c[0], setLoaded = _c[1];
    var updateToken = react.useCallback(function (token) {
        setToken(token);
    }, []);
    var load_reCAPTCHAv2 = react.useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
        var onLoad;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    onLoad = function () {
                        var _a;
                        if (loaded)
                            return;
                        setLoaded(true);
                        // todo: add typings
                        // @ts-ignore
                        window.grecaptcha.render(targetRef.current, {
                            sitekey: (_a = config.reCAPTCHAv2) === null || _a === void 0 ? void 0 : _a.siteKey,
                            callback: updateToken,
                        });
                    };
                    // @ts-ignore
                    window.onLoad_reCAPTCHAv2 = onLoad;
                    return [4 /*yield*/, loadScript("http://www.google.com/recaptcha/api.js?onload=onLoad_reCAPTCHAv2&render=explicit", {
                            async: true,
                            defer: true,
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); }, [config, targetRef, loaded]);
    var load_reCAPTCHAv3 = react.useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, loadScript("https://www.google.com/recaptcha/api.js?render=".concat((_a = config.reCAPTCHAv3) === null || _a === void 0 ? void 0 : _a.siteKey), {
                        async: true,
                        defer: true,
                    })];
                case 1:
                    _b.sent();
                    setLoaded(true);
                    return [2 /*return*/];
            }
        });
    }); }, [config, targetRef, loaded]);
    var load_turnstile = react.useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
        var onLoad;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    onLoad = function () {
                        var _a;
                        if (loaded)
                            return;
                        setLoaded(true);
                        // todo: add typings
                        // @ts-ignore
                        window.turnstile.render(targetRef === null || targetRef === void 0 ? void 0 : targetRef.current, {
                            sitekey: (_a = config.turnstile) === null || _a === void 0 ? void 0 : _a.siteKey,
                            callback: updateToken,
                        });
                    };
                    // @ts-ignore
                    window.onLoad_turnstile = onLoad;
                    return [4 /*yield*/, loadScript("https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onLoad_turnstile", {
                            async: true,
                            defer: true,
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); }, [config, targetRef, loaded]);
    var load = react.useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (config.type === "turnstile")
                return [2 /*return*/, load_turnstile()];
            if (config.type === "reCAPTCHAv2")
                return [2 /*return*/, load_reCAPTCHAv2()];
            if (config.type === "reCAPTCHAv3")
                return [2 /*return*/, load_reCAPTCHAv3()];
            throw new Error("Unsupported CAPTCHA");
        });
    }); }, [config]);
    var preAPIHook = react.useCallback(function (input) { return __awaiter(void 0, void 0, void 0, function () {
        var payload, token_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!loaded) {
                        throw new Error("CAPTCHA not loaded");
                    }
                    try {
                        payload = JSON.parse(input.requestInit.body);
                    }
                    catch (e) {
                        console.error(e);
                        throw new Error("Error setting CAPTCHA token");
                    }
                    if (config.type === "turnstile") {
                        payload.captcha = token || undefined;
                    }
                    if (config.type === "reCAPTCHAv2") {
                        payload.captcha = token || undefined;
                    }
                    if (!(config.type === "reCAPTCHAv3")) return [3 /*break*/, 2];
                    return [4 /*yield*/, new Promise(function (resolve, reject) {
                            // @ts-ignore
                            window.grecaptcha.ready(function () {
                                var _a;
                                // @ts-ignore
                                window.grecaptcha
                                    .execute((_a = config.reCAPTCHAv3) === null || _a === void 0 ? void 0 : _a.siteKey, { action: "submit" })
                                    .then(resolve)
                                    .catch(reject);
                            });
                        })];
                case 1:
                    token_1 = _a.sent();
                    payload.captcha = token_1;
                    _a.label = 2;
                case 2:
                    if (!payload.captcha) {
                        throw new Error("Error setting CAPTCHA token");
                    }
                    payload.captchaType = config.type;
                    input.requestInit.body = JSON.stringify(payload);
                    return [2 /*return*/, input];
            }
        });
    }); }, [token, loaded]);
    return {
        load: load,
        loaded: loaded,
        token: token,
        preAPIHook: preAPIHook,
    };
};

var EmailPasswordSignInForm = function (config) {
    return function (_a) {
        var DefaultComponent = _a.DefaultComponent, props = __rest(_a, ["DefaultComponent"]);
        var captchaContainerRef = react.useRef(null);
        var captcha = useCaptcha(__assign({ targetRef: captchaContainerRef }, config));
        react.useEffect(function () {
            captcha.load();
        }, []);
        return (jsxRuntime.jsx(DefaultComponent, __assign({}, props, { recipeImplementation: __assign(__assign({}, props.recipeImplementation), { signIn: function (input) {
                    return props.recipeImplementation.signIn(__assign(__assign({}, input), { options: {
                            preAPIHook: captcha.preAPIHook,
                        } }));
                } }), footer: jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [captcha.loaded && jsxRuntime.jsx("br", {}), jsxRuntime.jsx("div", { id: "captcha-container", ref: captchaContainerRef, style: { display: "inline-block", margin: "0 auto" } })] }) })));
    };
};

// todo: feedback need a callback for init:
// - need to throw error if shadow dom is used
// todo: feedback need access to the config so we can detect use of shadowdom
// add config for:
// - action
// - when to show captcha
var init = function (config) {
    return {
        id: PLUGIN_ID,
        overrideMap: {
            emailpassword: {
                components: {
                    EmailPasswordSignInForm_Override: EmailPasswordSignInForm(__assign({}, config)),
                },
            },
        },
    };
};

var index = { init: init };

exports.PLUGIN_ID = PLUGIN_ID;
exports.default = index;
exports.init = init;
