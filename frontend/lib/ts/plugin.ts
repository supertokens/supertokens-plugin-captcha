import { SuperTokensPlugin } from "supertokens-auth-react/lib/build/types";
import { PLUGIN_ID } from "./config";
import { EmailPasswordSignInForm } from "./components";

// todo: feedback: need some util for calling the custom plugin api

export const init = ({
  apiDomain,
}: {
  apiDomain: string;
  websiteDomain: string;
}): SuperTokensPlugin => {
  return {
    id: PLUGIN_ID,
    overrideMap: {
      emailpassword: {
        components: {
          EmailPasswordSignInForm_Override: EmailPasswordSignInForm,
        },
      },
    },
  };
};
