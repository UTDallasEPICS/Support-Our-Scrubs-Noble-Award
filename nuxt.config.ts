export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  imports: { autoImport: true },

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
      public:{
        supabase: {
        redirectOptions: {
          // we are NOT using a /login route
          login: '/',                      // unused now, but required by your plugin’s shape
          callback: '/auth/callback',
          include: ['/nominator', '/admin/**'],  // only guard these
          exclude: ['/', '/roster', '/donate', '/contact', '/auth/callback'],
          cookieRedirect: false,
          saveRedirectToCookie: false
        }
      }
    }
  },

  app: {
   head: {
     link: [
       {
         rel: 'stylesheet',
         href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css'
       }
     ]
   }
 },

  modules: ['@nuxtjs/supabase'],
});
