import { aoc } from './runner'

function partA(lines: [number, number[]], finish: any) {
  let [time, buses] = lines as [number, number[]],
    found: number | undefined
  buses = buses.filter((x) => x === 0 || x)
  while (!(found = buses.find((x) => time % x === 0))) {
    time++
  }
  return finish((time - lines[0]) * found)
}

const day13 = aoc(
  (line) => {
    if (line.includes(',')) {
      return line.split(',').map(Number)
    }
    return Number(line)
  },
  function day13(lines, partB, finish) {
    if (!partB) {
      return partA(lines as [number, number[]], finish)
    }
    const [first, ...input] = lines[1] as number[],
      buses = input.map((x, i) => [x, i + 1]).filter(([x]) => !Number.isNaN(x))
    let departureTime = first,
      step = first
    for (const [id, offset] of buses) {
      while ((departureTime + offset) % id !== 0) {
        departureTime += step
      }
      step *= id
    }
    return finish(departureTime)
  },
  'day13-pre'
)

export default day13
