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

var PLUGIN_ID = "supertokens-plugin-user-banning";

var post = function (basePath) { return function (path_1, body_1, _a) { return __awaiter(void 0, [path_1, body_1, _a], void 0, function (path, body, _b) {
    var queryParams, url, credentials, response, error_1, newError, payload, error, newError, payload;
    var withSession = _b.withSession, params = _b.params;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                queryParams = params
                    ? "?".concat(new URLSearchParams(params).toString())
                    : "";
                url = "".concat(basePath).concat(path).concat(queryParams);
                credentials = {};
                if (withSession) {
                    credentials.credentials = "include";
                }
                _c.label = 1;
            case 1:
                _c.trys.push([1, 3, , 4]);
                return [4 /*yield*/, fetch(url, __assign(__assign({}, credentials), { method: "POST", headers: {
                            "Content-type": "application/json",
                            Accept: "application/json",
                        }, body: JSON.stringify(body) }))];
            case 2:
                response = _c.sent();
                return [3 /*break*/, 4];
            case 3:
                error_1 = _c.sent();
                newError = new Error("Fetch failed: ".concat(error_1));
                payload = error_1;
                try {
                    payload = JSON.parse(error_1);
                }
                catch (e) { }
                // @ts-ignore
                newError.payload = payload;
                throw newError;
            case 4:
                if (!!response.ok) return [3 /*break*/, 6];
                return [4 /*yield*/, response.text()];
            case 5:
                error = _c.sent();
                newError = new Error("Fetch failed: ".concat(error));
                payload = error;
                try {
                    payload = JSON.parse(error);
                }
                catch (e) { }
                // @ts-ignore
                newError.payload = payload;
                throw newError;
            case 6: return [2 /*return*/, response.json()];
        }
    });
}); }; };
var get = function (basePath) { return function (path_1, _a) { return __awaiter(void 0, [path_1, _a], void 0, function (path, _b) {
    var queryParams, url, credentials, response, error_2, newError, payload, error, newError, payload;
    var withSession = _b.withSession, params = _b.params;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                queryParams = params
                    ? "?".concat(new URLSearchParams(params).toString())
                    : "";
                url = "".concat(basePath).concat(path).concat(queryParams);
                credentials = {};
                if (withSession) {
                    credentials.credentials = "include";
                }
                _c.label = 1;
            case 1:
                _c.trys.push([1, 3, , 4]);
                return [4 /*yield*/, fetch(url, __assign(__assign({}, credentials), { method: "GET", headers: {
                            "Content-type": "application/json",
                            Accept: "application/json",
                        } }))];
            case 2:
                response = _c.sent();
                return [3 /*break*/, 4];
            case 3:
                error_2 = _c.sent();
                newError = new Error("Fetch failed: ".concat(error_2));
                payload = error_2;
                try {
                    payload = JSON.parse(error_2);
                }
                catch (e) { }
                // @ts-ignore
                newError.payload = payload;
                throw newError;
            case 4:
                if (!!response.ok) return [3 /*break*/, 6];
                return [4 /*yield*/, response.text()];
            case 5:
                error = _c.sent();
                newError = new Error("Fetch failed: ".concat(error));
                payload = error;
                try {
                    payload = JSON.parse(error);
                }
                catch (e) { }
                // @ts-ignore
                newError.payload = payload;
                throw newError;
            case 6: return [2 /*return*/, response.json()];
        }
    });
}); }; };
var getQuerier = function (basePath) {
    return { get: get(basePath), post: post(basePath) };
};
var useQuerier = function (basePath) {
    var querier = react.useMemo(function () { return getQuerier(basePath); }, [basePath]);
    return querier;
};

var styles = ".supertokens-plugin-user-banning .container {\n  margin: 12px auto;\n  margin-top: 26px;\n  margin-bottom: 26px;\n  width: 420px;\n  text-align: center;\n  border-radius: 8px;\n  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.16);\n  background-color: rgb(255, 255, 255);\n}\n\n.supertokens-plugin-user-banning .row {\n  margin: 0 auto;\n  width: 76%;\n  padding-top: 30px;\n  padding-bottom: 10px;\n}\n\n.supertokens-plugin-user-banning .headerTitle {\n  font-size: 24px;\n  line-height: 27.6px;\n  letter-spacing: 0.58px;\n  font-weight: 700;\n  margin-bottom: 20px;\n  color: rgb(0, 0, 0);\n}\n\n.supertokens-plugin-user-banning .divider {\n  margin-top: 1.5em;\n  margin-bottom: 1.5em;\n  border-bottom: 0.3px solid #dddddd;\n  align-items: center;\n  padding-bottom: 5px;\n}\n\n.supertokens-plugin-user-banning .formRow {\n  display: flex;\n  flex-direction: column;\n  padding-top: 0px;\n  padding-bottom: 20px;\n}\n\n.supertokens-plugin-user-banning .formRow .label {\n  text-align: left;\n  font-weight: 700;\n  font-size: 12px;\n  line-height: 24px;\n  color: rgb(0, 0, 0);\n}\n\n.supertokens-plugin-user-banning .formRow .inputContainer {\n  margin-top: 6px;\n}\n\n.supertokens-plugin-user-banning .formRow .inputWrapper {\n  box-sizing: border-box;\n  width: 100%;\n  display: flex;\n  align-items: center;\n  background-color: rgb(250, 250, 250);\n  height: 34px;\n  border-radius: 6px;\n  border: 1px solid rgb(224, 224, 224);\n}\n\n.supertokens-plugin-user-banning .formRow input {\n  box-sizing: border-box;\n  padding-left: 15px;\n  filter: none;\n  color: rgb(0, 0, 0);\n  background-color: transparent;\n  border-radius: 6px;\n  font-size: 14px;\n  border: none;\n  padding-right: 25px;\n  letter-spacing: 1.2px;\n  flex: 9 1 75%;\n  width: 75%;\n  height: 32px;\n  -webkit-text-fill-color: rgb(0, 0, 0);\n}\n\n.supertokens-plugin-user-banning .formRow input:focus {\n  border: none;\n  outline: none;\n}\n\n.supertokens-plugin-user-banning .button {\n  font-family: \"Arial\", sans-serif;\n  background-color: rgb(28, 34, 42);\n  color: rgb(255, 255, 255);\n  width: 100%;\n  height: 34px;\n  font-weight: 600;\n  border-width: 1px;\n  border-style: solid;\n  border-radius: 6px;\n  border-color: rgb(45, 54, 68);\n  background-position: center;\n  transition: all 0.4s;\n  background-size: 12000%;\n  cursor: pointer;\n}\n\n.supertokens-plugin-user-banning .button:disabled {\n  border: none;\n  cursor: no-drop;\n  opacity: 0.7;\n}\n\n.generalError {\n  background: rgb(255, 241, 235);\n  padding-top: 10px;\n  padding-bottom: 10px;\n  margin-bottom: 10px;\n  margin-top: 24px;\n  padding-left: 18px;\n  padding-right: 18px;\n  letter-spacing: 0.2px;\n  font-size: 14px;\n  border-radius: 8px;\n  color: rgb(255, 23, 23);\n  animation: swing-in-top-fwd 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n  word-wrap: break-word;\n}\n";

var getErrorMessage = function (error) {
    if (typeof error.payload.message === "string") {
        return error.payload.message;
    }
    else if (typeof (error === null || error === void 0 ? void 0 : error.message) === "string") {
        return error.message;
    }
    else if (error) {
        try {
            return "Unknown error: " + JSON.stringify(error);
        }
        catch (e) {
            return "Unknown error";
        }
    }
    return;
};

var ThemeBase = function (_a) {
    var children = _a.children, userStyles = _a.userStyles;
    return (jsxRuntime.jsxs(react.Fragment, { children: [children, jsxRuntime.jsx("style", { children: userStyles.join("\n") })] }));
};

// todo: feedback: it would be useful to be able to use the supertokens components (buttons, inputs, boxes, cards, forms, etc).
function BanUserPage(props) {
    var _a = react.useState(), error = _a[0], setError = _a[1];
    var _b = react.useState("public"), tenantId = _b[0], setTenantId = _b[1];
    var _c = react.useState(), email = _c[0], setEmail = _c[1];
    var _d = react.useState(null), banStatus = _d[0], setBanStatus = _d[1];
    var querier = useQuerier(props.apiDomain);
    var scheduleErrorReset = react.useCallback(function () {
        setTimeout(function () {
            setError(undefined);
        }, 10000);
    }, []);
    var onError = react.useCallback(function (error) {
        setError(getErrorMessage(error));
        scheduleErrorReset();
    }, [scheduleErrorReset]);
    var getBanStatus = react.useCallback(function (email) {
        return querier
            .get("/plugin/supertokens-plugin-user-banning/ban", {
            withSession: true,
            params: { tenantId: tenantId, email: email },
        })
            .then(function (res) {
            setError(undefined);
            setBanStatus(res.banned);
        })
            .catch(onError);
    }, [querier, tenantId]);
    var updateBanStatus = react.useCallback(function (isBanned) {
        return querier
            .post("/plugin/supertokens-plugin-user-banning/ban", {
            email: email,
            isBanned: isBanned,
        }, {
            withSession: true,
            params: { tenantId: tenantId },
        })
            .then(function () {
            setError(undefined);
            setBanStatus(isBanned);
        })
            .catch(onError);
    }, [querier, tenantId, email]);
    var onCheckStatus = react.useCallback(function (e) {
        e.preventDefault();
        if (!email) {
            setError("Email is required");
            return;
        }
        getBanStatus(email);
    }, [getBanStatus, email]);
    var onBanUser = react.useCallback(function (e) {
        e.preventDefault();
        updateBanStatus(true);
    }, [updateBanStatus, email]);
    var onUnbanUser = react.useCallback(function (e) {
        e.preventDefault();
        if (!email) {
            setError("Email is required");
            return;
        }
        updateBanStatus(false);
    }, [updateBanStatus, email]);
    return (jsxRuntime.jsx(ThemeBase, { userStyles: [styles], children: jsxRuntime.jsx("div", { className: "supertokens-plugin-user-banning", children: jsxRuntime.jsx("div", { className: "container", children: jsxRuntime.jsxs("div", { className: "row", children: [jsxRuntime.jsx("div", { className: "headerTitle", children: "Ban User" }), jsxRuntime.jsx("p", { children: "This page is used to ban and unban users. It is useful for preventing users from accessing your application." }), jsxRuntime.jsx("div", { className: "divider" }), !!error && jsxRuntime.jsx("div", { className: "generalError", children: error }), jsxRuntime.jsxs("form", { noValidate: true, children: [jsxRuntime.jsxs("div", { className: "formRow", children: [jsxRuntime.jsx("div", { className: "label", children: "Tenant ID" }), jsxRuntime.jsx("div", { className: "inputContainer", children: jsxRuntime.jsx("div", { className: "inputWrapper", children: jsxRuntime.jsx("input", { type: "text", value: tenantId, autoComplete: "on", placeholder: "Tenant ID", onChange: function (e) { return setTenantId(e.target.value); } }) }) })] }), jsxRuntime.jsxs("div", { className: "formRow", children: [jsxRuntime.jsx("div", { className: "label", children: "User Email" }), jsxRuntime.jsx("div", { className: "inputContainer", children: jsxRuntime.jsx("div", { className: "inputWrapper", children: jsxRuntime.jsx("input", { type: "email", value: email, disabled: !tenantId, autoComplete: "on", placeholder: "User Email", onChange: function (e) { return setEmail(e.target.value); } }) }) })] }), jsxRuntime.jsx("div", { className: "formRow", children: jsxRuntime.jsxs("button", { className: "button", onClick: onCheckStatus, disabled: !(!!tenantId && !!email), children: ["Check Status (", typeof banStatus === "boolean" ? (banStatus ? (jsxRuntime.jsx("span", { style: { color: "red" }, children: "Banned" })) : (jsxRuntime.jsx("span", { style: { color: "green" }, children: "Not Banned" }))) : (" - "), ")"] }) }), typeof banStatus === "boolean" && (jsxRuntime.jsxs("div", { className: "formRow", style: { flexDirection: "row" }, children: [jsxRuntime.jsx("button", { className: "button", disabled: banStatus, onClick: onBanUser, style: { marginRight: "20px" }, children: "Ban" }), jsxRuntime.jsx("button", { className: "button", disabled: !banStatus, onClick: onUnbanUser, children: "Unban" })] }))] })] }) }) }) }));
}

// todo: feedback: need some util for calling the custom plugin api
var init = function (_a) {
    var apiDomain = _a.apiDomain;
    return {
        id: PLUGIN_ID,
        routeHandlers: [
            {
                path: "/admin/ban-user",
                // todo: feedback: it would be useful for the handler to have access to the st instance config, otherwise it's not possible to get the base path
                handler: function () { return BanUserPage.call(null, { apiDomain: apiDomain }); },
            },
        ],
        overrideMap: {
            emailpassword: {
                functions: function (originalImplementation) {
                    var _this = this;
                    return __assign(__assign({}, originalImplementation), { signUp: function (input) {
                            console.log("signUp", input);
                            return originalImplementation.signUp(input);
                        }, signIn: function (input) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                console.log("signIn", input);
                                return [2 /*return*/, originalImplementation.signIn(input)];
                            });
                        }); } });
                },
            },
            session: {
                recipeInitRequired: true,
                functions: function (originalImplementation) {
                    return __assign(__assign({}, originalImplementation), { signOut: function (input) {
                            console.log("signOut", input);
                            return originalImplementation.signOut(input);
                        } });
                },
            },
        },
    };
};

var index = { init: init };

exports.PLUGIN_ID = PLUGIN_ID;
exports.default = index;
exports.init = init;
