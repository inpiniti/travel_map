// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/leaflet",
    "shadcn-nuxt",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/device",
    "@vesp/nuxt-fontawesome",
  ],
  shadcn: {
    prefix: "",
    componentDir: "./components/ui",
  },
  css: ["@/assets/css/custom.css"],
  fontawesome: {
    icons: {
      solid: [
        "landmark",
        "bag-shopping",
        "train",
        "train-subway",
        "utensils",
        "plane",
        "hotel",
        "trash",
        "hospital",
        "map",
        "chevron-left",
        "calendar",
        "money-bill",
        "mug-saucer",
      ],
      regular: ["user"],
    },
  },
});
