export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  imports: { autoImport: true },
  modules: ['@nuxtjs/supabase'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  runtimeConfig: {
      DATABASE_URL: "file:./dev.db",
	  supabase: {
		  serviceKey: process.env.NUXT_SUPABASE_SERVICE_ROLE_KEY!,
	  },
      public:{
        supabase: {
          url: process.env.NUXT_PUBLIC_SUPABASE_URL!,
          key: process.env.NUXT_PUBLIC_SUPABASE_ADON_KEY!,
          redirectOptions: {
            // we are NOT using a /login route
            login: '/',                      // unused now, but required by your plugin’s shape
            callback: '/auth/callback',
            include: ['/admin/**'],  // only guard these
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
});
