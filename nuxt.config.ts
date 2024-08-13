// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/leaflet",
    "shadcn-nuxt",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/device",
  ],
  shadcn: {
    prefix: "",
    componentDir: "./components/ui",
  },
});
