import { run } from './runner'

describe('Advent Of Code', () => {
  test('day1', async () => {
    const outputOf = await run(import('./day1'))
    expect(outputOf('day1')).toBe(1007331)
    expect(outputOf('day1 part b')).toBe(48914340)
    expect(outputOf('day1-edge')).toEqual(false)
    expect(outputOf('day1-edge part b')).toEqual(false)
  })
  test('day2', async () => {
    const outputOf = await run(import('./day2'))
    expect(outputOf('day2-pre')).toBe(2)
    expect(outputOf('day2-pre part b')).toBe(1)
    expect(outputOf('day2')).toEqual(560)
    expect(outputOf('day2 part b')).toEqual(303)
  })
})
