import { aoc } from './runner'

function getCorruptNumber(numbers: number[], window: [number, number]) {
  let isValid: number | undefined,
    focus = 0
  do {
    const preamble = numbers.slice(...window),
      addends = []
    focus = numbers[window[1]]
    isValid = preamble.find((num, i) => {
      addends[0] = num
      const add = preamble.slice()
      add.splice(i, 1)
      return add.find((x) => {
        if (focus - num === x) {
          addends[1] = x
          return true
        }
      })
    })
    window = [window[0] + 1, window[1] + 1]
  } while (isValid)
  return focus
}

const day09 = aoc(
  (line) => Number(line),
  function day09(numbers, partB, finish) {
    if (partB) {
      const corrupt = getCorruptNumber(numbers, [0, 25])
      num: for (const [i, num] of numbers.entries()) {
        let sum = num
        for (const [j, add] of numbers.slice(i + 1).entries()) {
          if ((sum += add) > corrupt) {
            continue num
          }
          if (sum === corrupt) {
            const window = numbers.slice(i, j + i + 2)
            return finish(Math.min(...window) + Math.max(...window))
          }
        }
      }
    }
    return finish(getCorruptNumber(numbers, [0, 25]))
  }
)

export default day09
