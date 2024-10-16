import { createServerRunner } from "@aws-amplify/adapter-nextjs";
import { amplifyConfig } from "@/config/amplify.config";

export const { runWithAmplifyServerContext } = createServerRunner({
  config: amplifyConfig,
});
