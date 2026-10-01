<script setup lang="ts">
import type { RespuestaCatalogo } from '#shared/types'

const { data } = useFetch<RespuestaCatalogo>('/api/productos', {
  query: { orden: 'destacados', porPagina: '3' },
  key: 'destacados-home'
})
</script>

<template>
  <section class="destacados">
    <div class="destacados__head">
      <h2 class="seccion__titulo">Los más pedidos</h2>
      <NuxtLink to="/tienda" class="destacados__ver">Ver todo el catálogo ›</NuxtLink>
    </div>
    <ul v-if="data?.items.length" class="grilla">
      <li v-for="p in data.items" :key="p.id">
        <ProductoCard :producto="p" />
      </li>
    </ul>
  </section>
</template>
