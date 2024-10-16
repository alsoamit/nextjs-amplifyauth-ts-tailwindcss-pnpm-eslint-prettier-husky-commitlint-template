"use client";

import "aws-amplify/auth/enable-oauth-listener";
import { getCurrentUser } from "aws-amplify/auth";
import { Hub } from "aws-amplify/utils";

Hub.listen("auth", async ({ payload }) => {
  switch (payload.event) {
    case "signInWithRedirect":
      const user = await getCurrentUser();
      console.log({ user });
      break;
    case "signInWithRedirect_failure":
      break;
    case "customOAuthState":
      const state = payload.data;
      console.log(state);
      break;
  }
});

export default function Home() {
  return (
    <div>
      <div className="flex justify-center items-center text-4xl font-mono min-h-screen">
        Coming soon!
      </div>
    </div>
  );
}
