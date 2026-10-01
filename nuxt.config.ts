// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  modules: ['motion-v/nuxt'],
  css: ['~/assets/css/main.css'],
  // El número real de WhatsApp vive fuera del repo: se define por variable de
  // entorno (NUXT_PUBLIC_WHATSAPP / NUXT_PUBLIC_WHATSAPP_DISPLAY), en .env en
  // local y como variable de entorno del proyecto en el hosting. Estos son
  // sólo valores de resguardo públicos, de ejemplo.
  runtimeConfig: {
    public: {
      whatsapp: '5491100000000',
      whatsappDisplay: '+54 9 11 0000-0000'
    }
  },
  app: {
    head: {
      htmlAttrs: { lang: 'es' },
      title: 'Tostado Café — Café de especialidad',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Catálogo de Tostado Café: microlotes y blends de especialidad. Filtrá por origen, tueste y perfil de taza.'
        }
      ]
    }
  }
})
