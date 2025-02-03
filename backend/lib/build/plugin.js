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
                var _a;
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
                const result = await axios_1.default.post(
                  `https://www.google.com/recaptcha/api/siteverify?secret=${
                    (_a = config.reCAPTCHAv3) === null || _a === void 0
                      ? void 0
                      : _a.secretKey
                  }&response=${captcha}`
                );
                console.log(result.data);
                if (result.data.success) {
                  // @ts-ignore
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
