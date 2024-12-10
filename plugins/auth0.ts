import { createAuth0 } from "@auth0/auth0-vue";

export default defineNuxtPlugin((nuxtApp) => {
  if (import.meta.server) return;

  const config = useRuntimeConfig();

  const auth0Client = createAuth0({
    domain: config.public.DOMAIN,
    clientId: config.public.CLIENT_ID,
    authorizationParams: {
      redirect_uri: `${window.location.origin}/callback`, // Dynamically set redirect URI
      scope: "openid profile email", // Authentication scopes
    },
    cacheLocation: "localstorage", // Persist tokens across reloads
    useRefreshTokens: true, // Use refresh tokens for session persistence
  });

  nuxtApp.vueApp.use(auth0Client);
});
