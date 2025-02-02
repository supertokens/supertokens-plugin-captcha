import { SuperTokensPlugin } from "supertokens-auth-react/lib/build/types";
import { PLUGIN_ID } from "./config";
import { EmailPasswordSignInForm } from "./components";

// add config for:
// - site key
// - action
// - when to show captcha
// - timeout for captcha loading
export const init = ({ key }: { key: string }): SuperTokensPlugin => {
  return {
    id: PLUGIN_ID,
    overrideMap: {
      emailpassword: {
        functions(originalImplementation) {
          return {
            ...originalImplementation,
            signIn: (input) => {
              // this is correct because we use a timeout for returning from the signIn function
              // @ts-ignore
              return new Promise((resolve, reject) => {
                console.log("signIn");

                let captchaTimedOut = false;

                if (!("grecaptcha" in window)) {
                  console.log("captcha not loaded");
                  console.log("grecaptcha not found");
                  return originalImplementation.signIn(input);
                }

                const captchaTimeoutHandle = setTimeout(() => {
                  console.log("captcha timeout");
                  reject(new Error("Could not load CAPTCHA"));
                  captchaTimedOut = true;
                }, 10 * 1000);

                // @ts-expect-error plm
                window.grecaptcha.ready(function () {
                  clearTimeout(captchaTimeoutHandle);

                  if (captchaTimedOut) {
                    console.log("captcha recovered from timeout");
                    return;
                  }

                  console.log("captcha ready");
                  // @ts-expect-error plm
                  window.grecaptcha
                    .execute("6Lc54coqAAAAAP_61uZTO4DiDxiQ_pWjccGC1_QC", {
                      action: "submit",
                    })
                    .then((token: string) => {
                      return originalImplementation.signIn({
                        ...input,
                        options: {
                          preAPIHook: async (input) => {
                            try {
                              const payload = JSON.parse(
                                input.requestInit.body as string
                              );
                              payload.captcha = token;
                              input.requestInit.body = JSON.stringify(payload);
                              return input;
                            } catch (error) {
                              console.log("error", error);
                              return input;
                            }
                          },
                        },
                      });
                    })
                    .then(resolve)
                    .catch(reject);
                });
              });
            },
          };
        },
        components: {
          EmailPasswordSignInForm_Override: EmailPasswordSignInForm(key),
        },
      },
    },
  };
};
