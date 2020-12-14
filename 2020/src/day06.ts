import { aoc } from './runner'

function parseAnswers(line: string): Record<string, true> | false {
  if (!line.trim()) {
    return false
  }
  return Object.fromEntries([...line].map((x) => [x, true]))
}

function teams(people: ReturnType<typeof parseAnswers>[]) {
  return people.reduce(
    (groups, person) => {
      if (!person) {
        groups.push([])
        return groups
      }
      groups[groups.length - 1].push(person)
      return groups
    },
    [[]] as Record<string, true>[][]
  )
}

const day06 = aoc(
  parseAnswers,
  function day06(answers, partB, finish) {
    const groups = teams(answers)
    let sum = 0,
      count = 0
    for (const people of groups) {
      const questions = Object.keys(Object.assign({}, ...people))
      sum += questions.length
      count += questions.filter((question) => {
        return people.every((answers: any) => question in answers)
      }).length
    }
    return partB ? finish(count) : finish(sum)
  },
  'day06-pre'
)

export default day06
