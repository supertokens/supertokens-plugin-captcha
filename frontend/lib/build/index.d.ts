import { init } from "./plugin";
export { init };
export { PLUGIN_ID } from "./config";
declare const _default: {
    init: ({ apiDomain, websiteDomain, }: {
        apiDomain: string;
        websiteDomain: string;
    }) => import("supertokens-auth-react/lib/build/types").SuperTokensPlugin;
};
export default _default;
