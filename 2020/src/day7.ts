import { aoc } from './runner'

function toBag(rule: string) {
  rule = rule.replace(/bags?/g, '').replace(/\./g, '')
  const [bag, subBags] = rule.split('contain').map((x) => x.trim()),
    canHold = subBags
      .split(',')
      .map((x) => x.trim())
      .map((bag) => {
        const match = bag.match(/^(\d+)/)
        if (match) {
          return [bag.replace(match[1], '').trim(), Number(match[1])] as const
        }
        return [bag, 0] as const
      })
  return [bag, canHold] as const
}

const day7 = aoc(
  toBag,
  async function day7(bags, partB, finish) {
    if (!partB) {
      const found = ['shiny gold'],
        visited = new Set<string>()
      let focus: string | undefined = ''
      while ((focus = found.pop())) {
        for (const [bag, canHold] of bags) {
          if (canHold.find((x) => x[0] === focus) && !visited.has(bag)) {
            visited.add(bag)
            found.push(bag)
          }
        }
      }
      return finish(visited.size)
    }
    let bagCount = 0
    const allBags = ['shiny gold']
    while (allBags.length) {
      const focus = allBags.pop(),
        [_, innerBags] = bags.find(([b]) => b === focus) || ['', []]
      for (const [innerBag, count] of innerBags) {
        allBags.push(...(Array(count).fill(innerBag) as any))
        bagCount += count
      }
    }
    return finish(bagCount)
  },
  'day7-pre',
  'day7-bpre'
)

export default day7
