import { PRODUCTOS, type Producto } from '../data/productos'

export interface ConsultaCatalogo {
  q?: string
  categoria?: string
  origen?: string
  tueste?: string
  perfil?: string
  precioMax?: number
  soloStock?: boolean
  orden?: 'destacados' | 'precio-asc' | 'precio-desc' | 'nombre'
  pagina?: number
  porPagina?: number
}

export interface RespuestaCatalogo {
  items: Producto[]
  total: number
  pagina: number
  porPagina: number
  totalPaginas: number
  desde: number
  hasta: number
  precioTope: number
  facetas: {
    categoria: string[]
    origen: string[]
    tueste: string[]
    perfil: string[]
  }
}

const unicos = (xs: string[]) => [...new Set(xs)]

export const PRECIO_TOPE = Math.max(
  1000,
  Math.ceil(Math.max(...PRODUCTOS.map((p) => p.precio)) / 1000) * 1000
)

export const FACETAS = {
  categoria: unicos(PRODUCTOS.map((p) => p.categoria)),
  origen: unicos(PRODUCTOS.map((p) => p.origen)),
  tueste: ['Claro', 'Medio', 'Oscuro'],
  perfil: unicos(PRODUCTOS.map((p) => p.perfil)).sort((a, b) => a.localeCompare(b, 'es'))
}

export function consultarCatalogo(c: ConsultaCatalogo): RespuestaCatalogo {
  const porPagina = Math.min(48, Math.max(1, Number(c.porPagina) || 9))
  const q = (c.q ?? '').trim().toLowerCase()
  const precioMax = Number(c.precioMax) > 0 ? Number(c.precioMax) : PRECIO_TOPE

  let items = PRODUCTOS.filter((p) => {
    if (p.precio > precioMax) return false
    if (c.categoria && p.categoria !== c.categoria) return false
    if (c.origen && p.origen !== c.origen) return false
    if (c.tueste && p.tueste !== c.tueste) return false
    if (c.perfil && p.perfil !== c.perfil) return false
    if (c.soloStock && p.stock <= 0) return false
    if (q) {
      const blob = `${p.nombre} ${p.resumen} ${p.descripcion} ${p.origen} ${p.perfil}`.toLowerCase()
      if (!blob.includes(q)) return false
    }
    return true
  })

  const orden = c.orden ?? 'destacados'
  items = items.slice().sort((a, b) => {
    if (orden === 'precio-asc') return a.precio - b.precio
    if (orden === 'precio-desc') return b.precio - a.precio
    if (orden === 'nombre') return a.nombre.localeCompare(b.nombre, 'es')
    return Number(b.destacado) - Number(a.destacado) || a.nombre.localeCompare(b.nombre, 'es')
  })

  const total = items.length
  const totalPaginas = Math.max(1, Math.ceil(total / porPagina))
  const pagina = Math.min(Math.max(1, Number(c.pagina) || 1), totalPaginas)
  const inicio = (pagina - 1) * porPagina
  const pageItems = items.slice(inicio, inicio + porPagina)

  return {
    items: pageItems,
    total,
    pagina,
    porPagina,
    totalPaginas,
    desde: total === 0 ? 0 : inicio + 1,
    hasta: inicio + pageItems.length,
    precioTope: PRECIO_TOPE,
    facetas: FACETAS
  }
}
