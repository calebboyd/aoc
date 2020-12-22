import { aoc } from './runner'

const toCodeExpression = (line: string) =>
    line.replace(/\(/g, 'Num(').replace(/(\d+)/g, `Num($1)`).replace(/ \+ /g, '.add'),
  day18 = aoc(
    toCodeExpression,
    function day18(expressions, partB, finish) {
      const Num = (value: number) => {
        value = +value
        const num: any = {},
          chain = (op: (a: number) => any) => (a: number) => (op(a) || true) && num
        num.valueOf = () => value
        num.add = num.addNum = chain((x) => (value += x))
        num.mul = num.mulNum = chain((x) => (value *= x))
        return num
      }
      return finish(
        expressions.reduce((a, exp) => {
          if (!partB) exp = exp.replace(/ \* /g, '.mul')
          return a + eval(exp)
        }, 0)
      )
    },
    'day18-pre'
  )

export default day18
