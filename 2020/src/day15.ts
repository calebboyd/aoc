import { aoc } from './runner'

const day15 = aoc(
  (line) => line.split(',').map(Number),
  function day15(puzzles, partB, finish) {
    const iterations = partB ? 3e7 : 2020,
      results: number[] = []
    while (puzzles.length) {
      const input = puzzles.shift()!,
        spoken = new Map<number, number[]>(input.map((x, i) => [x, [i + 1]]))
      let turn = input.length,
        lastSpoken = input[input.length - 1]
      while (turn++ < iterations) {
        const last = spoken.get(lastSpoken) || []
        if (last.length > 1) {
          lastSpoken = last[last.length - 1] - last[last.length - 2]
        } else {
          lastSpoken = 0
        }
        const turns = spoken.get(lastSpoken) || []
        turns.push(turn)
        spoken.set(lastSpoken, turns)
      }
      results.push(lastSpoken)
    }
    return finish(results)
  }
)

export default day15
