<script setup lang="ts">
import { marca } from '~/config/marca'

useHead({
  title: `${marca.nombre} — ${marca.claim}`
})
</script>

<template>
  <div>
    <HeroSection />
    <DestacadosSection />
    <PropuestaSection />
  </div>
</template>
