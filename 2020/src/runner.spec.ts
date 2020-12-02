import { run } from './runner'
import { day1 } from './day1'
import { day2 } from './day2'

describe('Advent Of Code', () => {
  it('day1', async () => {
    const results = await run(day1)
    expect(results.get('day1')?.output).toBe(1007331)
    expect(results.get('day1 part b')?.output).toBe(48914340)
    expect(results.get('day1-edge')?.output).toEqual(false)
    expect(results.get('day1-edge part b')?.output).toEqual(false)
  })
  it('day2', async () => {
    const results = await run(day2)
    expect(results.get('day2-pre')?.output).toBe(2)
    expect(results.get('day2-pre part b')?.output).toBe(1)
    expect(results.get('day2')?.output).toEqual(560)
    expect(results.get('day2 part b')?.output).toEqual(303)
  })
})
