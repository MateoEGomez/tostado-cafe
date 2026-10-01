<script setup lang="ts">
import { motion } from 'motion-v'

const props = defineProps<{
  pagina: number
  totalPaginas: number
  paginas: (number | '...')[]
  compacta?: boolean
}>()

defineEmits<{ ir: [pagina: number] }>()
</script>

<template>
  <nav
    v-if="props.totalPaginas > 1"
    class="pag"
    :class="{ 'pag--compacta': props.compacta }"
    aria-label="Paginación"
  >
    <button
      type="button"
      class="pag__nav"
      :disabled="props.pagina === 1"
      @click="$emit('ir', props.pagina - 1)"
    >
      ‹<span class="pag__navtxt"> Anterior</span>
    </button>

    <ul class="pag__lista">
      <li v-for="(p, i) in props.paginas" :key="i">
        <span v-if="p === '...'" class="pag__gap">…</span>
        <motion.button
          v-else
          type="button"
          class="pag__num"
          :class="{ 'pag__num--on': p === props.pagina }"
          :aria-current="p === props.pagina ? 'page' : undefined"
          :while-hover="{ y: -2 }"
          @click="$emit('ir', p as number)"
        >
          {{ p }}
        </motion.button>
      </li>
    </ul>

    <button
      type="button"
      class="pag__nav"
      :disabled="props.pagina === props.totalPaginas"
      @click="$emit('ir', props.pagina + 1)"
    >
      <span class="pag__navtxt">Siguiente </span>›
    </button>
  </nav>
</template>
