<template>
  <div class="text-center">
    <h1>Processing Login...</h1>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { useAuth0 } from "@auth0/auth0-vue";

const { handleRedirectCallback, isAuthenticated } = useAuth0();
const router = useRouter();

const processCallback = async () => {
  try {
    if (!handleRedirectCallback) {
      console.error("Auth0 handleRedirectCallback is undefined. Ensure Auth0Provider is set up.");
      return;
    }
    const { appState } = await handleRedirectCallback(); // Retrieve appState
    const returnTo = appState?.returnTo || "/"; // Use appState or fallback
    router.push(returnTo);
  } catch (error) {
    console.error("Error processing callback:", error instanceof Error ? error.message : error);
    router.push("/error"); // Redirect to an error page if needed
  }
};

if (import.meta.client) {
  processCallback();
}
</script>
