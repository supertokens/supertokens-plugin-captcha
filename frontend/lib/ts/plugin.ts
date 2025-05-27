import { SuperTokensPlugin } from 'supertokens-auth-react/lib/build/types';
import { PLUGIN_ID } from './config';
import { EmailPasswordSignInForm } from './components';
import { SuperTokensPluginCaptchaConfig } from './types';

// todo: feedback need a callback for init:
// - need to throw error if shadow dom is used
// todo: feedback need access to the config so we can detect use of shadowdom

// add config for:
// - action
// - when to show captcha

export const init = (config: SuperTokensPluginCaptchaConfig): SuperTokensPlugin => {
  return {
    id: PLUGIN_ID,
    overrideMap: {
      emailpassword: {
        components: {
          EmailPasswordSignInForm_Override: EmailPasswordSignInForm({
            ...config,
          }),
        },
      },
    },
  };
};
