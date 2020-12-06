import { run } from './runner'

async function expectFor(day: string) {
  const outputOf = await run(import(day))
  return (dayPart: string) => {
    return expect(outputOf(dayPart))
  }
}
describe('Advent Of Code day1', () => {
  test('day1', async () => {
    const expect = await expectFor('./day1')
    expect('day1').toBe(1007331)
    expect('day1 part b').toBe(48914340)
    expect('day1-edge').toEqual(false)
    expect('day1-edge part b').toEqual(false)
  })
})
describe('Advent Of Code day2', () => {
  test('day2', async () => {
    const expect = await expectFor('./day2')
    expect('day2-pre').toBe(2)
    expect('day2-pre part b').toBe(1)
    expect('day2').toEqual(560)
    expect('day2 part b').toEqual(303)
  })
})
describe('Advent Of Code day3', () => {
  test('day3', async () => {
    const expect = await expectFor('./day3')
    expect('day3').toEqual(145)
    expect('day3 part b').toEqual(3424528800)
  })
})
describe('Advent Of Code day4', () => {
  test('day4', async () => {
    const expect = await expectFor('./day4')
    expect('day4').toEqual(233)
    expect('day4 part b').toEqual(111)
    expect('day4-pre').toEqual(2)
  })
})
describe('Advent Of Code day5', () => {
  test('day5', async () => {
    const expect = await expectFor('./day5')
    expect('day5').toEqual(838)
    expect('day5 part b').toEqual(714)
  })
})
describe('Advent Of Code day6', () => {
  test('day6', async () => {
    const expect = await expectFor('./day6')
    expect('day6-pre').toEqual(11)
    expect('day6').toEqual(6878)
    expect('day6 part b').toEqual(3464)
  })
})
