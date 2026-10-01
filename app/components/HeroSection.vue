<script setup lang="ts">
import { marca } from '~/config/marca'
</script>

<template>
  <section class="hero" :style="{ '--hero-img': `url(${marca.hero.imagen})` }">
    <div class="hero__inner">
      <p class="hero__kicker">{{ marca.hero.kicker }}</p>
      <h1 class="hero__titulo">{{ marca.hero.titulo }}</h1>
      <p class="hero__bajada">{{ marca.hero.bajada }}</p>
      <div class="hero__acciones">
        <NuxtLink to="/tienda" class="btn btn--primario">{{ marca.hero.cta }}</NuxtLink>
        <a class="btn btn--fantasma" href="#propuesta">{{ marca.hero.ctaSecundaria }}</a>
      </div>
    </div>
  </section>
</template>
