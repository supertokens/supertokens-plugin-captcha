"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

var jsxRuntime = require("react/jsx-runtime");
var react = require("react");

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

var __assign = function () {
  __assign =
    Object.assign ||
    function __assign(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s)
          if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
      return t;
    };
  return __assign.apply(this, arguments);
};

function __rest(s, e) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (
        e.indexOf(p[i]) < 0 &&
        Object.prototype.propertyIsEnumerable.call(s, p[i])
      )
        t[p[i]] = s[p[i]];
    }
  return t;
}

function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P
      ? value
      : new P(function (resolve) {
          resolve(value);
        });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done
        ? resolve(result.value)
        : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}

function __generator(thisArg, body) {
  var _ = {
      label: 0,
      sent: function () {
        if (t[0] & 1) throw t[1];
        return t[1];
      },
      trys: [],
      ops: [],
    },
    f,
    y,
    t,
    g = Object.create(
      (typeof Iterator === "function" ? Iterator : Object).prototype
    );
  return (
    (g.next = verb(0)),
    (g["throw"] = verb(1)),
    (g["return"] = verb(2)),
    typeof Symbol === "function" &&
      (g[Symbol.iterator] = function () {
        return this;
      }),
    g
  );
  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");
    while ((g && ((g = 0), op[0] && (_ = 0)), _))
      try {
        if (
          ((f = 1),
          y &&
            (t =
              op[0] & 2
                ? y["return"]
                : op[0]
                ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                : y.next) &&
            !(t = t.call(y, op[1])).done)
        )
          return t;
        if (((y = 0), t)) op = [op[0] & 2, t.value];
        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;
          case 4:
            _.label++;
            return { value: op[1], done: false };
          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;
          case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;
          default:
            if (
              !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
              (op[0] === 6 || op[0] === 2)
            ) {
              _ = 0;
              continue;
            }
            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
              _.label = op[1];
              break;
            }
            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            if (t[2]) _.ops.pop();
            _.trys.pop();
            continue;
        }
        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    if (op[0] & 5) throw op[1];
    return { value: op[0] ? op[1] : void 0, done: true };
  }
}

typeof SuppressedError === "function"
  ? SuppressedError
  : function (error, suppressed, message) {
      var e = new Error(message);
      return (
        (e.name = "SuppressedError"),
        (e.error = error),
        (e.suppressed = suppressed),
        e
      );
    };

var PLUGIN_ID = "supertokens-plugin-captcha";

var loadedScripts = {};
var loadScript = function (url, _a) {
  var _b = _a === void 0 ? {} : _a,
    _c = _b.once,
    once = _c === void 0 ? true : _c,
    _d = _b.async,
    async = _d === void 0 ? false : _d,
    _e = _b.defer,
    defer = _e === void 0 ? false : _e;
  return new Promise(function (resolve, reject) {
    if (once && loadedScripts[url]) {
      return resolve();
    }
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

var EmailPasswordSignInForm = function (config) {
  return function (_a) {
    var DefaultComponent = _a.DefaultComponent,
      props = __rest(_a, ["DefaultComponent"]);
    var _b = react.useState(false),
      captchaLoaded = _b[0],
      setCaptchaLoaded = _b[1];
    console.log("overrides/EmailPasswordSignInForm");
    var captchaContainerRef = react.useRef(null);
    console.log(captchaLoaded);
    var loadCaptcha = react.useCallback(function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var e_1;
        var _a, _b;
        return __generator(this, function (_c) {
          switch (_c.label) {
            case 0:
              console.log("captcha loading");
              if (!(config.type === "reCAPTCHAv3")) return [3 /*break*/, 5];
              _c.label = 1;
            case 1:
              _c.trys.push([1, 3, , 4]);
              return [
                4 /*yield*/,
                loadScript(
                  "https://www.google.com/recaptcha/api.js?render=".concat(
                    config.type === "reCAPTCHAv3"
                      ? (_a = config.reCAPTCHAv3) === null || _a === void 0
                        ? void 0
                        : _a.siteKey
                      : (_b = config.reCAPTCHAv2) === null || _b === void 0
                      ? void 0
                      : _b.siteKey
                  )
                ),
              ];
            case 2:
              _c.sent();
              setCaptchaLoaded(true);
              console.log("captcha loaded");
              return [3 /*break*/, 4];
            case 3:
              e_1 = _c.sent();
              console.error(e_1);
              return [3 /*break*/, 4];
            case 4:
              return [3 /*break*/, 7];
            case 5:
              if (!(config.type === "reCAPTCHAv2")) return [3 /*break*/, 7];
              console.log(config.type, "captcha loading");
              // @ts-ignore
              window.onCaptchaLoad = function () {
                var _a;
                setCaptchaLoaded(true);
                console.log(config.type, "captcha callback loaded");
                // @ts-ignore
                window.grecaptcha.render(
                  captchaContainerRef === null || captchaContainerRef === void 0
                    ? void 0
                    : captchaContainerRef.current,
                  {
                    sitekey:
                      (_a = config.reCAPTCHAv2) === null || _a === void 0
                        ? void 0
                        : _a.siteKey,
                    callback: function () {
                      var params = [];
                      for (var _i = 0; _i < arguments.length; _i++) {
                        params[_i] = arguments[_i];
                      }
                      console.log("captcha render callback", params);
                    },
                  }
                );
              };
              return [
                4 /*yield*/,
                loadScript(
                  "https://www.google.com/recaptcha/api.js?onload=onCaptchaLoad&render=explicit",
                  {
                    async: true,
                    defer: true,
                    once: true,
                  }
                ),
              ];
            case 6:
              _c.sent();
              console.log(config.type, "captcha loaded");
              _c.label = 7;
            case 7:
              return [2 /*return*/];
          }
        });
      });
    }, []);
    react.useEffect(function () {
      loadCaptcha();
    }, []);
    return jsxRuntime.jsx(
      DefaultComponent,
      __assign({}, props, {
        footer: jsxRuntime.jsx("div", {
          id: "captcha-container",
          ref: captchaContainerRef,
        }),
        config: __assign(__assign({}, props.config), {
          override: {
            functions: function (originalImplementation) {
              return __assign(__assign({}, originalImplementation), {
                signIn: function (input) {
                  return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                      console.log(config.type, "signIn", input);
                      return [
                        2 /*return*/,
                        originalImplementation.signIn(input),
                      ];
                    });
                  });
                },
              });
            },
          },
        }),
      })
    );
  };
};

// add config for:
// - site key
// - action
// - when to show captcha
// - timeout for captcha loading
var init = function (config) {
  var captchaContainer = document.createElement("div");
  captchaContainer.id = "captcha-container";
  return {
    id: PLUGIN_ID,
    overrideMap: {
      emailpassword: {
        // functions(originalImplementation) {
        //   return {
        //     ...originalImplementation,
        //     signIn: (input) => {
        //       // this is correct because we use a timeout for returning from the signIn function
        //       // @ts-ignore
        //       return new Promise((resolve, reject) => {
        //         if (config.type === "reCAPTCHAv3") {
        //           let captchaTimedOut = false;
        //           if (!("grecaptcha" in window)) {
        //             console.log("captcha not loaded");
        //             console.log("grecaptcha not found");
        //             return originalImplementation.signIn(input);
        //           }
        //           const captchaTimeoutHandle = setTimeout(() => {
        //             console.log("captcha timeout");
        //             reject(new Error("Could not load CAPTCHA"));
        //             captchaTimedOut = true;
        //           }, 10 * 1000);
        //           // @ts-expect-error plm
        //           window.grecaptcha.ready(function () {
        //             clearTimeout(captchaTimeoutHandle);
        //             if (captchaTimedOut) {
        //               console.log("captcha recovered from timeout");
        //               return;
        //             }
        //             console.log("captcha ready");
        //             // @ts-expect-error plm
        //             window.grecaptcha
        //               .execute(config.reCAPTCHAv3?.siteKey, {
        //                 action: "submit",
        //               })
        //               .then((token: string) => {
        //                 return originalImplementation.signIn({
        //                   ...input,
        //                   options: {
        //                     preAPIHook: async (input) => {
        //                       try {
        //                         const payload = JSON.parse(
        //                           input.requestInit.body as string
        //                         );
        //                         payload.captcha = token;
        //                         input.requestInit.body = JSON.stringify(
        //                           payload
        //                         );
        //                         return input;
        //                       } catch (error) {
        //                         console.log("error", error);
        //                         return input;
        //                       }
        //                     },
        //                   },
        //                 });
        //               })
        //               .then(resolve)
        //               .catch(reject);
        //           });
        //         } else if (config.type === "reCAPTCHAv2") {
        //           // @ts-expect-error plm
        //           window.grecaptcha.render(captchaContainer.id, {
        //             sitekey: config.reCAPTCHAv3?.siteKey,
        //           });
        //         } else {
        //           return originalImplementation.signIn(input);
        //         }
        //       });
        //     },
        //   };
        // },
        components: {
          EmailPasswordSignInForm_Override: EmailPasswordSignInForm(
            __assign({}, config)
          ),
        },
      },
    },
  };
};

var index = { init: init };

exports.PLUGIN_ID = PLUGIN_ID;
exports.default = index;
exports.init = init;
