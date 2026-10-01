export const useUi = () => {
  const carritoAbierto = useState('ui:carrito', () => false)
  const checkoutAbierto = useState('ui:checkout', () => false)
  const productoAbierto = useState<string | null>('ui:producto', () => null)

  const bloquearScroll = (activo: boolean) => {
    if (import.meta.client) document.documentElement.style.overflow = activo ? 'hidden' : ''
  }

  return {
    carritoAbierto,
    checkoutAbierto,
    productoAbierto,
    abrirCarrito: () => {
      carritoAbierto.value = true
      bloquearScroll(true)
    },
    cerrarCarrito: () => {
      carritoAbierto.value = false
      bloquearScroll(false)
    },
    irAlCheckout: () => {
      carritoAbierto.value = false
      checkoutAbierto.value = true
      bloquearScroll(true)
    },
    cerrarCheckout: () => {
      checkoutAbierto.value = false
      bloquearScroll(false)
    },
    verProducto: (id: string) => {
      productoAbierto.value = id
      bloquearScroll(true)
    },
    cerrarProducto: () => {
      productoAbierto.value = null
      bloquearScroll(false)
    }
  }
}
