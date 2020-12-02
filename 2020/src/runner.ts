import { resolve as pathResolve, join } from 'path'
import { createReadStream } from 'fs'
import { createInterface } from 'readline'

async function ingest<T>(file: string, constructor: (l: string) => T) {
  const byLine = createInterface(createReadStream(pathResolve(__dirname, join('../inputs', file)))),
    lines: T[] = []
  for await (const line of byLine) {
    lines.push(constructor(line))
  }
  return lines
}

function finish(title: string, data: any, fail?: boolean): void {
  const message = title + (fail ? ' --- Not Solved --- ' : ' --- Solved ') + data
  if (fail) {
    throw new Error(message)
  }
  console.log(message)
  return data
}

type ResultSet = Map<string, { output: any; partB: boolean }>

export function aoc<T>(
  constructor: (l: string) => T,
  main: (lines: T[], partB: boolean, finish: (results: unknown, fail?: boolean) => void) => unknown,
  ...additionalInputs: string[]
): (partB?: boolean) => Promise<ResultSet> {
  const title = main.name.replace('day', 'Day '),
    partB = process.argv.includes('--partb')

  return async function runner(bOverride?: boolean) {
    const inputs = [...additionalInputs, main.name],
      input = await Promise.all(
        inputs.map((x) => {
          return ingest(x, constructor)
        })
      ),
      results: ResultSet = new Map()
    for (const [i, lines] of input.entries()) {
      const b = Boolean(partB || bOverride),
        output = await main(
          lines,
          b,
          finish.bind(null, title + (b ? '\nPart B' : '') + '\nInput: ' + inputs[i])
        )
      results.set(inputs[i] + (b ? ' part b' : ''), {
        output,
        partB: b,
      })
    }
    return results
  }
}

export async function run(
  day: (partB?: boolean) => ReturnType<ReturnType<typeof aoc>>
): Promise<ResultSet> {
  const [part1, part2] = await Promise.all([day(), day(true)]),
    dayResults = Array.from(part1.entries())
  dayResults.push(...part2.entries())
  return new Map(dayResults)
}
