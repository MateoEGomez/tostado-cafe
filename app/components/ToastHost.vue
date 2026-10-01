<script setup lang="ts">
const { toasts } = useToast()
</script>

<template>
  <div class="toasts" aria-live="polite">
    <div v-for="t in toasts" :key="t.id" class="toast" :class="`toast--${t.tipo}`">
      {{ t.texto }}
    </div>
  </div>
</template>
