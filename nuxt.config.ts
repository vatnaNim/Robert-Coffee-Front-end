export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@nuxt/ui'],
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    public: {
      NUXT_PUBLIC_API_URL: process.env.NUXT_PUBLIC_API_URL, 
    },
  },
  plugins: ['~/plugins/axios.ts'],
  compatibilityDate: '2025-03-15',
  
});