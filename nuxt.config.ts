export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: [
    '@nuxt/ui',
    '@nuxt/image',
    'shadcn-nuxt',
    ['@nuxtjs/google-fonts',
      {
        families: {
          Lato: {
            wght: [300, 400, 700],
            ital: [300]
          },
        }
      }
    ],
    'nuxt-icon',
    'radix-vue/nuxt',
    '@pinia/nuxt',
    ['@vee-validate/nuxt',
      { autoImports: true }
    ]
  ],
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: 'Ui',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  },
  pinia: {
    storesDirs: ['./store/**']
  }
})
