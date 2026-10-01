import { consultarCatalogo } from '../utils/catalogo'

export default defineEventHandler((event) => {
  const q = getQuery(event)
  const bool = (v: unknown) => v === 'true' || v === '1' || v === true

  return consultarCatalogo({
    q: typeof q.q === 'string' ? q.q : undefined,
    categoria: typeof q.categoria === 'string' ? q.categoria : undefined,
    origen: typeof q.origen === 'string' ? q.origen : undefined,
    tueste: typeof q.tueste === 'string' ? q.tueste : undefined,
    perfil: typeof q.perfil === 'string' ? q.perfil : undefined,
    precioMax: q.precioMax ? Number(q.precioMax) : undefined,
    soloStock: bool(q.soloStock),
    orden: typeof q.orden === 'string' ? (q.orden as any) : undefined,
    pagina: q.pagina ? Number(q.pagina) : undefined,
    porPagina: q.porPagina ? Number(q.porPagina) : undefined
  })
})
