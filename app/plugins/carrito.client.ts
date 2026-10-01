import { CLAVE_CARRITO, useCarrito, type LineaCarrito } from '~/composables/useCarrito'

// Hidrata el carrito desde localStorage y lo persiste ante cada cambio.
export default defineNuxtPlugin(() => {
  const { lineas } = useCarrito()

  try {
    const raw = localStorage.getItem(CLAVE_CARRITO)
    if (raw) {
      const parsed = JSON.parse(raw) as LineaCarrito[]
      if (Array.isArray(parsed)) lineas.value = parsed
    }
  } catch {
    /* almacenamiento no disponible: seguimos con el carrito vacío */
  }

  watch(
    lineas,
    (v) => {
      try {
        localStorage.setItem(CLAVE_CARRITO, JSON.stringify(v))
      } catch {
        /* sin persistencia */
      }
    },
    { deep: true }
  )
})
