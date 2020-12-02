import { resolve as pathResolve, join } from 'path'
import { createReadStream } from 'fs'
import { createInterface } from 'readline'

type Result = { output: unknown; partB: boolean }
type ResultSet = Map<string, Result>
type AoCImplementation = (partB?: boolean) => Promise<ResultSet>
type ResultPicker = (inputKey: string) => unknown | (() => ResultSet)

async function ingest<T>(file: string, constructor: (l: string) => T) {
  const byLine = createInterface(createReadStream(pathResolve(__dirname, join('../inputs', file)))),
    lines: T[] = []
  for await (const line of byLine) {
    lines.push(constructor(line))
  }
  return lines
}

function finish(title: string, data: unknown, fail?: boolean): unknown {
  const message = title + (fail ? ' --- Not Solved --- ' : ' --- Solved ') + data
  if (fail) {
    throw new Error(message)
  }
  console.log(message)
  return data
}

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
  fun: AoCImplementation | Promise<{ default: AoCImplementation }>
): Promise<ResultPicker> {
  const day = typeof fun === 'function' ? fun : (await fun).default,
    [part1, part2] = await Promise.all([day(), day(true)]),
    dayResults = Array.from(part1.entries())

  dayResults.push(...part2.entries())
  const set = new Map(dayResults)
  return (key?: string) => (key ? set.get(key)?.output : set)
}
