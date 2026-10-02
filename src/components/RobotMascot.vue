<script setup lang="ts">
import { computed } from 'vue'
import type { Budget } from '../data/recommendations'

const props = defineProps<{ budget: Budget; celebrating: boolean }>()
const colour = computed(() => ({ balanced: '#bc9afa', unlimited: '#ffab89', cheap: '#c6e99a' })[props.budget])
</script>

<template>
  <div class="mascot-scene" :class="{ celebrating }" aria-hidden="true">
    <div class="mascot-label">BUEN MATCH <span>✓</span></div>
    <svg class="mascot" viewBox="0 0 380 320" fill="none">
      <ellipse cx="192" cy="285" rx="96" ry="12" fill="#20211f" opacity=".07" />
      <g class="orbit-star">
        <path d="m54 62 7 19 19 7-19 7-7 19-7-19-19-7 19-7Z" fill="#e4ed87" stroke="#20211f" stroke-width="2.5" stroke-linejoin="round" />
      </g>
      <g class="orbit-spark">
        <path d="M317 220v28m-14-14h28" stroke="#20211f" stroke-width="3" stroke-linecap="round" />
        <circle cx="326" cy="61" r="5" fill="#ffab89" stroke="#20211f" stroke-width="2" />
      </g>
      <g class="robot-float">
        <g transform="rotate(-8 190 170)">
          <path d="M163 234v31c0 7-8 11-22 11h-13" stroke="#20211f" stroke-width="13" stroke-linecap="round" />
          <path d="M220 234v33c0 7 9 10 24 10h9" stroke="#20211f" stroke-width="13" stroke-linecap="round" />
          <path d="m96 152-24 12-11-20" stroke="#20211f" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" />
          <g class="robot-wave">
            <path d="m278 148 27-17 7-26" stroke="#20211f" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" />
            <path d="m306 107-4-11m10 9 2-14m4 17 8-9" stroke="#20211f" stroke-width="5" stroke-linecap="round" />
          </g>
          <path d="M188 85V65" stroke="#20211f" stroke-width="4" />
          <circle cx="188" cy="56" r="9" fill="#e4ed87" stroke="#20211f" stroke-width="3" />
          <rect x="97" y="91" width="187" height="145" rx="31" fill="#20211f" />
          <rect x="87" y="82" width="187" height="145" rx="31" :fill="colour" stroke="#20211f" stroke-width="3" class="robot-shell" />
          <path d="M105 99h17m-17 6h10" stroke="#20211f" stroke-width="2" stroke-linecap="round" />
          <circle cx="249" cy="103" r="4" fill="#20211f" />
          <rect x="109" y="117" width="143" height="84" rx="22" fill="#f8f7f2" stroke="#20211f" stroke-width="3" />
          <g class="robot-eyes">
            <rect x="137" y="143" width="13" height="23" rx="6.5" fill="#20211f" />
            <rect x="207" y="143" width="13" height="23" rx="6.5" fill="#20211f" />
          </g>
          <path d="M168 173q12 13 24 0" stroke="#20211f" stroke-width="3" stroke-linecap="round" />
          <circle cx="127" cy="172" r="6" fill="#ffab89" opacity=".7" />
          <circle cx="234" cy="172" r="6" fill="#ffab89" opacity=".7" />
          <path d="M171 213h20" stroke="#20211f" stroke-width="3" stroke-linecap="round" />
        </g>
      </g>
      <g class="code-sticker" transform="rotate(11 74 238)">
        <rect x="25" y="218" width="77" height="38" rx="10" fill="#f8f7f2" stroke="#20211f" stroke-width="2" />
        <path d="m48 231-7 6 7 6m30-12 7 6-7 6m-15-15-5 18" stroke="#20211f" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
      </g>
    </svg>
    <div class="mascot-caption">el hype no decide. tu tarea sí.</div>
  </div>
</template>
