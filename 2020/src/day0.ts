import { writeFileSync, appendFileSync } from 'fs'
import { resolve } from 'path'

const dayArg = process.argv.findIndex((x) => x === '--day'),
  name = `day${JSON.parse(process.argv[dayArg + 1])}`

writeFileSync(
  resolve(`./src/${name}.ts`),
  `import { aoc } from './runner'

const ${name} = aoc(
  (line) => line,
  function ${name}(lines, partB, finish) {
    void finish
  },
  '${name}-pre'
)

export default ${name}
`
)
writeFileSync(resolve(`./inputs/${name}-pre`), '')
writeFileSync(resolve(`./inputs/${name}`), '')
appendFileSync(
  resolve('./src/runner.spec.ts'),
  `describe.only('Advent Of Code ${name}', () => {
  test('${name}', async () => {
    const expect = await expectFor('./${name}')
    expect('${name}').toEqual(undefined)
    expect('${name} part b').toEqual(undefined)
  })
})
`
)
