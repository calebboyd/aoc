import { aoc } from './runner'

type Op = 'jmp' | 'nop' | 'acc'
type Instruction = [Op, number]

function instruction(line: string): Instruction {
  const [op, value] = line.split(' ')
  return [op, Number(value)] as Instruction
}

function setOp(ops: Instruction[], opIndex: number, setTo: Op) {
  const copy = ops.slice(),
    ins = copy[opIndex].slice()
  ins[0] = setTo
  copy[opIndex] = ins as Instruction
  return copy
}

function execute(ops: Instruction[]) {
  const visited = new Set()
  let pointer = 0,
    acc = 0,
    ins: Instruction
  try {
    while ((ins = ops[pointer]) && !visited.has(ins)) {
      visited.add(ins)
      const [op, add] = ins
      if (op === 'jmp' && add === 0) throw new Error('jmp circular reference detected')
      if (op === 'acc') acc += add
      pointer += op === 'jmp' ? add : 1
    }
  } catch (e) {
    console.log(e)
    return { acc: 1, finished: false }
  }
  return { acc, finished: pointer === ops.length }
}

const day08 = aoc(
  instruction,
  function day08(instructions, partB, finish) {
    const { acc } = execute(instructions)
    if (!partB) {
      return finish(acc)
    }

    const toFlip = { jmp: 'nop', nop: 'jmp', acc: null },
      flipFlop = instructions.map(([x], i) => ({ op: toFlip[x] as Op, i })).filter(({ op }) => op)

    for (const { i, op } of flipFlop) {
      const { acc, finished } = execute(setOp(instructions, i, op))
      if (finished) {
        return finish(acc)
      }
    }
  },
  'day08-pre'
)

export default day08
