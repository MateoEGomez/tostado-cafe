<script setup lang="ts">
import { marca } from '~/config/marca'
import { linkWhatsapp } from '~/utils/whatsapp'
const anio = new Date().getFullYear()
const waFooter = linkWhatsapp(`Hola ${marca.nombre}, quería hacer una consulta.`)
</script>

<template>
  <footer class="pie">
    <div class="pie__col">
      <p class="pie__marca">{{ marca.nombre }}</p>
      <p>{{ marca.claim }}</p>
    </div>
    <div class="pie__col">
      <p class="pie__tit">Tienda</p>
      <NuxtLink to="/tienda">Ver productos</NuxtLink>
      <NuxtLink to="/">Cómo compramos</NuxtLink>
      <NuxtLink to="/contacto">Contacto</NuxtLink>
    </div>
    <div class="pie__col">
      <p class="pie__tit">Contacto</p>
      <a :href="waFooter" target="_blank" rel="noopener">WhatsApp</a>
      <a :href="'mailto:' + marca.contacto.email">{{ marca.contacto.email }}</a>
      <a :href="'https://instagram.com/' + marca.contacto.instagram" target="_blank" rel="noopener">
        @{{ marca.contacto.instagram }}
      </a>
    </div>
    <div class="pie__col">
      <p class="pie__tit">Local</p>
      <a :href="marca.contacto.mapsUrl" target="_blank" rel="noopener">{{ marca.contacto.direccion }}</a>
      <p>{{ marca.contacto.horarios }}</p>
    </div>
    <p class="pie__legal">© {{ anio }} {{ marca.nombre }} · Demo · Precios y datos ficticios</p>
  </footer>
</template>
