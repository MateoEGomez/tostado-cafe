export const marca = {
  nombre: 'Tostado Café',
  claim: 'Café de especialidad tostado en Buenos Aires',
  hero: {
    kicker: 'Tostaduría de especialidad',
    titulo: 'Café que cuenta de dónde viene',
    bajada:
      'Microlotes y blends tostados cada semana. Comprá en grano o molido, con retiro en el local o envío a todo el país.',
    cta: 'Ver la tienda',
    ctaSecundaria: 'Cómo compramos',
    imagen:
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1600&h=900&q=80'
  },
  propuesta: {
    titulo: 'Por qué comprarnos',
    items: [
      {
        emoji: '🗓️',
        titulo: 'Tostado de la semana',
        texto: 'Nunca despachamos café con más de 7 días de tostado. Va con la fecha en la bolsa.'
      },
      {
        emoji: '🌱',
        titulo: 'Origen trazable',
        texto: 'Cada café dice finca, región y proceso. Compramos a cooperativas y productores directos.'
      },
      {
        emoji: '🚚',
        titulo: 'Envíos en 48–72 h',
        texto: 'Despacho a todo el país por correo. Envío bonificado en compras desde $25.000.'
      }
    ]
  },
  // El número de WhatsApp NO vive acá: sale de runtimeConfig.public (ver
  // nuxt.config.ts), que a su vez lo toma de una variable de entorno que no
  // se versiona en el repositorio.
  contacto: {
    direccion: 'Thames 1234, Palermo, CABA',
    horarios: 'Lunes a sábado de 9 a 20 h',
    email: 'hola@tostadocafe.com',
    instagram: 'tostado.cafe',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Thames+1234+Palermo+CABA'
  }
}

export type Marca = typeof marca
