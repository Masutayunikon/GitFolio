// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

    // @ts-ignore
    css: [
        '@fortawesome/fontawesome-svg-core/styles.css',
        '@/assets/css/reset.scss',
        '@/assets/css/global.scss'
    ],

    modules: [
        'nuxt-icon',
    ],

    nitro: {
        compressPublicAssets: true,
        routeRules: {
            "/_nuxt/**": { headers: { "cache-control": "max-age=31536000" } }, // Set generated files cache to 1 year
            "/image/**": { headers: { "cache-control": "max-age=31536000" } }, // Set generated files cache to 1 year
        },
    },



})
