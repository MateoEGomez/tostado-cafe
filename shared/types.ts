// Tipos compartidos entre el frontend y las rutas del servidor.

export interface Producto {
  id: string
  sku: string
  nombre: string
  resumen: string
  descripcion: string
  precio: number
  categoria: string
  origen: string
  tueste: string
  perfil: string
  presentacion: string
  stock: number
  imagen: string
  destacado: boolean
  metodos: string[]
}

export interface FacetasCatalogo {
  categoria: string[]
  origen: string[]
  tueste: string[]
  perfil: string[]
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
  facetas: FacetasCatalogo
}
