import test from 'node:test'
import assert from 'node:assert/strict'
import { budgets, getCopyText, getRecommendation, tasks } from '../src/data/recommendations.ts'

const expected = {
  computer: ['astra', 'astra', null],
  audiovisual: ['opus', 'opus', 'sol'],
  architecture: ['sol', 'opus', 'sol'],
  coding: ['sol', 'opus', 'haiku'],
  routine: ['haiku', 'haiku', 'haiku'],
} as const

for (const task of tasks) {
  budgets.forEach((budget, index) => {
    test(`${task.id}: ${budget.id} returns the configured recommendation`, () => {
      const recommendation = getRecommendation(task.id, budget.id)
      assert.equal(recommendation.id, expected[task.id][index])
      assert.ok(recommendation.name)
      if (recommendation.id === 'haiku') {
        assert.equal(recommendation.name, 'Haiku 5.5')
        assert.equal(recommendation.provider, 'Anthropic')
        assert.equal(recommendation.effort, undefined)
      }
    })
  })
}

test('missing cheap architecture choice explicitly falls back to Sol', () => {
  assert.equal(getRecommendation('architecture', 'cheap').usesFallback, true)
  assert.equal(getRecommendation('coding', 'cheap').usesFallback, false)
})

test('copy text names Haiku and preserves the selected budget', () => {
  const text = getCopyText('coding', 'cheap')
  assert.ok(text.includes('Modelo: Haiku 5.5'))
  assert.ok(!text.includes('MAX effort'))
  assert.ok(text.includes('Modo ahorro'))
})
