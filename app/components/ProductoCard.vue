<script setup lang="ts">
import { motion } from 'motion-v'
import type { Producto } from '#shared/types'

const props = defineProps<{ producto: Producto }>()

const { agregar, setCantidad, cantidadDe } = useCarrito()
const { verProducto } = useUi()
const { ok } = useToast()

const enCarrito = computed(() => cantidadDe(props.producto.id))
const sinStock = computed(() => props.producto.stock <= 0)
const fmt = (n: number) => n.toLocaleString('es-AR')

const sumar = () => {
  agregar(props.producto)
  ok(`Agregaste ${props.producto.nombre}`)
}
</script>

<template>
  <motion.article class="card" :while-hover="{ y: -4 }" :transition="{ duration: 0.2 }">
    <button type="button" class="card__media" @click="verProducto(producto.id)">
      <span aria-hidden="true">{{ producto.emoji }}</span>
      <span v-if="producto.destacado" class="card__badge">Destacado</span>
      <span v-if="sinStock" class="card__badge card__badge--off">Sin stock</span>
    </button>

    <div class="card__body">
      <p class="card__meta">{{ producto.categoria }} · {{ producto.presentacion }}</p>
      <h3 class="card__nombre">
        <button type="button" class="card__link" @click="verProducto(producto.id)">
          {{ producto.nombre }}
        </button>
      </h3>
      <p class="card__resumen">{{ producto.resumen }}</p>

      <div class="card__pie">
        <span class="card__precio">${{ fmt(producto.precio) }}</span>

        <div v-if="enCarrito > 0" class="stepper" role="group" aria-label="Cantidad">
          <button type="button" @click="setCantidad(producto.id, enCarrito - 1)" aria-label="Quitar uno">−</button>
          <span>{{ enCarrito }}</span>
          <button
            type="button"
            :disabled="enCarrito >= producto.stock"
            @click="setCantidad(producto.id, enCarrito + 1)"
            aria-label="Agregar uno"
          >
            +
          </button>
        </div>
        <button v-else type="button" class="btn btn--chico" :disabled="sinStock" @click="sumar">
          Agregar
        </button>
      </div>

      <button type="button" class="card__ver" @click="verProducto(producto.id)">Ver detalle</button>
    </div>
  </motion.article>
</template>
