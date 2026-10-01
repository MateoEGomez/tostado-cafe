<script setup lang="ts">
import { marca } from '~/config/marca'

const { unidades } = useCarrito()
const { abrirCarrito } = useUi()
</script>

<template>
  <header class="cab">
    <NuxtLink to="/" class="cab__marca">
      <span class="cab__punto" />
      {{ marca.nombre }}
    </NuxtLink>

    <nav class="cab__nav">
      <NuxtLink to="/" exact-active-class="cab__nav-activo">Inicio</NuxtLink>
      <NuxtLink to="/tienda" active-class="cab__nav-activo">Tienda</NuxtLink>
      <NuxtLink to="/contacto" active-class="cab__nav-activo">Contacto</NuxtLink>
    </nav>

    <button type="button" class="cab__carrito" @click="abrirCarrito()">
      <span aria-hidden="true">🛒</span>
      <span class="cab__carrito-txt">Carrito</span>
      <span v-if="unidades > 0" class="cab__badge">{{ unidades }}</span>
    </button>
  </header>
</template>
