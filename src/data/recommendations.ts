export type Budget = 'balanced' | 'unlimited' | 'cheap'
export type TaskId = 'computer' | 'audiovisual' | 'architecture' | 'coding' | 'routine'
export type ModelId = 'astra' | 'opus' | 'sol' | 'luna'

export const updatedAt = '2026-10-02'

export const budgets: { id: Budget; title: string; subtitle: string; icon: string }[] = [
  { id: 'balanced', title: 'Equilibrado', subtitle: 'El mejor coste / beneficio', icon: 'scale' },
  { id: 'unlimited', title: 'Sin límites', subtitle: 'El presupuesto no importa', icon: 'sparkles' },
  { id: 'cheap', title: 'Modo ahorro', subtitle: 'Que cueste poquito', icon: 'piggy' },
]

export const models: Record<ModelId, { name: string; provider: string; effort?: string; detail: string }> = {
  astra: {
    name: 'GPT 6 Astra', provider: 'OpenAI',
    detail: 'La elección de esta guía para trabajar con interfaces, navegar y encadenar acciones en una computadora.',
  },
  opus: {
    name: 'Opus 5.5', provider: 'Anthropic',
    detail: 'La elección de esta guía para contenido audiovisual, y para arquitectura o código cuando el presupuesto no es un límite.',
  },
  sol: {
    name: 'Sol 6.1', provider: 'OpenAI',
    detail: 'La elección de esta guía para equilibrar coste y resultado en arquitectura y programación, y para contenido audiovisual en modo ahorro.',
  },
  luna: {
    name: 'Luna 6.1', provider: 'OpenAI', effort: 'MAX effort',
    detail: 'La elección de esta guía para tareas sencillas y para programar con un presupuesto ajustado. Configura el esfuerzo en MAX.',
  },
}

export const tasks: {
  id: TaskId; title: string; description: string; examples: string[];
  choices: Partial<Record<Budget, ModelId>>; note: string;
}[] = [
  {
    id: 'computer', title: 'Usar la computadora',
    description: 'Navegar, hacer clic y dejar que la IA se encargue.',
    examples: ['Manejar un navegador', 'Rellenar formularios', 'Automatizar una interfaz'],
    choices: { balanced: 'astra' },
    note: 'Para esta tarea, usa GPT 6 Astra en Equilibrado o Sin límites.',
  },
  {
    id: 'audiovisual', title: 'Contenido audiovisual',
    description: 'Ideas, guiones y contenido que se ve y se escucha.',
    examples: ['Preparar un guion', 'Desarrollar una pieza audiovisual', 'Trabajar una dirección creativa'],
    choices: { balanced: 'opus', cheap: 'sol' },
    note: 'En modo ahorro, usa Sol 6.1. En Equilibrado y Sin límites, usa Opus 5.5.',
  },
  {
    id: 'architecture', title: 'Pensar la arquitectura',
    description: 'Diseñar el sistema antes de poner el primer ladrillo.',
    examples: ['Diseñar un sistema', 'Comparar enfoques técnicos', 'Planificar una estructura'],
    choices: { balanced: 'sol', unlimited: 'opus' },
    note: 'Sin una alternativa de ahorro definida, se mantiene Sol 6.1.',
  },
  {
    id: 'coding', title: 'Picar código',
    description: 'De la idea al código. Y del bug al «ya funciona».',
    examples: ['Construir una función', 'Resolver un bug', 'Refactorizar código'],
    choices: { balanced: 'sol', unlimited: 'opus', cheap: 'luna' },
    note: 'En modo ahorro, usa Luna 6.1 con MAX effort.',
  },
  {
    id: 'routine', title: 'Una tarea rapidita',
    description: 'Un commit, un pequeño cambio, un trámite. Hecho.',
    examples: ['Preparar un commit', 'Renombrar algo', 'Hacer un cambio sencillo'],
    choices: { balanced: 'luna' },
    note: 'Luna 6.1 con MAX effort en los tres presupuestos.',
  },
]

export function getRecommendation(taskId: TaskId, budget: Budget) {
  const task = tasks.find((item) => item.id === taskId)
  if (!task) throw new Error(`Unknown task: ${taskId}`)
  if (taskId === 'computer' && budget === 'cheap') {
    return {
      id: null, name: 'ni se te ocurra', provider: 'No recomendado', effort: undefined,
      detail: 'Para automatizar una interfaz, cambia a Equilibrado o Sin límites.',
      usesFallback: false,
    }
  }
  const modelId = task.choices[budget] ?? task.choices.balanced!
  return { ...models[modelId], id: modelId, usesFallback: !task.choices[budget] && budget !== 'balanced' }
}

export function getCopyText(taskId: TaskId, budget: Budget) {
  const task = tasks.find((item) => item.id === taskId)!
  const recommendation = getRecommendation(taskId, budget)
  const budgetName = budgets.find((item) => item.id === budget)!.title
  return `${task.title}\nPresupuesto: ${budgetName}\n${recommendation.id ? 'Modelo' : 'Recomendación'}: ${recommendation.name}${recommendation.effort ? ` · ${recommendation.effort}` : ''}\nSelección editorial: ${updatedAt}`
}
