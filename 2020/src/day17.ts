import { aoc } from './runner'

const day17 = aoc(
  (line, y) =>
    [...line]
      .map((c, x) => [[x, y, 0].join(','), c === '#' ? 1 : 0] as [string, number])
      .filter((x) => x[1]),
  function day17(input, partB, finish) {
    const point = (x: (string | number)[]) => [...x, 0].slice(0, partB ? 4 : 3).join(',')
    let current = new Map(input.flat().map(([key, count]) => [point(key.split(',')), count])),
      next = current,
      cycle = 6
    while (cycle--) {
      current = next
      next = new Map()
      for (const [key] of new Map(current)) {
        const [x, y, z, w] = key.split(',').map(Number)
        for (const iz of [-1, 0, 1]) {
          for (const iy of [-1, 0, 1]) {
            for (const ix of [-1, 0, 1]) {
              if (partB) {
                for (const iw of [-1, 0, 1]) {
                  const adj = point([ix + x, iy + y, iz + z, iw + w])
                  if (adj === key) continue
                  next.set(adj, (next.get(adj) ?? 0) + 1)
                }
              } else {
                const adj = point([ix + x, iy + y, iz + z])
                if (adj === key) continue
                next.set(adj, (next.get(adj) ?? 0) + 1)
              }
            }
          }
        }
      }
      Array.from(next).forEach(([node, x]) => {
        const active = current.has(node)
        if ((active && (x < 2 || x > 3)) || (!active && x !== 3)) {
          next.delete(node)
        }
      })
    }
    return finish(next.size)
  },
  'day17-pre'
)

export default day17
