import { aoc } from './runner'

function without<T>(arr: T[], i: number): T[] {
  const copy = arr.slice()
  copy.splice(i, 1)
  return copy
}

type Adapter = {
  adapter: number
  joltage: number
  visited: boolean
  difference: number
  next: number | undefined
}

function findNext(input: number, joltages: number[], ...tolerances: number[]) {
  return joltages
    .filter((joltage) => {
      return tolerances.includes(joltage - input)
    })
    .sort((a, b) => a - b)[0]
}

const day10 = aoc(
  (line) => Number(line),
  function day10(lines, partB, finish) {
    lines.sort((a, b) => a - b).push(lines[lines.length - 1] + 3)
    lines.unshift(0)
    let one = 0
    let three = 0
    const adapters = Array.from(lines.entries()).map(([i, joltage]) => {
      const next = findNext(joltage, lines.slice(i + 1), 1, 2, 3)
      const adapter = {
        joltage,
        visited: false,
        next,
        difference: next - joltage,
      } as Adapter
      if (adapter.difference === 1) {
        ++one
      }
      if (adapter.difference === 3) {
        ++three
      }
      return adapter
    })

    return finish(one * three)
  },
  'day10-pre',
  'day10-prea'
)

export default day10
