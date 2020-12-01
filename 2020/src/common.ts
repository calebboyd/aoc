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
  const message = title + (fail ? ' Not Solved ' : ' Solved ') + data
  if (fail) {
    throw new Error(message)
  }
  console.log(message)
}

export function aoc<T>(
  constructor: (l: string) => T,
  main: (lines: T[], partB: boolean, finish: (results: any, fail?: boolean) => void) => unknown
): (partB?: boolean) => Promise<unknown> {
  const title = main.name.replace('day', 'Day '),
    partB = process.argv.includes('--partb')

  return async function runner(bOverride?: boolean) {
    const lines = await ingest(main.name + '.dat', constructor)
    const b = Boolean(partB || bOverride)
    return main(lines, b, finish.bind(null, title + (b ? ' Part B' : '')))
  }
}

export function run(day: (partB?: boolean) => Promise<unknown>): Promise<unknown[]> {
  return Promise.all([day(), day(true)])
}
