# Tostado Café

Catálogo web de una cafetería de especialidad ficticia. Página única con **filtros combinables + paginación**, construida con **Nuxt 4** y **Motion** (`motion-v`).

Parte de una serie de 6 demos de catálogo para 6 emprendimientos distintos.

## Qué muestra

- **Filtros**: búsqueda de texto, chips multi-selección (origen, tueste), select (perfil de taza), rango de precio y orden.
- **Paginación** numerada con elipsis y navegación anterior/siguiente.
- El estado de filtros y página se **sincroniza con la query de la URL** (compartible y persistente al refrescar).
- **Animaciones** con `motion-v`: entrada del hero, aparición escalonada de las cartas, animación de layout y salida al filtrar (`AnimatePresence`).
- Diseño responsive con panel de filtros sticky en desktop.

## Stack

| | |
|---|---|
| Framework | Nuxt 4 (Vue 3, `<script setup>`) |
| Animación | motion-v |
| Estilos | CSS plano con custom properties |
| Deploy | Vercel |

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de producción
```

## Estructura

```
app/
  components/       SiteHeader, SiteFooter, FiltroPanel, CatalogoGrid, Paginacion, EstadoVacio
  composables/
    useCatalogo.ts  filtrado + orden + paginación + sync con la URL (lógica reutilizable)
  config/marca.ts   identidad + definición de facetas
  data/catalogo.ts  ~24 productos
  pages/index.vue   armado de la página
```
