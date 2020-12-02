import { aoc } from './runner'

const day1 = aoc(
  (x) => Number(x),
  function day1(numbers, partB, finish) {
    const addends: number[] = [],
      solved = numbers.some((a, i) => {
        addends[0] = a
        return numbers.find((b, j) => {
          if (j === i) {
            return false
          }
          addends[1] = b
          if (partB) {
            return numbers.find((c, k) => {
              if (k === i || k === j) {
                return false
              }
              addends[2] = c
              return a + b + c === 2020
            })
          }
          return a + b === 2020
        })
      })

    if (solved) {
      const output = addends.reduce((acc, cur) => cur * acc)
      return finish(output)
    }
    return finish(false)
  },
  'day1-edge'
)

export default day1
