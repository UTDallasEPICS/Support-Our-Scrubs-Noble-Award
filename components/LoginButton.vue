<template>
    <div>
      <button @click="login">Log in with Auth0</button>
    </div>
  </template>
  
  <script>
  import { useAuth0 } from "@auth0/auth0-vue";
  
  export default {
    name: "LoginButton",
    setup() {
      const { loginWithRedirect } = useAuth0();
  
      const login = async () => {
        await loginWithRedirect();
      };
  
      return { login };
    },
  };
  </script>
  