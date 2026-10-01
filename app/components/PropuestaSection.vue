<script setup lang="ts">
import { marca } from '~/config/marca'
</script>

<template>
  <section id="propuesta" class="propuesta">
    <h2 class="seccion__titulo">{{ marca.propuesta.titulo }}</h2>
    <ul class="propuesta__grid">
      <li v-for="p in marca.propuesta.items" :key="p.titulo" class="propuesta__item">
        <span class="propuesta__emoji" aria-hidden="true">{{ p.emoji }}</span>
        <h3>{{ p.titulo }}</h3>
        <p>{{ p.texto }}</p>
      </li>
    </ul>
  </section>
</template>
