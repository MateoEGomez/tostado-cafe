<script setup lang="ts">
const { filtros, datos, cargando, error, hayFiltros, limpiar, irA, paginasVisibles, refrescar } =
  useCatalogo()
</script>

<template>
  <section class="tienda">
    <header class="tienda__head">
      <h1 class="seccion__titulo">Tienda</h1>
      <p class="tienda__sub">Elegí tu café. Filtrá por origen, tueste, perfil o precio.</p>
    </header>

    <div class="tienda__cols">
      <FiltroPanel
        :filtros="filtros"
        :facetas="datos.facetas"
        :precio-tope="datos.precioTope"
        :hay-filtros="hayFiltros"
        @limpiar="limpiar"
      />

      <div class="tienda__cuerpo">
        <div class="tienda__barra">
          <p class="tienda__conteo">
            <template v-if="cargando">Cargando…</template>
            <template v-else-if="error">No se pudo cargar el catálogo.</template>
            <template v-else-if="datos.total === 0">Sin resultados</template>
            <template v-else>
              Mostrando <strong>{{ datos.desde }}–{{ datos.hasta }}</strong> de
              <strong>{{ datos.total }}</strong>
            </template>
          </p>
          <Paginacion
            compacta
            :pagina="datos.pagina"
            :total-paginas="datos.totalPaginas"
            :paginas="paginasVisibles"
            @ir="irA"
          />
        </div>

        <div v-if="error" class="aviso">
          No pudimos cargar los productos en este momento.
          <button type="button" class="btn btn--chico" @click="refrescar()">Reintentar</button>
        </div>

        <ul v-else class="grilla" :class="{ 'grilla--cargando': cargando }">
          <li v-for="p in datos.items" :key="p.id">
            <ProductoCard :producto="p" />
          </li>
        </ul>

        <div v-if="!error && !cargando && datos.total === 0" class="vacio">
          <p aria-hidden="true">🔎</p>
          <p>No encontramos café con esos filtros.</p>
          <button type="button" class="btn btn--chico" @click="limpiar">Limpiar filtros</button>
        </div>

        <Paginacion
          :pagina="datos.pagina"
          :total-paginas="datos.totalPaginas"
          :paginas="paginasVisibles"
          @ir="irA"
        />
      </div>
    </div>
  </section>
</template>
