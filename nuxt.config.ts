// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  // Add runtime configuration for Auth0
  runtimeConfig: {
    public: {
      auth0Domain: process.env.DOMAIN,
      auth0ClientId: process.env.CLIENT_ID,
    },
  },

  // Register the Auth0 plugin
  plugins: ['~/plugins/auth0.ts'],

  // Ensure server-side API routes bypass Vue Router
  nitro: {
    routeRules: {
      '/api/**': { ssr: true }, // Handles API routes like /api/callback server-side
    },
  },
});
