<script setup lang="ts">
import { marca } from '~/config/marca'
import { linkWhatsapp, mensajeConsulta } from '~/utils/whatsapp'

const telefonoDisplay = useRuntimeConfig().public.whatsappDisplay

const waConsulta = computed(() =>
  linkWhatsapp(`Hola ${marca.nombre}, quería hacer una consulta.`)
)

const form = reactive({ nombre: '', mensaje: '' })
const errores = reactive<Record<string, string>>({})

const enviar = () => {
  errores.nombre = form.nombre.trim() ? '' : 'Ingresá tu nombre.'
  errores.mensaje = form.mensaje.trim().length >= 10 ? '' : 'Contanos un poco más.'
  if (errores.nombre || errores.mensaje) return
  window.open(linkWhatsapp(mensajeConsulta(form.nombre, form.mensaje)), '_blank', 'noopener')
}
</script>

<template>
  <section class="contacto">
    <h1 class="seccion__titulo">Contacto</h1>

    <div class="contacto__cols">
      <ul class="contacto__datos">
        <li>
          <span class="contacto__ico" aria-hidden="true">📍</span>
          <a :href="marca.contacto.mapsUrl" target="_blank" rel="noopener">
            {{ marca.contacto.direccion }}
          </a>
          <small>{{ marca.contacto.horarios }}</small>
        </li>
        <li>
          <span class="contacto__ico" aria-hidden="true">💬</span>
          <a :href="waConsulta" target="_blank" rel="noopener">
            WhatsApp {{ telefonoDisplay }}
          </a>
          <small>La forma más rápida de llegar a nosotros</small>
        </li>
        <li>
          <span class="contacto__ico" aria-hidden="true">✉️</span>
          <a :href="'mailto:' + marca.contacto.email">{{ marca.contacto.email }}</a>
        </li>
        <li>
          <span class="contacto__ico" aria-hidden="true">📷</span>
          <a
            :href="'https://instagram.com/' + marca.contacto.instagram"
            target="_blank"
            rel="noopener"
          >
            @{{ marca.contacto.instagram }}
          </a>
        </li>
      </ul>

      <form class="contacto__form" @submit.prevent="enviar">
        <p class="contacto__intro">Escribinos y seguimos la charla por WhatsApp.</p>
        <div class="campo">
          <label for="c-nombre">Nombre</label>
          <input id="c-nombre" v-model.trim="form.nombre" />
          <span v-if="errores.nombre" class="campo__error">{{ errores.nombre }}</span>
        </div>
        <div class="campo">
          <label for="c-msg">Mensaje</label>
          <textarea id="c-msg" v-model.trim="form.mensaje" rows="4" />
          <span v-if="errores.mensaje" class="campo__error">{{ errores.mensaje }}</span>
        </div>
        <button type="submit" class="btn btn--primario">Escribir por WhatsApp</button>
      </form>
    </div>
  </section>
</template>
