export type CaptchConatinerProps = {
    form: "EmailPasswordSignInForm" | "EmailPasswordSignUpForm" | "EmailPasswordResetPasswordEmail" | "EmailPasswordSubmitNewPassword" | "PasswordlessEmailForm" | "PasswordlessPhoneForm" | "PasswordlessEmailOrPhoneForm" | "PasswordlessEPComboEmailForm" | "PasswordlessEPComboEmailOrPhoneForm" | "PasswordlessUserInputForm" | "TOTPCodeForm";
} & React.HTMLAttributes<HTMLDivElement>;
export declare const CaptchaContainer: import("react").ForwardRefExoticComponent<{
    form: "EmailPasswordSignInForm" | "EmailPasswordSignUpForm" | "EmailPasswordResetPasswordEmail" | "EmailPasswordSubmitNewPassword" | "PasswordlessEmailForm" | "PasswordlessPhoneForm" | "PasswordlessEmailOrPhoneForm" | "PasswordlessEPComboEmailForm" | "PasswordlessEPComboEmailOrPhoneForm" | "PasswordlessUserInputForm" | "TOTPCodeForm";
} & import("react").HTMLAttributes<HTMLDivElement> & import("react").RefAttributes<HTMLDivElement>>;
