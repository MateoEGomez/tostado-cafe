<script setup lang="ts">
const { productoAbierto, checkoutAbierto } = useUi()
</script>

<template>
  <div class="pagina">
    <SiteHeader />
    <main>
      <slot />
    </main>
    <SiteFooter />

    <CarritoDrawer />
    <ProductoModal v-if="productoAbierto" :id="productoAbierto" />
    <CheckoutModal v-if="checkoutAbierto" />
    <ToastHost />
  </div>
</template>
