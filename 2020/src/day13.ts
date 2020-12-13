import { aoc } from './runner'

function partA(lines: [number, number[]], finish: any) {
  const ticket = lines as [number, number[]],
    arrival = ticket[0],
    busses = ticket[1].filter((x) => x === 0 || x)
  let nextBus: number | undefined
  let time = arrival
  while (typeof nextBus !== 'number') {
    const found = busses.find((x) => time % x === 0)
    if (typeof found === 'number') {
      nextBus = found
    } else {
      time++
    }
  }
  return finish((time - arrival) * nextBus)
}

const day13 = aoc(
  (line) => {
    if (line.includes(',')) {
      return line.split(',').map(Number)
    }
    return Number(line)
  },
  async function day13(lines, partB, finish) {
    if (!partB) {
      return partA(lines as [number, number[]], finish)
    }
    const [first, ...input] = lines[1] as number[]
    const buses = input.map((x, i) => [x, i + 1]).filter(([x]) => !Number.isNaN(x))
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
