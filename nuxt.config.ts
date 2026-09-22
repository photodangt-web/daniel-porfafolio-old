export default defineNuxtConfig({
  modules: [
    "@vueuse/nuxt",
    "@nuxt/ui",
    "@nuxtjs/i18n",
    "@nuxtjs/seo",
    "@nuxt/content",
    "@nuxt/image",
    "@nuxt/scripts",
    "vue-sonner/nuxt",
  ],

  imports: {
    presets: [
      {
        from: "vue-sonner",
        imports: ["toast"],
      },
    ],
  },

  devtools: {
    enabled: true,
  },

  css: ["~/assets/style/main.css"],

  site: {
    url: "https://canvas.hrcd.fr",
    defaultLocale: "es",
    indexable: true,
  },

  colorMode: {
    preference: "dark",
    fallback: "dark",
  },

  content: {
    preview: {
      api: "https://api.nuxt.studio",
      dev: true,
    },
  },

  mdc: {
    highlight: {
      theme: {
        dark: "github-dark",
        default: "github-dark",
        light: "github-light",
      },
    },
  },

  runtimeConfig: {
    public: {
      resend: !!(process.env.TELEGRAM_BOT_TOKEN || process.env.VITE_TELEGRAM_BOT_TOKEN || process.env.NUXT_PRIVATE_RESEND_API_KEY),
      // clave pública para reCAPTCHA (cliente)
      recaptchaSiteKey: process.env.RECAPTCHA_SITE_KEY || "",
    },
    telegram: {
      botToken: process.env.TELEGRAM_BOT_TOKEN || process.env.VITE_TELEGRAM_BOT_TOKEN || "",
      chatId: process.env.TELEGRAM_CHAT_ID || process.env.VITE_TELEGRAM_CHAT_ID || "",
    },
    resendApiKey: process.env.NUXT_PRIVATE_RESEND_API_KEY || "",
    // secreto del servidor para verificar reCAPTCHA
    evolution: {
      apiKey: process.env.EVOLUTION_API_KEY,
      baseUrl: process.env.EVOLUTION_BASE_URL || "https://wa.lionsoftgt.site",
      instance: process.env.EVOLUTION_INSTANCE || "Lionsoft",
      number: process.env.EVOLUTION_NUMBER,
    },
    recaptchaSecret: process.env.RECAPTCHA_SECRET || "",
  },

  routeRules: {
    // Needed to activate preview on Nuxt Studio
    "/": { prerender: false },
  },

  experimental: {
    viewTransition: true,
  },

  compatibilityDate: "2025-01-05",

  nitro: {
    experimental: {
      websocket: true,
    },
    prerender: {
      autoSubfolderIndex: false,
      crawlLinks: true,
      routes: ["/"],
    },
  },


  i18n: {
    locales: [
      { code: "es", name: "Español", language: "es-ES" },
      { code: "en", name: "English", language: "en-US" },
    ],
    detectBrowserLanguage: false,
    strategy: "no_prefix",
    defaultLocale: "es",
  },

  icon: {
    customCollections: [
      {
        prefix: "custom",
        dir: "./app/assets/icons",
      },
    ],
    clientBundle: {
      scan: true,
      includeCustomCollections: true,
    },
    provider: "iconify",
  },

  ogImage: {
    zeroRuntime: true,
  },
});
