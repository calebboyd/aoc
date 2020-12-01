import { aoc } from './common'

export const day1 = aoc(
  (x) => Number(x),
  function day1(numbers, partB, finish) {
    const addends: number[] = []

    const solved = numbers.some((a) => {
      addends[0] = a
      return numbers.find((b) => {
        addends[1] = b
        if (partB) {
          return numbers.find((c) => {
            addends[2] = c
            return a + b + c === 2020
          })
        }
        return a + b === 2020
      })
    })

    if (solved) {
      finish(addends.reduce((acc, cur) => cur * acc))
    } else {
      finish(addends, true)
    }
  }
)
