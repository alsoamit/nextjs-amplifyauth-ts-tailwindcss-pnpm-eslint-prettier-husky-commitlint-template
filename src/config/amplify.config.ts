export const amplifyConfig = {
  aws_project_region: process.env.NEXT_PUBLIC_AWS_PROJECT_REGION,
  // aws_cognito_identity_pool_id:
  //   process.env.NEXT_PUBLIC_AWS_COGNITO_IDENTITY_POOL_ID,
  aws_cognito_region: process.env.NEXT_PUBLIC_AWS_COGNITO_REGION,
  aws_user_pools_id: process.env.NEXT_PUBLIC_AWS_USER_POOL_ID,
  aws_user_pools_web_client_id:
    process.env.NEXT_PUBLIC_AWS_USER_POOL_WEB_CLIENT_ID,
  oauth: {
    domain: process.env.NEXT_PUBLIC_OAUTH_DOMAIN,
    scope: ["openid", "profile", "email"],
    redirectSignIn: process.env.NEXT_PUBLIC_OAUTH_REDIRECT_SIGN_IN,
    redirectSignOut: process.env.NEXT_PUBLIC_OAUTH_REDIRECT_SIGN_OUT,
    responseType: "code",
    socialProviders: ["GOOGLE"],
  },
  aws_cognito_username_attributes: ["EMAIL"],
  aws_cognito_social_providers: ["GOOGLE"],
  aws_cognito_signup_attributes: [],
  aws_cognito_mfa_configuration: "OFF",
  aws_cognito_mfa_types: ["SMS"],
  aws_cognito_password_protection_settings: {
    passwordPolicyMinLength: 8,
    passwordPolicyCharacters: ["REQUIRES_LOWERCASE", "REQUIRES_UPPERCASE"],
  },
  aws_cognito_verification_mechanisms: ["EMAIL"],
};
