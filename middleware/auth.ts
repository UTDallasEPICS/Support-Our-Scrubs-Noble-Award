// middleware/auth.ts
import { useAuth0 } from '@auth0/auth0-vue';
import { defineNuxtRouteMiddleware, abortNavigation } from '#app';

export default defineNuxtRouteMiddleware(async () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  if (!isAuthenticated.value) {
    await loginWithRedirect();
    return abortNavigation();
  }
});