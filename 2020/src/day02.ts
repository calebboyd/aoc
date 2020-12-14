import { aoc } from './runner'

const day02 = aoc(
  (line) => {
    const [policy, pw] = line.split(':').map((x) => x.trim()),
      [ab, focus] = policy.split(' ')
    return [ab.split('-').map(Number), focus, pw] as const
  },
  function day02(lines, partB, finish) {
    let validA = 0,
      validB = 0
    for (const [[a, b], focus, pw] of lines) {
      const occurrences = Array.from(pw).filter((x) => x === focus).length
      if (occurrences >= a && occurrences <= b) {
        validA++
      }
      const count = [pw[a - 1] === focus, pw[b - 1] === focus].filter((x) => x)
      if (count.length === 1) {
        validB++
      }
    }
    return finish(partB ? validB : validA)
  },
  'day02-pre'
)
export default day02
