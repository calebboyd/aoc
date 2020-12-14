import { aoc } from './runner'

function toBag(rule: string) {
  rule = rule.replace(/bags?/g, '').replace(/\./g, '')
  const [bag, subBags] = rule.split('contain').map((x) => x.trim()),
    innerBags = subBags
      .split(',')
      .map((x) => x.trim())
      .map((bag) => {
        const match = bag.match(/^(\d+)/)
        if (match) {
          return [bag.replace(match[1], '').trim(), Number(match[1])] as const
        }
        return [bag, 0] as const
      })
  return [bag, innerBags] as const
}

const day07 = aoc(
  toBag,
  function day07(bags, partB, finish) {
    if (!partB) {
      const found = ['shiny gold'],
        visited = new Set<string>()
      let focus: string | undefined = ''
      while ((focus = found.pop())) {
        for (const [bag, innerBags] of bags) {
          if (!visited.has(bag) && innerBags.find((x) => x[0] === focus)) {
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
  'day07-pre',
  'day07-bpre'
)

export default day07
