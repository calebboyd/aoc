import { aoc } from './runner'

const directions = /(se)|(sw)|(nw)|(ne)|(w)|(e)/g
const moves = {
  se: { x: 0.5, y: -0.5 },
  sw: { x: -0.5, y: -0.5 },
  nw: { x: -0.5, y: 0.5 },
  ne: { x: 0.5, y: 0.5 },
  w: { x: -1, y: 0 },
  e: { x: 1, y: 0 },
}

const day24 = aoc(
  (line) => line.match(directions) as (keyof typeof moves)[],
  function day24(tiles, partB, finish) {
    const count = tiles.reduce((flipped, t) => {
      const { x, y } = t.reduce(
          (point, dir) => {
            point.x += moves[dir].x
            point.y += moves[dir].y
            return point
          },
          { x: 0, y: 0 }
        ),
        point = [x, y].join(',')
      if (flipped.has(point)) flipped.delete(point)
      else flipped.add(point)
      return flipped
    }, new Set<string>()).size

    return finish(count)
  },
  'day24-pre'
)

export default day24
