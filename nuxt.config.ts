export default defineNuxtConfig({
    compatibilityDate: "2024-04-03",
    devtools: { enabled: true },
    css: ["~/assets/css/main.css", "~/assets/css/theme.css"],
    imports: { autoImport: true },

    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },

    runtimeConfig: {
        DATABASE_URL: "file:./dev.db",
        nodemailerAuthUser: process.env.NUXT_NODEMAILER_AUTH_USER!,
        nodemailerAuthPass: process.env.NUXT_NODEMAILER_AUTH_PASS!,
        jwtSecret: process.env.JWT_SECRET,
        uploadStoragePath: process.env.UPLOAD_STORAGE_PATH!,
        public: {
            emailHost: process.env.NUXT_PUBLIC_EMAIL_HOST!,
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
