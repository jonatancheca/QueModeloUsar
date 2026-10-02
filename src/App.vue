<script setup lang="ts">
import { computed, nextTick, onUnmounted, ref } from 'vue'
import { ArrowDown, ArrowRight, Ban, Check, ChevronRight, Copy, Cpu, PiggyBank, Scale, Sparkles, Volume2, VolumeX, X, Zap } from '@lucide/vue'
import RobotMascot from './components/RobotMascot.vue'
import ModelMascot from './components/ModelMascot.vue'
import { budgets, getCopyText, getRecommendation, tasks, updatedAt } from './data/recommendations'
import type { Budget, TaskId } from './data/recommendations'
import { useSound } from './composables/useSound'

function savedBudget(): Budget {
  try {
    const saved = localStorage.getItem('qmu-budget')
    if (budgets.some((budget) => budget.id === saved)) return saved as Budget
  } catch { /* The site also works with storage disabled. */ }
  return 'balanced'
}

const budget = ref<Budget>(savedBudget())
const currentBudget = computed(() => budgets.find((item) => item.id === budget.value)!)
const budgetIcons = { scale: Scale, sparkles: Sparkles, piggy: PiggyBank }
const modeDescriptions = {
  balanced: 'Buen resultado. Gasto sensato. El punto justo.',
  unlimited: 'Vamos con todo. Aquí el presupuesto no pone límites.',
  cheap: 'Cuida la cartera. Cada euro cuenta.',
}
const { enabled: soundEnabled, unavailable: soundUnavailable, play, toggle: toggleSound } = useSound()
const celebrating = ref(false)
const confettiKey = ref(0)
const dialog = ref<HTMLDialogElement | null>(null)
const activeTaskId = ref<TaskId | null>(null)
const activeTask = computed(() => tasks.find((task) => task.id === activeTaskId.value))
const activeModel = computed(() => activeTaskId.value ? getRecommendation(activeTaskId.value, budget.value) : null)
const copyState = ref<'idle' | 'copied' | 'failed'>('idle')
let celebrationTimer: ReturnType<typeof setTimeout> | undefined
let copyTimer: ReturnType<typeof setTimeout> | undefined
let previousOverflow = ''

function selectBudget(nextBudget: Budget) {
  if (budget.value === nextBudget) return
  budget.value = nextBudget
  try { localStorage.setItem('qmu-budget', nextBudget) } catch { /* Storage is optional. */ }
  void play('select')
  clearTimeout(celebrationTimer)
  celebrating.value = true
  confettiKey.value += 1
  celebrationTimer = setTimeout(() => { celebrating.value = false }, 900)
}

async function openTask(id: TaskId) {
  activeTaskId.value = id
  copyState.value = 'idle'
  await nextTick()
  if (!dialog.value) return
  previousOverflow = document.body.style.overflow
  document.body.style.overflow = 'hidden'
  dialog.value.showModal()
  void play('open')
}

function closeTask() {
  dialog.value?.close()
}

function handleClose() {
  document.body.style.overflow = previousOverflow
  activeTaskId.value = null
  clearTimeout(copyTimer)
  void play('close')
}

function handleBackdrop(event: MouseEvent) {
  const modal = dialog.value
  if (!modal || event.target !== modal) return
  const bounds = modal.getBoundingClientRect()
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) closeTask()
}

function handleDialogKeydown(event: KeyboardEvent) {
  const modal = dialog.value
  if (event.key !== 'Tab' || !modal) return
  const controls = modal.querySelectorAll<HTMLButtonElement>('button:not([disabled])')
  const first = controls[0]
  const last = controls[controls.length - 1]
  if (!first || !last) return
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault()
    last.focus()
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault()
    first.focus()
  }
}

async function copyRecommendation() {
  if (!activeTaskId.value) return
  try {
    await navigator.clipboard.writeText(getCopyText(activeTaskId.value, budget.value))
    copyState.value = 'copied'
    void play('copy')
  } catch {
    copyState.value = 'failed'
  }
  clearTimeout(copyTimer)
  copyTimer = setTimeout(() => { copyState.value = 'idle' }, 2500)
}

onUnmounted(() => {
  clearTimeout(celebrationTimer)
  clearTimeout(copyTimer)
  if (dialog.value?.open) document.body.style.overflow = previousOverflow
})
</script>

<template>
  <a href="#presupuesto" class="skip-link">Saltar a las recomendaciones</a>
  <div class="site-shell" :data-budget="budget">
    <header class="site-header flex items-center justify-between gap-4">
      <a class="brand flex items-center gap-2.5" href="#" aria-label="Qué modelo usar, inicio">
        <span class="brand-icon"><Sparkles :size="22" :stroke-width="2.3" /></span>
        <span>qué modelo<span class="brand-end"> usar.</span></span>
      </a>
      <div class="header-actions flex items-center gap-5">
        <span class="update-label"><span class="status-dot"></span> AL DÍA · 02 OCT 2026</span>
        <button class="sound-toggle flex items-center gap-2" type="button" :aria-pressed="soundEnabled" :aria-label="soundEnabled ? 'Desactivar sonido' : 'Activar sonido'" :disabled="soundUnavailable" @click="toggleSound">
          <component :is="soundEnabled ? Volume2 : VolumeX" :size="17" :stroke-width="1.8" />
          <span>Sonido <strong>{{ soundUnavailable ? 'N/D' : soundEnabled ? 'ON' : 'OFF' }}</strong></span>
        </button>
      </div>
    </header>

    <main>
      <section class="hero" aria-labelledby="hero-title">
        <div class="hero-copy">
          <div class="eyebrow"><span class="mini-star">✳</span> TU ATAJO ENTRE TANTO HYPE</div>
          <h1 id="hero-title">El modelo correcto.<br /><span class="highlight-text">Y a otra cosa.</span><span class="title-spark" aria-hidden="true">✦</span></h1>
          <p class="hero-description">Dime qué vas a hacer y cuánto quieres gastar.<br class="desktop-break" /> Te digo con qué IA ponerte manos a la obra.</p>
          <a class="hero-link inline-flex items-center gap-2" href="#presupuesto">Encuentra tu match <ArrowDown :size="17" :stroke-width="2" /></a>
        </div>
        <RobotMascot :budget="budget" :celebrating="celebrating" />
      </section>

      <section id="presupuesto" class="budget-section" aria-labelledby="budget-title">
        <div class="section-heading flex items-center justify-between gap-4">
          <h2 id="budget-title" class="flex items-center gap-2.5"><span class="step-number">1</span> Primero, el presupuesto.</h2>
          <span class="aside-note">Tu dinero, tus reglas.</span>
        </div>
        <fieldset class="budget-switch" aria-describedby="budget-description">
          <legend class="sr-only">Elige tu presupuesto</legend>
          <label v-for="option in budgets" :key="option.id" class="budget-option" :class="{ selected: budget === option.id }" :data-option="option.id">
            <input class="sr-only" type="radio" name="budget" :value="option.id" :checked="budget === option.id" @change="selectBudget(option.id)" />
            <span class="budget-option-icon"><component :is="budgetIcons[option.icon as keyof typeof budgetIcons]" :size="25" :stroke-width="1.7" /></span>
            <span class="budget-option-copy"><strong>{{ option.title }}</strong><span>{{ option.subtitle }}</span></span>
            <span class="radio-indicator"><Check v-if="budget === option.id" :size="14" :stroke-width="2.7" /></span>
          </label>
        </fieldset>
        <p id="budget-description" class="budget-description"><span class="status-dot"></span> {{ modeDescriptions[budget] }}</p>
        <p class="sr-only" role="status">Presupuesto {{ currentBudget.title }}. {{ tasks.map(task => `${task.title}: ${getRecommendation(task.id, budget).name}${getRecommendation(task.id, budget).effort ? ', MAX effort' : ''}`).join('. ') }}.</p>
      </section>

      <section class="tasks-section" aria-labelledby="tasks-title">
        <div class="section-heading task-heading flex items-center justify-between gap-4">
          <h2 id="tasks-title" class="flex items-center gap-2.5"><span class="step-number">2</span> Ahora, ¿qué toca hacer?</h2>
          <span class="task-count">5 TAREAS. CERO VUELTAS.</span>
        </div>
        <div class="task-grid">
          <article v-for="(task, index) in tasks" :key="task.id" class="task-card" :class="`card-${task.id}`" :style="{ '--card-index': index }">
            <div class="card-top flex items-center justify-between">
              <span class="model-avatar"><ModelMascot v-if="getRecommendation(task.id, budget).id" :key="getRecommendation(task.id, budget).id!" :model="getRecommendation(task.id, budget).id!" /><Ban v-else :size="28" aria-hidden="true" /></span>
              <span class="card-number">0{{ index + 1 }} /</span>
            </div>
            <h3 class="task-title">{{ task.title }}</h3>
            <Transition name="model" mode="out-in">
              <div :key="getRecommendation(task.id, budget).id ?? 'discouraged'" class="model-choice">
                <span class="model-name">{{ getRecommendation(task.id, budget).name }}</span>
                <span v-if="getRecommendation(task.id, budget).effort" class="effort-badge"><Zap :size="12" :stroke-width="2" /> MAX effort</span>
              </div>
            </Transition>
            <p class="task-description">{{ task.description }}</p>
            <div class="card-bottom flex items-center justify-between gap-3">
              <span class="provider-badge"><span class="provider-dot"></span> {{ getRecommendation(task.id, budget).provider }}</span>
              <span class="card-arrow"><ArrowRight :size="19" :stroke-width="1.8" /></span>
            </div>
            <button class="card-open" type="button" :aria-label="`Ver recomendación para ${task.title}: ${getRecommendation(task.id, budget).name}${getRecommendation(task.id, budget).effort ? ', MAX effort' : ''}`" @click="openTask(task.id)"></button>
          </article>
        </div>
      </section>

      <aside class="bottom-note flex items-center gap-3">
        <span class="note-icon"><Cpu :size="21" :stroke-width="1.7" /></span>
        <p><strong>La mejor IA es la que encaja con tu tarea.</strong> No siempre la más cara. Ni siempre la misma.</p>
        <span class="note-doodle" aria-hidden="true">✳</span>
      </aside>
    </main>

    <footer class="site-footer flex items-start justify-between gap-4">
      <p>Menos comparar. <strong>Más crear.</strong></p>
      <div class="footer-meta"><span>Selección editorial · <time :datetime="updatedAt">02 oct 2026</time></span><span>Guía estática. Los modelos cambian; las buenas preguntas, no.</span></div>
    </footer>

    <div v-if="celebrating" :key="confettiKey" class="confetti" aria-hidden="true">
      <i v-for="particle in 12" :key="particle" :style="{ '--particle': particle, '--flight-x': `${Math.cos(particle * Math.PI / 6) * 115}px`, '--flight-y': `${Math.sin(particle * Math.PI / 6) * 100 - 30}px` }"></i>
    </div>
  </div>

  <dialog ref="dialog" class="recommendation-dialog" aria-labelledby="dialog-title" aria-describedby="dialog-description" @close="handleClose" @click="handleBackdrop" @keydown="handleDialogKeydown">
    <div v-if="activeTask && activeModel" class="dialog-content" :class="`dialog-${activeTask.id}`">
      <div class="dialog-top flex items-center justify-between gap-4">
        <span class="dialog-eyebrow"><Sparkles :size="15" /> {{ activeModel.id ? 'TU MATCH ESTÁ AQUÍ' : 'NO RECOMENDADO' }}</span>
        <button type="button" class="close-button" aria-label="Cerrar recomendación" autofocus @click="closeTask"><X :size="20" /></button>
      </div>
      <span class="dialog-model-avatar"><ModelMascot v-if="activeModel.id" :model="activeModel.id" /><Ban v-else :size="36" aria-hidden="true" /></span>
      <p class="dialog-task-title">{{ activeTask.title }}</p>
      <h2 id="dialog-title">{{ activeModel.name }}</h2>
      <div class="dialog-badges flex flex-wrap items-center gap-2">
        <span class="provider-badge">{{ activeModel.provider }}</span>
        <span class="provider-badge">{{ currentBudget.title }}</span>
        <span v-if="activeModel.effort" class="effort-badge"><Zap :size="13" /> MAX effort</span>
      </div>
      <p id="dialog-description" class="dialog-description">{{ activeModel.detail }}</p>
      <div v-if="activeModel.id" class="example-list"><strong>Úsalo para...</strong><ul><li v-for="example in activeTask.examples" :key="example"><ChevronRight :size="14" /> {{ example }}</li></ul></div>
      <p class="dialog-note">{{ activeTask.note }}</p>
      <button class="copy-button flex items-center justify-center gap-2" type="button" @click="copyRecommendation"><component :is="copyState === 'copied' ? Check : Copy" :size="18" /> {{ copyState === 'copied' ? '¡Copiado! A crear.' : 'Copiar recomendación' }}</button>
      <p class="copy-feedback" role="status">{{ copyState === 'failed' ? 'No se pudo copiar. Puedes seleccionar el nombre del modelo.' : copyState === 'copied' ? 'Recomendación copiada al portapapeles.' : '' }}</p>
    </div>
  </dialog>
</template>
