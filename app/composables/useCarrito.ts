import type { Producto } from '#shared/types'

export interface LineaCarrito {
  id: string
  nombre: string
  precio: number
  imagen: string
  presentacion: string
  cantidad: number
}

export const CLAVE_CARRITO = 'tostado:carrito:v1'

export const useCarrito = () => {
  const lineas = useState<LineaCarrito[]>('carrito', () => [])

  const agregar = (p: Pick<Producto, 'id' | 'nombre' | 'precio' | 'imagen' | 'presentacion'>, n = 1) => {
    const existente = lineas.value.find((l) => l.id === p.id)
    if (existente) {
      existente.cantidad = Math.min(99, existente.cantidad + n)
    } else {
      lineas.value.push({
        id: p.id,
        nombre: p.nombre,
        precio: p.precio,
        imagen: p.imagen,
        presentacion: p.presentacion,
        cantidad: n
      })
    }
  }

  const quitar = (id: string) => {
    lineas.value = lineas.value.filter((l) => l.id !== id)
  }

  const setCantidad = (id: string, n: number) => {
    const l = lineas.value.find((x) => x.id === id)
    if (!l) return
    if (n <= 0) quitar(id)
    else l.cantidad = Math.min(99, Math.floor(n))
  }

  const vaciar = () => {
    lineas.value = []
  }

  const cantidadDe = (id: string) => lineas.value.find((l) => l.id === id)?.cantidad ?? 0

  const unidades = computed(() => lineas.value.reduce((s, l) => s + l.cantidad, 0))
  const subtotal = computed(() => lineas.value.reduce((s, l) => s + l.precio * l.cantidad, 0))
  const vacio = computed(() => lineas.value.length === 0)

  return { lineas, agregar, quitar, setCantidad, vaciar, cantidadDe, unidades, subtotal, vacio }
}
