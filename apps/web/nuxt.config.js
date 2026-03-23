// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: process.env.NODE_ENV !== 'production' },

  // App metadata
  app: {
    head: {
      title: 'Octo-Portfolio | Space-Themed Developer Portfolio',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'A space-themed developer portfolio built with Nuxt.js showcasing projects, skills, and experience.',
        },
        { property: 'og:title', content: 'Octo-Portfolio' },
        {
          property: 'og:description',
          content: 'Space-themed developer portfolio',
        },
        { name: 'theme-color', content: '#0d1117' },
      ],
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    },
  },

  // CSS
  css: ['~/assets/css/main.css'],

  // Modules
  modules: ['@nuxt/content', '@nuxtjs/google-fonts', '@nuxt/eslint'],

  // Google Fonts
  googleFonts: {
    families: {
      'Space+Mono': [400, 700],
      'Space+Grotesk': [300, 400, 500, 600, 700],
    },
    display: 'swap',
    preconnect: true,
  },

  // Runtime config
  runtimeConfig: {
    // Private keys (server-side only)
    githubToken: process.env.GITHUB_TOKEN || '',
    // Public keys (exposed to client)
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:4000',
      githubUsername: process.env.NUXT_PUBLIC_GITHUB_USERNAME || 'CorentynDevPro',
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    },
  },

  // Nitro (server)
  nitro: {
    prerender: {
      routes: ['/'],
    },
  },

  // Content module
  content: {
    highlight: {
      theme: 'github-dark',
    },
  },

  // Vite
  vite: {
    css: {
      preprocessorOptions: {},
    },
  },
})
