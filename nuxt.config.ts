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

    runtimeConfig: {
        DATABASE_URL: "file:./dev.db",

        clientID: process.env.NUXT_OAUTH2_CLIENT_ID!,
        clientSecret: process.env.NUXT_OAUTH2_CLIENT_SECRET!,
        refreshToken: process.env.NUXT_OAUTH2_REFRESH_TOKEN!,
        redirectURI: process.env.NUXT_OAUTH2_REDIRECT_URI!,
        jwtSecret: process.env.JWT_SECRET,
        uploadStoragePath: process.env.UPLOAD_STORAGE_PATH!,
        public: {
            emailHost: process.env.NUXT_PUBLIC_EMAIL_SENDER!,
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
