import type { RespuestaCatalogo } from '#shared/types'

const texto = (v: unknown) => (typeof v === 'string' ? v : '')
const entero = (v: unknown) => {
  const n = Number(Array.isArray(v) ? v[0] : v)
  return Number.isFinite(n) ? n : 0
}

/**
 * Estado del catálogo. Los filtros, el orden y la página viven en la query de la
 * URL y se envían a `GET /api/productos`, que filtra y pagina en el servidor.
 */
export const useCatalogo = () => {
  const route = useRoute()
  const router = useRouter()

  const filtros = reactive({
    q: texto(route.query.q),
    categoria: texto(route.query.categoria),
    origen: texto(route.query.origen),
    tueste: texto(route.query.tueste),
    perfil: texto(route.query.perfil),
    precioMax: entero(route.query.precioMax),
    orden: texto(route.query.orden) || 'destacados',
    pagina: Math.max(1, entero(route.query.pagina) || 1)
  })

  const POR_PAGINA = 9

  const queryApi = computed<Record<string, string>>(() => {
    const o: Record<string, string> = { porPagina: String(POR_PAGINA) }
    if (filtros.q.trim()) o.q = filtros.q.trim()
    if (filtros.categoria) o.categoria = filtros.categoria
    if (filtros.origen) o.origen = filtros.origen
    if (filtros.tueste) o.tueste = filtros.tueste
    if (filtros.perfil) o.perfil = filtros.perfil
    if (filtros.precioMax > 0) o.precioMax = String(filtros.precioMax)
    if (filtros.orden && filtros.orden !== 'destacados') o.orden = filtros.orden
    if (filtros.pagina > 1) o.pagina = String(filtros.pagina)
    return o
  })

  const { data, pending, error, refresh } = useFetch<RespuestaCatalogo>('/api/productos', {
    query: queryApi,
    key: 'catalogo',
    default: () => ({
      items: [],
      total: 0,
      pagina: 1,
      porPagina: POR_PAGINA,
      totalPaginas: 1,
      desde: 0,
      hasta: 0,
      precioTope: 30000,
      facetas: { categoria: [], origen: [], tueste: [], perfil: [] }
    })
  })

  // Sincroniza el estado con la URL (sólo en cliente).
  if (import.meta.client) {
    watch(
      () => ({ ...filtros }),
      () => {
        router.replace({ query: { ...queryApi.value, porPagina: undefined } as any })
      },
      { deep: true }
    )
  }

  // Al cambiar cualquier filtro que no sea la página, se vuelve a la página 1.
  watch(
    () => [
      filtros.q,
      filtros.categoria,
      filtros.origen,
      filtros.tueste,
      filtros.perfil,
      filtros.precioMax,
      filtros.orden
    ],
    () => {
      filtros.pagina = 1
    }
  )

  const hayFiltros = computed(
    () =>
      !!filtros.q.trim() ||
      !!filtros.categoria ||
      !!filtros.origen ||
      !!filtros.tueste ||
      !!filtros.perfil ||
      filtros.precioMax > 0
  )

  const limpiar = () => {
    filtros.q = ''
    filtros.categoria = ''
    filtros.origen = ''
    filtros.tueste = ''
    filtros.perfil = ''
    filtros.precioMax = 0
    filtros.orden = 'destacados'
    filtros.pagina = 1
  }

  const irA = (p: number) => {
    const tp = data.value?.totalPaginas ?? 1
    filtros.pagina = Math.min(Math.max(1, p), tp)
    if (import.meta.client) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const paginasVisibles = computed<(number | '...')[]>(() => {
    const total = data.value?.totalPaginas ?? 1
    const actual = filtros.pagina
    const set = new Set<number>([1, total, actual, actual - 1, actual + 1])
    const nums = [...set].filter((n) => n >= 1 && n <= total).sort((a, b) => a - b)
    const salida: (number | '...')[] = []
    let prev = 0
    for (const n of nums) {
      if (prev && n - prev > 1) salida.push('...')
      salida.push(n)
      prev = n
    }
    return salida
  })

  return {
    filtros,
    datos: data,
    cargando: pending,
    error,
    refrescar: refresh,
    hayFiltros,
    limpiar,
    irA,
    paginasVisibles
  }
}
