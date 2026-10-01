<script setup lang="ts">
const { carritoAbierto, cerrarCarrito, irAlCheckout } = useUi()
const { lineas, subtotal, unidades, vacio, setCantidad, quitar } = useCarrito()

const fmt = (n: number) => n.toLocaleString('es-AR')
const ENVIO_GRATIS = 25000
const faltaParaEnvioGratis = computed(() => Math.max(0, ENVIO_GRATIS - subtotal.value))
</script>

<template>
  <div v-if="carritoAbierto" class="drawer" @click.self="cerrarCarrito()">
    <aside class="drawer__panel" role="dialog" aria-modal="true" aria-label="Carrito">
      <header class="drawer__head">
        <h2>Tu carrito <span v-if="unidades">· {{ unidades }}</span></h2>
        <button type="button" class="modal__x" aria-label="Cerrar" @click="cerrarCarrito()">✕</button>
      </header>

      <div v-if="vacio" class="drawer__vacio">
        <p aria-hidden="true">🛒</p>
        <p>Todavía no agregaste nada.</p>
        <button type="button" class="btn btn--fantasma" @click="cerrarCarrito()">Ver la tienda</button>
      </div>

      <template v-else>
        <ul class="drawer__lista">
          <li v-for="l in lineas" :key="l.id" class="drawer__linea">
            <span class="drawer__emoji" aria-hidden="true">{{ l.emoji }}</span>
            <div class="drawer__datos">
              <p class="drawer__nombre">{{ l.nombre }}</p>
              <p class="drawer__pres">{{ l.presentacion }} · ${{ fmt(l.precio) }}</p>
              <div class="stepper stepper--chico">
                <button type="button" @click="setCantidad(l.id, l.cantidad - 1)" aria-label="Menos">−</button>
                <span>{{ l.cantidad }}</span>
                <button type="button" @click="setCantidad(l.id, l.cantidad + 1)" aria-label="Más">+</button>
              </div>
            </div>
            <div class="drawer__derecha">
              <span class="drawer__subtotal">${{ fmt(l.precio * l.cantidad) }}</span>
              <button type="button" class="drawer__quitar" @click="quitar(l.id)">Quitar</button>
            </div>
          </li>
        </ul>

        <footer class="drawer__pie">
          <p v-if="faltaParaEnvioGratis > 0" class="drawer__envio">
            Te faltan ${{ fmt(faltaParaEnvioGratis) }} para el envío bonificado.
          </p>
          <p v-else class="drawer__envio drawer__envio--ok">Tenés envío bonificado 🎉</p>
          <div class="drawer__total">
            <span>Subtotal</span>
            <strong>${{ fmt(subtotal) }}</strong>
          </div>
          <button type="button" class="btn btn--primario btn--bloque" @click="irAlCheckout()">
            Ir a pagar
          </button>
        </footer>
      </template>
    </aside>
  </div>
</template>
