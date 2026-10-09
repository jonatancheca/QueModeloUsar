<script setup lang="ts">
import { computed } from 'vue'
import type { ModelId } from '../data/recommendations'

const props = defineProps<{ model: ModelId }>()
const names: Record<ModelId, string> = {
  astra: 'Mascota de Astra',
  opus: 'Clawd, mascota de Claude',
  sol: 'Mascota de Sol',
  haiku: 'Clawd, mascota de Claude',
}
const label = computed(() => names[props.model])
</script>

<template>
  <svg class="model-mascot" :class="`mascot-${model}`" :data-model="model" viewBox="0 0 64 64" fill="none" role="img" :aria-label="label" focusable="false">
    <g v-if="model === 'opus' || model === 'haiku'" class="mascot-body" fill="#c97555" shape-rendering="crispEdges">
      <path d="M14 16h36v6h6v18h-6v8h-6v-8h-6v8h-6v-8h-6v8h-6v-8h-6v-8H8V22h6Z" />
      <path d="M8 26H4v10h4m48-10h4v10h-4" />
      <g class="mascot-eyes" fill="#20211f"><path d="M23 24h4v9h-4zm15 0h4v9h-4Z" /></g>
    </g>
    <g v-else-if="model === 'astra'" class="mascot-body">
      <ellipse class="astra-orbit" cx="32" cy="32" rx="28" ry="13" transform="rotate(-28 32 32)" stroke="#665392" stroke-width="1.6" />
      <path d="m32 7 7.1 15.2L56 25l-12 12 2.2 17L32 46l-14.2 8L20 37 8 25l16.9-2.8Z" fill="#b399e8" stroke="#20211f" stroke-width="1.7" stroke-linejoin="round" />
      <g class="mascot-eyes" fill="#20211f"><rect x="24" y="28" width="3.5" height="6" rx="1.7" /><rect x="37" y="28" width="3.5" height="6" rx="1.7" /></g>
      <path d="M29 37q3 4 6 0" stroke="#20211f" stroke-width="1.5" stroke-linecap="round" />
      <circle cx="9" cy="39" r="3.5" fill="#e4ed87" stroke="#20211f" stroke-width="1.2" />
    </g>
    <g v-else-if="model === 'sol'" class="mascot-body">
      <g class="sun-rays" stroke="#20211f" stroke-width="1.6" fill="#efc865">
        <path d="m29 5 3-3 3 3v8h-6Zm0 46h6v8l-3 3-3-3ZM5 29h8v6H5l-3-3Zm46 0h8l3 3-3 3h-8Z" stroke-linejoin="round" />
        <path d="m13 9 7 7-4 4-7-7Zm31 35 7 7 4-4-7-7Zm7-35 4 4-7 7-4-4ZM9 51l4 4 7-7-4-4Z" stroke-linejoin="round" />
      </g>
      <circle cx="32" cy="32" r="18" fill="#f4d67f" stroke="#20211f" stroke-width="1.7" />
      <g class="mascot-eyes" fill="#20211f"><rect x="24" y="26" width="3.5" height="6" rx="1.7" /><rect x="37" y="26" width="3.5" height="6" rx="1.7" /></g>
      <path d="M27 36q5 6 10 0" stroke="#20211f" stroke-width="1.5" stroke-linecap="round" />
      <circle cx="21" cy="35" r="2.5" fill="#df9d66" /><circle cx="44" cy="35" r="2.5" fill="#df9d66" />
    </g>
  </svg>
</template>
