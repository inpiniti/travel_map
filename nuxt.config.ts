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
        "glass-cheers",
        "wrench",
        "umbrella-beach",
        "location-dot",
        "pen",
        "calendar-plus",
        "circle-notch",
        "plus",
        "ellipsis",
        "trash-can",
        "comment",
        "user",
        "right-from-bracket",
      ],
      regular: ["user"],
      brands: ["google"], // 'brands' 카테고리에 'google' 아이콘 추가
    },
  },
  app: {
    head: {
      title: "맞춤형 여행 계획 지도",
      link: [{ rel: "icon", type: "image/png", href: "/fried-potatoes.png" }],
      meta: [
        { charset: "utf-8" },
        {
          name: "viewport",
          content:
            "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
        },
        {
          hid: "description",
          name: "description",
          content:
            "맞춤형 여행 계획 지도를 통해 나만의 여행 경로를 짜보고, 다양한 여행지 정보를 확인하세요. 여행 계획부터 실행까지, 모든 과정을 한 곳에서 해결할 수 있습니다.",
        },
        {
          hid: "og:title",
          property: "og:title",
          content: "여행 계획 지도 - 나만의 여행 경로를 짜보세요",
        },
        {
          hid: "og:url",
          property: "og:url",
          content: "www.potatomap.com",
        },
        {
          hid: "og:image",
          property: "og:image",
          content:
            "https://cloudfront-ap-northeast-1.images.arcpublishing.com/chosun/CU422HY2YJHS7JQ3REJ24E4H64.PNG",
        },
        {
          hid: "og:description",
          property: "og:description",
          content:
            "맞춤형 여행 계획 지도를 통해 나만의 여행 경로를 짜보고, 다양한 여행지 정보를 확인하세요. 여행 계획부터 실행까지, 모든 과정을 한 곳에서 해결할 수 있습니다.",
        },
        {
          hid: "twitter:card",
          name: "twitter:card",
          content: "summary",
        },
        {
          hid: "twitter:title",
          property: "twitter:title",
          content: "여행 계획 지도 - 나만의 여행 경로를 짜보세요",
        },
        {
          hid: "twitter:url",
          property: "twitter:url",
          content: "www.potatomap.com",
        },
        {
          hid: "twitter:image",
          property: "twitter:image",
          content:
            "https://cloudfront-ap-northeast-1.images.arcpublishing.com/chosun/CU422HY2YJHS7JQ3REJ24E4H64.PNG",
        },
        {
          hid: "twitter:description",
          property: "twitter:description",
          content:
            "맞춤형 여행 계획 지도를 통해 나만의 여행 경로를 짜보고, 다양한 여행지 정보를 확인하세요. 여행 계획부터 실행까지, 모든 과정을 한 곳에서 해결할 수 있습니다.",
        },
      ],
    },
  },
});
