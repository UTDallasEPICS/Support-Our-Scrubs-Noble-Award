import axios from "axios";
import { defineEventHandler, getQuery, setCookie, sendRedirect } from "h3";

interface Auth0TokenResponse {
  access_token: string;
  id_token: string;
  expires_in: number;
  token_type: string;
}

export default defineEventHandler(async (event) => {
  const { code } = getQuery(event);

  if (!code) {
    console.error("[Callback] Missing authorization code.");
    return sendRedirect(event, "/");
  }

  try {
    const tokenResponse = await axios.post<Auth0TokenResponse>(`https://${process.env.DOMAIN}/oauth/token`, {
      grant_type: "authorization_code",
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      code,
      redirect_uri: `${process.env.BASE_URL}/api/callback`,
    });

    const idToken = tokenResponse.data.id_token;

    if (!idToken) {
      throw new Error("[Callback] ID token not received.");
    }

    setCookie(event, "cvtoken", idToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    console.log("[Callback] cvtoken cookie set successfully.");
    return sendRedirect(event, "/nominator/viewnominees");
  } catch (error) {
    console.error("[Callback] Error during token exchange:", error);
    return sendRedirect(event, "/");
  }
});
