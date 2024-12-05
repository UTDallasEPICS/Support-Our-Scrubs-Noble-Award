import { createAuth0 } from "@auth0/auth0-vue";
import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
  if (process.server) return;

  const config = useRuntimeConfig();

  nuxtApp.vueApp.use(
    createAuth0({
      domain: config.public.auth0Domain as string,
      clientId: config.public.auth0ClientId as string,
      authorizationParams: {
        redirect_uri: `${window.location.origin}`,
      },
    })
  );
});



