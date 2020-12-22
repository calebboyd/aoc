import { aoc } from './runner'

const toCodeExpression = (line: string) =>
    line.replace(/\(/g, 'Num(').replace(/(\d+)/g, `Num($1)`).replace(/ \+ /g, '.add'),
  day18 = aoc(
    toCodeExpression,
    function day18(weirdMath, partB, finish) {
      const Num = (value: number) => {
        value = +value
        return {
          valueOf() {
            return value
          },
          add(x: { valueOf: () => number }) {
            return this.addNum(+x)
          },
          mul(x: { valueOf: () => number }) {
            return this.mulNum(+x)
          },
          mulNum(x: number) {
            value *= x
            return this
          },
          addNum(x: number) {
            value += x
            return this
          },
        }
      }
      return finish(
        weirdMath.reduce((a, c) => {
          if (!partB) c = c.replace(/ \* /g, '.mul')
          return a + eval(c)
        }, 0)
      )
    },
    'day18-pre'
  )

export default day18
