export default defineNuxtConfig({
    compatibilityDate: "2024-04-03",
    devtools: { enabled: true },
    css: ["~/assets/css/main.css", "~/assets/css/theme.css"],
    imports: { autoImport: true },
    modules: ["nuxt-security"],

    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },

    security: {
      corsHandler: {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE']
      }
    },

    runtimeConfig: {
        DATABASE_URL: "file:./dev.db",

        clientID: process.env.NUXT_OAUTH2_CLIENT_ID!,
        clientSecret: process.env.NUXT_OAUTH2_CLIENT_SECRET!,
        refreshToken: process.env.NUXT_OAUTH2_REFRESH_TOKEN!,
        redirectURI: process.env.NUXT_OAUTH2_REDIRECT_URI!,
        jwtSecret: process.env.JWT_SECRET,
        supabase: {
            serviceKey: process.env.NUXT_SUPABASE_SERVICE_ROLE_KEY!,
        },
        public: {
            emailHost: process.env.NUXT_PUBLIC_EMAIL_SENDER!,
            
            supabase: {
                url: process.env.NUXT_PUBLIC_SUPABASE_URL!,
                key: process.env.NUXT_PUBLIC_SUPABASE_ADON_KEY!,
                redirectOptions: {
                    // we are NOT using a /login route
                    login: "/", // unused now, but required by your plugin’s shape
                    callback: "/auth/callback",
                    include: ["/admin/**"], // only guard these
                    exclude: [
                        "/",
                        "/roster",
                        "/donate",
                        "/contact",
                        "/auth/callback",
                    ],
                    cookieRedirect: false,
                    saveRedirectToCookie: false,
                },
            },
        },
    },

    app: {
        head: {
            link: [
                {
                    rel: "stylesheet",
                    href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css",
                },
            ],
        },
    },
});
