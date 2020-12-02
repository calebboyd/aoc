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
}

export function aoc<T>(
  constructor: (l: string) => T,
  main: (lines: T[], partB: boolean, finish: (results: any, fail?: boolean) => void) => unknown,
  ...additionalInputs: string[]
): (partB?: boolean) => Promise<unknown> {
  const title = main.name.replace('day', 'Day '),
    partB = process.argv.includes('--partb')

  return async function runner(bOverride?: boolean) {
    const inputs = [...additionalInputs, main.name].map((x) => x + '.dat')
    const input = await Promise.all(
      inputs.map((x) => {
        return ingest(x, constructor)
      })
    )
    for (const [i, lines] of input.entries()) {
      const b = Boolean(partB || bOverride)
      await main(
        lines,
        b,
        finish.bind(null, title + (b ? '\nPart B' : '') + '\nInput: ' + inputs[i])
      )
    }
  }
}

export function run(day: (partB?: boolean) => Promise<unknown>): Promise<unknown[]> {
  return Promise.all([day(), day(true)])
}
