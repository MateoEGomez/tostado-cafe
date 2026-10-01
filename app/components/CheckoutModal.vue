<script setup lang="ts">
import { linkWhatsapp, mensajePedido, type DatosCliente } from '~/utils/whatsapp'

const { cerrarCheckout } = useUi()
const { lineas, subtotal, vaciar, vacio } = useCarrito()

const ENVIO = 2500
const fmt = (n: number) => n.toLocaleString('es-AR')

const form = reactive<DatosCliente>({
  nombre: '',
  telefono: '',
  entrega: 'retiro',
  direccion: '',
  nota: ''
})

const errores = reactive<Record<string, string>>({})
const enviado = ref<string | null>(null)

const totalEstimado = computed(() => subtotal.value + (form.entrega === 'envio' ? ENVIO : 0))

const validar = () => {
  errores.nombre = form.nombre.trim() ? '' : 'Ingresá tu nombre.'
  errores.telefono = form.telefono.trim().length >= 6 ? '' : 'Ingresá un teléfono válido.'
  errores.direccion =
    form.entrega === 'envio' && !form.direccion?.trim() ? 'Necesitamos la dirección para el envío.' : ''
  return !errores.nombre && !errores.telefono && !errores.direccion
}

const confirmar = () => {
  if (vacio.value || !validar()) return
  const { texto } = mensajePedido(lineas.value, { ...form })
  const url = linkWhatsapp(texto)
  enviado.value = url
  window.open(url, '_blank', 'noopener')
}

const cerrar = () => {
  enviado.value = null
  cerrarCheckout()
}

const listo = () => {
  vaciar()
  cerrar()
}
</script>

<template>
  <div class="modal" @click.self="cerrar()">
    <div class="modal__panel" role="dialog" aria-modal="true">
      <button type="button" class="modal__x" aria-label="Cerrar" @click="cerrar()">✕</button>

      <div v-if="enviado" class="confirma">
        <p class="confirma__check" aria-hidden="true">✓</p>
        <h2>Te llevamos a WhatsApp</h2>
        <p>
          Abrimos un chat con el detalle de tu pedido para que lo confirmes. Si no se abrió solo,
          tocá el botón de abajo.
        </p>
        <div class="confirma__acciones">
          <a :href="enviado" target="_blank" rel="noopener" class="btn btn--primario">Abrir WhatsApp</a>
          <button type="button" class="btn btn--fantasma" @click="listo">Vaciar carrito y cerrar</button>
        </div>
      </div>

      <form v-else class="checkout" @submit.prevent="confirmar">
        <h2>Finalizar compra</h2>

        <div v-if="vacio" class="aviso">Tu carrito está vacío.</div>

        <template v-else>
          <ul class="checkout__resumen">
            <li v-for="l in lineas" :key="l.id">
              <span>{{ l.cantidad }}× {{ l.nombre }}</span>
              <span>${{ fmt(l.precio * l.cantidad) }}</span>
            </li>
          </ul>

          <div class="campo">
            <label for="ck-nombre">Nombre y apellido</label>
            <input id="ck-nombre" v-model.trim="form.nombre" autocomplete="name" />
            <span v-if="errores.nombre" class="campo__error">{{ errores.nombre }}</span>
          </div>

          <div class="campo">
            <label for="ck-tel">Teléfono</label>
            <input id="ck-tel" v-model.trim="form.telefono" autocomplete="tel" inputmode="tel" />
            <span v-if="errores.telefono" class="campo__error">{{ errores.telefono }}</span>
          </div>

          <fieldset class="campo">
            <legend>Entrega</legend>
            <label class="radio">
              <input type="radio" value="retiro" v-model="form.entrega" />
              Retiro en el local (sin cargo)
            </label>
            <label class="radio">
              <input type="radio" value="envio" v-model="form.entrega" />
              Envío a domicilio (+${{ fmt(ENVIO) }})
            </label>
          </fieldset>

          <div v-if="form.entrega === 'envio'" class="campo">
            <label for="ck-dir">Dirección de envío</label>
            <input id="ck-dir" v-model.trim="form.direccion" autocomplete="street-address" />
            <span v-if="errores.direccion" class="campo__error">{{ errores.direccion }}</span>
          </div>

          <div class="campo">
            <label for="ck-nota">Aclaración (opcional)</label>
            <textarea id="ck-nota" v-model.trim="form.nota" rows="2" />
          </div>

          <div class="checkout__total">
            <span>Total</span>
            <strong>${{ fmt(totalEstimado) }}</strong>
          </div>

          <button type="submit" class="btn btn--primario btn--bloque">Confirmar por WhatsApp</button>
          <p class="checkout__nota">
            Te abrimos WhatsApp con el pedido armado para que lo termines de coordinar con nosotros.
          </p>
        </template>
      </form>
    </div>
  </div>
</template>
