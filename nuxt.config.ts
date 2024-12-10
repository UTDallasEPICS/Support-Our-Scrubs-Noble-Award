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
  plugins: ['~/plugins/auth0.ts'], // Register Auth0 plugin
  runtimeConfig: {
    public: {
      DOMAIN: process.env.DOMAIN,
      CLIENT_ID: process.env.CLIENT_ID,
      BASE_URL: process.env.BASE_URL,
      CALLBACK_URL: process.env.CALLBACK_URL
    },
    private: {
      DATABASE_URL: process.env.DATABASE_URL,
      CLIENT_SECRET: process.env.CLIENT_SECRET,
    },
  },
});
