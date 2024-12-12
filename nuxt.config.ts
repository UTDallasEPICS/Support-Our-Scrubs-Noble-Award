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
  runtimeConfig: {
      AUTH0_DOMAIN: "",
      AUTH0_CLIENT_ID: "",
      AUTH0_SECRET: "",
      SERVER_BASE_URL: "",
  },
});
