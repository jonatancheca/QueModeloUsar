import test from 'node:test'
import assert from 'node:assert/strict'
import { budgets, getCopyText, getRecommendation, tasks } from '../src/data/recommendations.ts'

const expected = {
  computer: ['astra', 'astra', null],
  audiovisual: ['opus', 'opus', 'sol'],
  architecture: ['sol', 'opus', 'sol'],
  coding: ['sol', 'opus', 'luna'],
  routine: ['luna', 'luna', 'luna'],
} as const

for (const task of tasks) {
  budgets.forEach((budget, index) => {
    test(`${task.id}: ${budget.id} returns the configured recommendation`, () => {
      const recommendation = getRecommendation(task.id, budget.id)
      assert.equal(recommendation.id, expected[task.id][index])
      assert.ok(recommendation.name)
      if (recommendation.id === 'luna') assert.equal(recommendation.effort, 'MAX effort')
    })
  })
}

test('missing cheap architecture choice explicitly falls back to Sol', () => {
  assert.equal(getRecommendation('architecture', 'cheap').usesFallback, true)
  assert.equal(getRecommendation('coding', 'cheap').usesFallback, false)
})

test('copy text preserves MAX effort and the selected budget', () => {
  const text = getCopyText('coding', 'cheap')
  assert.ok(text.includes('Luna 6.1 · MAX effort'))
  assert.ok(text.includes('Modo ahorro'))
})
