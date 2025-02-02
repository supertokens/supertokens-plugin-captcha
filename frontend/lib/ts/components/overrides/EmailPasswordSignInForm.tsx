import { ComponentOverrideMap } from "supertokens-auth-react/lib/build/recipe/emailpassword/types";

export const EmailPasswordSignInForm: ComponentOverrideMap["EmailPasswordSignInForm_Override"] = ({
  DefaultComponent,
  ...props
}) => {
  console.log("overrides/EmailPasswordSignInForm");
  return <DefaultComponent {...props} />;
};
