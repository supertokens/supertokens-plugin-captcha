import React from "react";
import { ComponentOverrideMap } from "supertokens-auth-react/lib/build/recipe/emailpassword/types";

export const EmailPasswordSignInForm: ComponentOverrideMap["EmailPasswordSignInForm_Override"] = ({
  DefaultComponent,
  ...props
}) => {
  return <DefaultComponent {...props} />;
};
