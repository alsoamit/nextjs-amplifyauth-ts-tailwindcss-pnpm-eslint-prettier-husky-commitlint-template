import { fetchAuthSession } from "aws-amplify/auth";

// function to fetch the current auth session and access token
const fetchAccessTokenFromSession = async () => {
  try {
    const session = await fetchAuthSession();
    return session?.tokens?.accessToken.toString();
  } catch (error) {
    console.error("Error fetching auth session:", error);
    throw error;
  }
};

export default fetchAccessTokenFromSession;
