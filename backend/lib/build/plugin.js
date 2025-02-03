"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const config_1 = require("./config");
const axios_1 = __importDefault(require("axios"));
const init = (config) => {
  console.log(config);
  return {
    id: config_1.PLUGIN_ID,
    compatibleSDKVersions: config_1.PLUGIN_SDK_VERSION,
    routeHandlers: [],
    overrideMap: {
      emailpassword: {
        apis: (originalImplementation) => {
          if (!originalImplementation.signInPOST) {
            return originalImplementation;
          } else {
            return Object.assign(Object.assign({}, originalImplementation), {
              signInPOST: async (input) => {
                var _a, _b, _c;
                console.log(input);
                const body = await input.options.req.getJSONBody();
                console.log("body", body);
                const captcha = "captcha" in body ? body.captcha : null;
                if (!captcha) {
                  return {
                    status: "GENERAL_ERROR",
                    message: "CAPTCHA verification is required",
                  };
                }
                let result;
                if (config.type === "reCAPTCHAv3") {
                  result = await axios_1.default.post(
                    `https://www.google.com/recaptcha/api/siteverify?secret=${
                      (_a = config.reCAPTCHAv3) === null || _a === void 0
                        ? void 0
                        : _a.secretKey
                    }&response=${captcha}`
                  );
                } else if (config.type === "reCAPTCHAv2") {
                  result = await axios_1.default.post(
                    `https://www.google.com/recaptcha/api/siteverify?secret=${
                      (_b = config.reCAPTCHAv2) === null || _b === void 0
                        ? void 0
                        : _b.secretKey
                    }&response=${captcha}`
                  );
                } else if (config.type === "turnstile") {
                  result = await axios_1.default.post(
                    `https://challenges.cloudflare.com/turnstile/v0/siteverify`,
                    {
                      secret:
                        (_c = config.turnstile) === null || _c === void 0
                          ? void 0
                          : _c.secretKey,
                      response: captcha,
                    }
                  );
                } else {
                  return originalImplementation.signInPOST(input);
                }
                console.log(result.data);
                if (result.data.success) {
                  return originalImplementation.signInPOST(input);
                } else {
                  return {
                    status: "GENERAL_ERROR",
                    message: "CAPTCHA verification failed",
                  };
                }
              },
            });
          }
        },
      },
    },
  };
};
exports.init = init;
