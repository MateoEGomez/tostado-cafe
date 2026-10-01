<script setup lang="ts">
import type { Producto } from '#shared/types'

const props = defineProps<{ id: string }>()

const { cerrarProducto, verProducto } = useUi()
const { agregar, cantidadDe, setCantidad } = useCarrito()
const { ok } = useToast()

const { data, pending, error } = useFetch<{ producto: Producto; relacionados: Producto[] }>(
  () => `/api/productos/${props.id}`,
  { key: () => `producto-${props.id}` }
)

const enCarrito = computed(() => (data.value ? cantidadDe(data.value.producto.id) : 0))
const fmt = (n: number) => n.toLocaleString('es-AR')

const agregarYAvisar = () => {
  if (!data.value) return
  agregar(data.value.producto)
  ok(`Agregaste ${data.value.producto.nombre}`)
}

const onKey = (e: KeyboardEvent) => {
  if (e.key === 'Escape') cerrarProducto()
}
onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <div class="modal" @click.self="cerrarProducto()">
    <div class="modal__panel modal__panel--ancho" role="dialog" aria-modal="true">
      <button type="button" class="modal__x" aria-label="Cerrar" @click="cerrarProducto()">✕</button>

      <p v-if="pending" class="modal__cargando">Cargando producto…</p>
      <p v-else-if="error || !data" class="modal__cargando">No pudimos cargar este producto.</p>

      <template v-else>
        <div class="detalle">
          <div class="detalle__media" aria-hidden="true">{{ data.producto.emoji }}</div>
          <div class="detalle__info">
            <p class="detalle__meta">
              {{ data.producto.categoria }} · {{ data.producto.presentacion }} · SKU
              {{ data.producto.sku }}
            </p>
            <h2 class="detalle__nombre">{{ data.producto.nombre }}</h2>
            <p class="detalle__resumen">{{ data.producto.resumen }}</p>
            <p class="detalle__desc">{{ data.producto.descripcion }}</p>

            <dl class="detalle__ficha">
              <div><dt>Origen</dt><dd>{{ data.producto.origen }}</dd></div>
              <div><dt>Tueste</dt><dd>{{ data.producto.tueste }}</dd></div>
              <div><dt>Perfil</dt><dd>{{ data.producto.perfil }}</dd></div>
              <div><dt>Métodos</dt><dd>{{ data.producto.metodos.join(', ') }}</dd></div>
              <div>
                <dt>Stock</dt>
                <dd>{{ data.producto.stock > 0 ? data.producto.stock + ' u.' : 'Sin stock' }}</dd>
              </div>
            </dl>

            <div class="detalle__compra">
              <span class="detalle__precio">${{ fmt(data.producto.precio) }}</span>
              <div v-if="enCarrito > 0" class="stepper">
                <button type="button" @click="setCantidad(data.producto.id, enCarrito - 1)">−</button>
                <span>{{ enCarrito }}</span>
                <button
                  type="button"
                  :disabled="enCarrito >= data.producto.stock"
                  @click="setCantidad(data.producto.id, enCarrito + 1)"
                >
                  +
                </button>
              </div>
              <button
                v-else
                type="button"
                class="btn btn--primario"
                :disabled="data.producto.stock <= 0"
                @click="agregarYAvisar"
              >
                Agregar al carrito
              </button>
            </div>
          </div>
        </div>

        <div v-if="data.relacionados.length" class="detalle__rel">
          <p class="detalle__rel-tit">También te puede gustar</p>
          <ul>
            <li v-for="r in data.relacionados" :key="r.id">
              <button type="button" @click="verProducto(r.id)">
                <span aria-hidden="true">{{ r.emoji }}</span>
                {{ r.nombre }}
                <small>${{ fmt(r.precio) }}</small>
              </button>
            </li>
          </ul>
        </div>
      </template>
    </div>
  </div>
</template>
