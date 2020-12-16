import { resolve as pathResolve, join } from 'path'
import { createReadStream } from 'fs'
import { createInterface } from 'readline'

type Result = { output: unknown; partB: boolean }
type ResultSet = Map<string, Result>
type AoCImplementation = (partB?: boolean) => Promise<ResultSet>
type ResultPicker = (inputKey: string) => unknown | (() => ResultSet)

async function ingest(file: string) {
  const byLine = createInterface(createReadStream(pathResolve(__dirname, join('../inputs', file)))),
    lines: string[] = []
  for await (const line of byLine) {
    lines.push(line)
  }
  return lines
}

function finish(start: [number, number], title: string, data: unknown): unknown {
  const diff = process.hrtime(start)
  const message = `${title} finished with: ${data}\nin ${((diff[0] * 1e9 + diff[1]) / 1e6).toFixed(
    3
  )}ms`
  console.log(message)
  return data
}

export function aoc<T, K = any>(
  constructor: [(...args: any[]) => K, T] | ((l: string, i?: number, list?: string[]) => T),
  main: (
    lines: typeof constructor extends any[] ? K : T[],
    partB: boolean,
    finish: (results: unknown, fail?: boolean) => void
  ) => unknown,
  ...additionalInputs: string[]
): (partB?: boolean) => Promise<ResultSet> {
  const title = main.name.replace('day', 'Day '),
    partB = process.argv.includes('--partb')

  return async function runner(bOverride?: boolean) {
    const inputs = [...additionalInputs, main.name],
      results: ResultSet = new Map(),
      input = await Promise.all(
        inputs.map((x) => {
          return ingest(x)
        })
      )

    for (const [i, lines] of input.entries()) {
      let input: any = lines
      const b = Boolean(partB || bOverride),
        done = finish.bind(
          null,
          process.hrtime(),
          title + (b ? ' Part B' : '') + ' with file: ' + inputs[i]
        )
      if (Array.isArray(constructor)) {
        input = input.reduce(constructor[0], constructor[1])
      } else {
        input = input.map(constructor)
      }
      const output = await main(input, b, done)
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
    part1 = await day(),
    part2 = await day(true),
    dayResults = [...part1.entries(), ...part2.entries()],
    set = new Map(dayResults)
  return (key?: string) => (key ? set.get(key)?.output : set)
}
