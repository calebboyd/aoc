import { aoc } from './runner'

type Rule = { valid: Set<number>; indexes: number[]; name: string }
const parseLine = (line: string): Rule | number[] | undefined => {
    if (line.includes('or')) {
      const [lower, top] = line.split(' or '),
        [rule, bottom] = lower.split(': ')
      return { indexes: [], valid: new Set([...makeRange(bottom), ...makeRange(top)]), name: rule }
    }
    if (/[\d,]+/.test(line)) return line.split(',').map(Number)
  },
  makeRange = (input: string) => {
    const [bottom, top] = input.split('-').map(Number)
    return Array.from(Array(top - bottom + 1), (v, k) => k + bottom)
  }
const day16 = aoc(parseLine, function day16(lines, partB, finish) {
  const [myTicket, ...tickets] = lines.filter(Array.isArray) as number[][],
    rules = lines.filter((x: any) => x?.name) as Rule[],
    ruleSet = rules.reduce((one, { valid }) => new Set([...one, ...valid]), new Set<number>()),
    validTickets = tickets.filter((x) => x.every((x) => ruleSet.has(x)))
  if (!partB) {
    return finish(
      tickets
        .flat()
        .filter((x) => !ruleSet.has(x))
        .reduce((a, c) => a + c, 0)
    )
  }
  for (const rule of rules) {
    for (const [i, value] of myTicket.entries()) {
      if (!rule.valid.has(value)) continue
      if (validTickets.every((x) => rule.valid.has(x[i]))) {
        rule.indexes.push(i)
      }
    }
  }
  const foundFields = new Set<number>(),
    filter = (x: number) => !foundFields.has(x)
  let idx = -1
  return finish(
    rules
      .sort((a, b) => a.indexes.length - b.indexes.length)
      .reduce((a, { name, indexes }) => {
        foundFields.add((idx = indexes.find(filter)!))
        return name.startsWith('departure') ? a * myTicket[idx] : a
      }, 1)
  )
})

export default day16
