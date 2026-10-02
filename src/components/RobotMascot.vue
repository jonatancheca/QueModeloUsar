<script setup lang="ts">
import { computed } from 'vue'
import type { Budget } from '../data/recommendations'

const props = defineProps<{ budget: Budget; celebrating: boolean }>()
const colour = computed(() => ({ balanced: '#bc9afa', unlimited: '#ffab89', cheap: '#c6e99a' })[props.budget])
const label = computed(() => ({ balanced: 'BUEN MATCH', unlimited: 'SIN LÍMITES', cheap: 'AHORRO ON' })[props.budget])
</script>

<template>
  <div class="mascot-scene" :class="{ celebrating }" :data-outfit="budget" aria-hidden="true">
    <div class="mascot-label">{{ label }} <span>✓</span></div>
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
            <g v-if="budget === 'cheap'" class="savings-coin" data-accessory="coin">
              <circle cx="313" cy="88" r="18" fill="#efce70" stroke="#20211f" stroke-width="2.5" />
              <circle cx="313" cy="88" r="13" stroke="#a28535" stroke-width="1.5" />
              <text x="313" y="95" text-anchor="middle" fill="#20211f" font-size="20" font-family="Space Grotesk Variable, sans-serif" font-weight="700">€</text>
            </g>
          </g>
          <g v-if="budget !== 'unlimited'">
            <path d="M188 85V65" stroke="#20211f" stroke-width="4" />
            <circle cx="188" cy="56" r="9" fill="#e4ed87" stroke="#20211f" stroke-width="3" />
          </g>
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
          <g v-if="budget === 'unlimited'" class="robot-outfit" data-accessory="monocle">
            <path d="M238 160c21 16 7 37 18 53 6 9 16 16 14 31" stroke="#d7b75d" stroke-width="3" stroke-linecap="round" />
            <circle cx="214" cy="154" r="24" fill="#ffffff" fill-opacity=".18" stroke="#20211f" stroke-width="3" />
            <circle cx="214" cy="154" r="21" stroke="#d7b75d" stroke-width="3" />
            <path d="m220 139 6 7m-8-3 3 3" stroke="#ffffff" stroke-width="2" stroke-linecap="round" />
            <circle cx="270" cy="247" r="4" fill="#d7b75d" stroke="#20211f" stroke-width="1.5" />
          </g>
          <g v-if="budget === 'unlimited'" class="robot-outfit" data-accessory="top-hat">
            <rect x="142" y="18" width="84" height="62" rx="7" fill="#20211f" stroke="#20211f" stroke-width="3" />
            <path d="M156 29v22" stroke="#5c5d57" stroke-width="5" stroke-linecap="round" />
            <path d="M142 63h84v12h-84Z" fill="#e4cd84" />
            <ellipse cx="184" cy="81" rx="60" ry="8" fill="#20211f" stroke="#20211f" stroke-width="3" />
          </g>
          <g v-if="budget === 'unlimited'" class="robot-outfit" data-accessory="bow-tie">
            <path d="m163 205 17 8-17 8Zm34 0-17 8 17 8Z" fill="#e4cd84" stroke="#20211f" stroke-width="2" stroke-linejoin="round" />
            <circle cx="180" cy="213" r="4" fill="#d7b75d" stroke="#20211f" stroke-width="1.5" />
          </g>
          <path v-else d="M171 213h20" stroke="#20211f" stroke-width="3" stroke-linecap="round" />
        </g>
      </g>
      <g v-if="budget === 'cheap'" class="code-sticker" transform="rotate(8 67 237)" data-accessory="piggy-bank">
        <path d="M31 232c-8 0-12-6-8-10 3-3 8 0 5 3" stroke="#20211f" stroke-width="2.5" stroke-linecap="round" />
        <path d="M46 250v10m30-10v10" stroke="#20211f" stroke-width="7" stroke-linecap="round" />
        <ellipse cx="62" cy="235" rx="34" ry="24" fill="#efb4ac" stroke="#20211f" stroke-width="2.5" />
        <path d="m74 216 1-13 12 9" fill="#efb4ac" stroke="#20211f" stroke-width="2.5" stroke-linejoin="round" />
        <rect x="86" y="229" width="20" height="15" rx="5" fill="#e89e96" stroke="#20211f" stroke-width="2.5" />
        <circle cx="92" cy="236" r="1.5" fill="#20211f" /><circle cx="100" cy="236" r="1.5" fill="#20211f" />
        <circle cx="79" cy="225" r="2.5" fill="#20211f" />
        <path d="M49 215h21" stroke="#20211f" stroke-width="3" stroke-linecap="round" />
      </g>
      <g v-else class="code-sticker" transform="rotate(11 74 238)">
        <rect x="25" y="218" width="77" height="38" rx="10" fill="#f8f7f2" stroke="#20211f" stroke-width="2" />
        <path d="m48 231-7 6 7 6m30-12 7 6-7 6m-15-15-5 18" stroke="#20211f" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
      </g>
    </svg>
    <div class="mascot-caption">el hype no decide. tu tarea sí.</div>
  </div>
</template>
