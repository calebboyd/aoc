import { aoc } from './runner'

type Node = {
  i: number
  joltage: number
  children: Node[]
}
const day10 = aoc(
  (line) => Number(line),
  function day10(lines, partB, finish) {
    lines = [0, ...lines.sort((a, b) => a - b)]
    lines.push(lines[lines.length - 1] + 3)
    let threeJolt = 0,
      oneJolt = 0
    const nodes: Node[] = Array.from(lines.entries()).map(([i, joltage]) => ({
        i,
        joltage,
        children: [],
      })),
      counts = nodes.reduce(
        (pathCount, { children, joltage, i: parentI }) => {
          const [first, ...rest] = nodes.slice(parentI + 1).filter((x) => x.joltage - joltage <= 3)
          if (first) {
            children.push(first, ...rest)
            if (first.joltage - joltage === 3) threeJolt++
            if (first.joltage - joltage === 1) oneJolt++
          }
          children.forEach(({ i }) => {
            const parentPathCount = pathCount[parentI] ?? 0,
              existingPathCount = pathCount[i] ?? 0
            pathCount[i] = parentPathCount + existingPathCount
          })
          return pathCount
        },
        { 0: 1 } as { [key: number]: number }
      )

    if (!partB) return finish(oneJolt * threeJolt)
    return finish(counts[nodes.length - 1])
  },
  'day10-pre',
  'day10-prea'
)

export default day10
