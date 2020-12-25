import { run } from './runner'

async function expectFor(day: string) {
  const outputOf = await run(import(day))
  return (dayPart: string) => {
    return expect(outputOf(dayPart))
  }
}
describe('Advent Of Code day01', () => {
  test('day01', async () => {
    const expect = await expectFor('./day01')
    expect('day01').toBe(1007331)
    expect('day01 part b').toBe(48914340)
    expect('day01-edge').toEqual(false)
    expect('day01-edge part b').toEqual(false)
  })
})
describe('Advent Of Code day02', () => {
  test('day02', async () => {
    const expect = await expectFor('./day02')
    expect('day02-pre').toBe(2)
    expect('day02-pre part b').toBe(1)
    expect('day02').toEqual(560)
    expect('day02 part b').toEqual(303)
  })
})
describe('Advent Of Code day03', () => {
  test('day03', async () => {
    const expect = await expectFor('./day03')
    expect('day03').toEqual(145)
    expect('day03 part b').toEqual(3424528800)
  })
})
describe('Advent Of Code day04', () => {
  test('day04', async () => {
    const expect = await expectFor('./day04')
    expect('day04').toEqual(233)
    expect('day04 part b').toEqual(111)
    expect('day04-pre').toEqual(2)
  })
})
describe('Advent Of Code day5', () => {
  test('day05', async () => {
    const expect = await expectFor('./day05')
    expect('day05').toEqual(838)
    expect('day05 part b').toEqual(714)
  })
})
describe('Advent Of Code day06', () => {
  test('day06', async () => {
    const expect = await expectFor('./day06')
    expect('day06-pre').toEqual(11)
    expect('day06').toEqual(6878)
    expect('day06 part b').toEqual(3464)
  })
})
describe('Advent Of Code day07', () => {
  test('day07', async () => {
    const expect = await expectFor('./day07')
    expect('day07-pre').toEqual(4)
    expect('day07').toEqual(112)
    expect('day07-bpre part b').toEqual(126)
    expect('day07 part b').toEqual(6260)
  })
})
describe('Advent Of Code day08', () => {
  test('day08', async () => {
    const expect = await expectFor('./day08')
    expect('day08-pre').toEqual(5)
    expect('day08-pre part b').toEqual(8)
    expect('day08').toEqual(1548)
    expect('day08 part b').toEqual(1375)
  })
})
describe('Advent Of Code day09', () => {
  test('day09', async () => {
    const expect = await expectFor('./day09')
    expect('day09').toEqual(1398413738)
    expect('day09 part b').toEqual(169521051)
    //expect('day9 part b').toEqual(undefined)
  })
})
describe('Advent Of Code day10', () => {
  test('day10', async () => {
    const expect = await expectFor('./day10')
    expect('day10-prea').toEqual(7 * 5)
    expect('day10-pre').toEqual(22 * 10)
    expect('day10').toEqual(1904)
    expect('day10-prea part b').toEqual(8)
    expect('day10-pre part b').toEqual(19208)
    expect('day10 part b').toEqual(10578455953408)
  })
})
describe('Advent Of Code day11', () => {
  test('day11', async () => {
    const expect = await expectFor('./day11')
    expect('day11-pre').toEqual(37)
    expect('day11').toEqual(2406)
    expect('day11-pre part b').toEqual(26)
    expect('day11 part b').toEqual(2149)
  })
})
describe('Advent Of Code day12', () => {
  test('day12', async () => {
    const expect = await expectFor('./day12')
    expect('day12-pre').toEqual(25)
    expect('day12').toEqual(2280)
    expect('day12-pre part b').toEqual(286)
    expect('day12 part b').toEqual(38693)
  })
})
describe('Advent Of Code day13', () => {
  test('day13', async () => {
    const expect = await expectFor('./day13')
    expect('day13-pre').toEqual(295)

    expect('day13-pre part b').toEqual(1068781)
    expect('day13').toEqual(3215)
    expect('day13 part b').toEqual(1001569619313439)
  })
})
describe('Advent Of Code day14', () => {
  test('day14', async () => {
    const expect = await expectFor('./day14')
    expect('day14').toEqual(16003257187056)
    expect('day14 part b').toEqual(3219837697833)
  })
})
describe('Advent Of Code day15', () => {
  test('day15', async () => {
    const expect = await expectFor('./day15')
    expect('day15').toEqual([436, 1, 10, 27, 78, 438, 1836, 253])
    expect('day15 part b').toEqual([175594, 2578, 3544142, 261214, 6895259, 18, 362, 13710])
  })
})
describe('Advent Of Code day16', () => {
  test('day16', async () => {
    const expect = await expectFor('./day16')
    expect('day16').toEqual(21956)

    expect('day16 part b').toEqual(3709435214239)
  })
})
describe('Advent Of Code day17', () => {
  test('day17', async () => {
    const expect = await expectFor('./day17')
    expect('day17-pre').toEqual(112)

    expect('day17-pre part b').toEqual(848)
    expect('day17').toEqual(315)
    expect('day17 part b').toEqual(1520)
  })
})
describe('Advent Of Code day18', () => {
  test('day18', async () => {
    const expect = await expectFor('./day18')
    expect('day18-pre').toEqual(26457)
    expect('day18-pre part b').toEqual(694173)
    expect('day18').toEqual(30753705453324)
    expect('day18 part b').toEqual(244817530095503)
  })
})
describe.only('Advent Of Code day24', () => {
  test('day24', async () => {
    const expect = await expectFor('./day24')
    expect('day24-pre').toEqual(10)
    expect('day24').toEqual(300)
  })
})
