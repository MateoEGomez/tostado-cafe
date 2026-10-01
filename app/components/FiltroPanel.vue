<script setup lang="ts">
import type { FacetasCatalogo } from '#shared/types'

const props = defineProps<{
  filtros: {
    q: string
    categoria: string
    origen: string
    tueste: string
    perfil: string
    precioMax: number
    orden: string
    pagina: number
  }
  facetas: FacetasCatalogo
  precioTope: number
  hayFiltros: boolean
}>()

defineEmits<{ limpiar: [] }>()

const fmt = (n: number) => n.toLocaleString('es-AR')
const tope = computed(() => props.precioTope || 30000)
const valorPrecio = computed(() => (props.filtros.precioMax > 0 ? props.filtros.precioMax : tope.value))
</script>

<template>
  <aside class="filtros">
    <label class="filtros__buscar">
      <span aria-hidden="true">⌕</span>
      <input
        type="search"
        placeholder="Buscar café, origen, perfil…"
        :value="props.filtros.q"
        @input="props.filtros.q = ($event.target as HTMLInputElement).value"
      />
    </label>

    <div class="filtros__grupo">
      <span class="filtros__tit">Ordenar</span>
      <select
        class="filtros__select"
        :value="props.filtros.orden"
        @change="props.filtros.orden = ($event.target as HTMLSelectElement).value"
      >
        <option value="destacados">Destacados</option>
        <option value="precio-asc">Precio: menor a mayor</option>
        <option value="precio-desc">Precio: mayor a menor</option>
        <option value="nombre">Nombre (A–Z)</option>
      </select>
    </div>

    <div class="filtros__grupo">
      <span class="filtros__tit">Categoría</span>
      <div class="filtros__chips">
        <button
          v-for="op in props.facetas.categoria"
          :key="op"
          type="button"
          class="chip"
          :class="{ 'chip--on': props.filtros.categoria === op }"
          @click="props.filtros.categoria = props.filtros.categoria === op ? '' : op"
        >
          {{ op }}
        </button>
      </div>
    </div>

    <div class="filtros__grupo">
      <span class="filtros__tit">Tueste</span>
      <div class="filtros__chips">
        <button
          v-for="op in props.facetas.tueste"
          :key="op"
          type="button"
          class="chip"
          :class="{ 'chip--on': props.filtros.tueste === op }"
          @click="props.filtros.tueste = props.filtros.tueste === op ? '' : op"
        >
          {{ op }}
        </button>
      </div>
    </div>

    <div class="filtros__grupo">
      <span class="filtros__tit">Origen</span>
      <select
        class="filtros__select"
        :value="props.filtros.origen"
        @change="props.filtros.origen = ($event.target as HTMLSelectElement).value"
      >
        <option value="">Todos</option>
        <option v-for="op in props.facetas.origen" :key="op" :value="op">{{ op }}</option>
      </select>
    </div>

    <div class="filtros__grupo">
      <span class="filtros__tit">Perfil de taza</span>
      <select
        class="filtros__select"
        :value="props.filtros.perfil"
        @change="props.filtros.perfil = ($event.target as HTMLSelectElement).value"
      >
        <option value="">Cualquiera</option>
        <option v-for="op in props.facetas.perfil" :key="op" :value="op">{{ op }}</option>
      </select>
    </div>

    <div class="filtros__grupo">
      <span class="filtros__tit">
        Precio máximo <strong class="filtros__valor">${{ fmt(valorPrecio) }}</strong>
      </span>
      <input
        class="filtros__rango"
        type="range"
        min="0"
        :max="tope"
        step="500"
        :value="valorPrecio"
        @input="props.filtros.precioMax = Number(($event.target as HTMLInputElement).value) >= tope ? 0 : Number(($event.target as HTMLInputElement).value)"
      />
    </div>

    <button v-if="props.hayFiltros" type="button" class="filtros__limpiar" @click="$emit('limpiar')">
      Limpiar filtros
    </button>
  </aside>
</template>
