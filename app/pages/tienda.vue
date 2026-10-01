<script setup lang="ts">
import { marca } from '~/config/marca'

useHead({ title: `Tienda — ${marca.nombre}` })
</script>

<template>
  <TiendaSection />
</template>
