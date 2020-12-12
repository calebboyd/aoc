import { aoc } from './runner'

//Direction Maps
const R = Object.fromEntries(
    Array.from(Array(4), (_, i) => 'NESWESWN'.split('').slice(i * 2, i * 2 + 2))
  ),
  L = Object.fromEntries(Object.entries(R).map((x) => x.reverse()))

const day12 = aoc(
  (line) => [line.slice(0, 1), +line.slice(1)] as const,
  function day12(directions, partB, finish) {
    const [x, y, _, sx, sy] = directions.reduce(
      ([x, y, f, sx, sy], [op, i]) => {
        const nsew = (o: string) => {
          if (o === 'N') y += i
          if (o === 'S') y -= i
          if (o === 'E') x += i
          if (o === 'W') x -= i
        }
        nsew(op)
        if (op === 'L' || op === 'R')
          f = Array.from(Array(i / 90)).reduce((f, flip) => {
            if (!partB) return { L, R }[op][f]
            if (op === 'L') y *= -1
            if (op === 'R') x *= -1
            flip = x
            x = y
            y = flip
          }, f)
        if (op === 'F') {
          if (!partB) nsew(f)
          else {
            sx += x * i
            sy += y * i
          }
        }
        return [x, y, f, sx, sy]
      },
      partB ? [10, 1, 'E', 0, 0] : [0, 0, 'E', 0, 0]
    )
    return finish(partB ? Math.abs(sx) + Math.abs(sy) : Math.abs(x) + Math.abs(y))
  },
  'day12-pre'
)

export default day12
