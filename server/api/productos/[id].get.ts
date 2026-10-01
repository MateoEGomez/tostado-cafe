import { PRODUCTOS } from '../../data/productos'

export default defineEventHandler((event) => {
  const id = getRouterParam(event, 'id')
  const producto = PRODUCTOS.find((p) => p.id === id)
  if (!producto) {
    throw createError({ statusCode: 404, statusMessage: 'Producto no encontrado' })
  }
  const relacionados = PRODUCTOS.filter(
    (p) => p.id !== producto.id && (p.origen === producto.origen || p.perfil === producto.perfil)
  ).slice(0, 3)
  return { producto, relacionados }
})
