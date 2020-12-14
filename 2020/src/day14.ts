import { aoc } from './runner'

const print = (num: number, l = 36) => num.toString(2).padStart(l, '0').split('')
const bin = (bin: string[]) => Number.parseInt(bin.join(''), 2)
function partA(lines: (string | number[])[]) {
  const mem = {} as Record<number, number>
  let mask: any
  for (const line of lines) {
    if (typeof line === 'string') {
      mask = [...line].reduce((mask, bit, i) => {
        if (bit !== 'X') mask[i] = bit
        return mask
      }, [] as string[])
    } else {
      const [i, x] = line
      mem[i] = bin(Object.assign(print(x), mask))
    }
  }
  return Object.values(mem).reduce((a, c) => a + c, 0)
}

function wildBit(addr: string[], idx: number) {
  return [Object.assign(addr.slice(), { [idx]: '1' }), Object.assign(addr.slice(), { [idx]: '0' })]
}

function partB(lines: (string | number[])[]) {
  const mem = {} as Record<number, number>
  let mask: any
  for (const line of lines) {
    if (typeof line === 'string') {
      mask = [...line].reduce((mask, bit, i) => {
        if (bit !== '0') mask[i] = bit
        return mask
      }, [] as string[])
    } else {
      const addresses = [Object.assign(print(line[0]), mask)]
      while (addresses.length) {
        const cur = addresses.pop()
        let idx = -1
        if (~(idx = cur.indexOf('X'))) addresses.unshift(...wildBit(cur, idx))
        else mem[bin(cur)] = line[1]
      }
    }
  }
  return Object.values(mem).reduce((a, c) => a + c, 0)
}

const day14 = aoc(
  (line) => {
    if (line.startsWith('mask')) {
      return line.replace('mask = ', '')
    }
    return line
      .replace(/mem\[(\d+)\] = (\d+)$/, '$1,$2')
      .split(',')
      .map(Number)
  },
  function day14(lines, isPartB, finish) {
    if (isPartB) {
      return finish(partB(lines))
    }
    return finish(partA(lines))
  }
)

export default day14
