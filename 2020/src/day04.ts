import { aoc } from './runner'

function parseLine(line: string) {
  if (!line.trim()) {
    return false
  }
  return Object.assign(
    {},
    ...line.split(' ').map((x) => {
      return { [x.split(':')[0]]: x.split(':')[1] }
    })
  )
}

function linesToPassportRecords(input: any[]) {
  return input.reduce(
    (acc, props) => {
      const current = acc[acc.length - 1]
      if (!props) {
        acc.push({})
      } else {
        Object.assign(current, props)
      }
      return acc
    },
    [{}] as Record<any, any>[]
  )
}

const passportValidators = {
  byr: (x: string) => {
    return isBetween(x, 1920, 2002)
  },
  iyr: (x: string) => {
    return isBetween(x, 2010, 2020)
  },
  eyr: (x: string) => {
    return isBetween(x, 2020, 2030)
  },
  hgt: (x: string) => {
    if (!/^\d{2}in$|^\d{3}cm$/.test(x)) {
      return false
    }
    if (x.endsWith('cm')) {
      return isBetween(x.replace('cm', ''), 150, 193)
    } else if (x.endsWith('in')) {
      return isBetween(x.replace('in', ''), 59, 76)
    }
    return false
  },
  hcl: (x: string) => {
    return /^#[a-f0-9]{6}$/.test(x)
  },
  ecl: (x: string) => {
    return ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(x)
  },
  pid: (x: string) => {
    return /^\d{9}$/.test(x)
  },
}

function hasProps(obj: Record<any, any>) {
  return Object.keys(passportValidators).every((x) => obj.hasOwnProperty(x))
}
function isBetween(x: string | number, a: number, b: number) {
  return Number(x) >= a && Number(x) <= b
}
function testProps(obj: Record<any, any>) {
  if (!hasProps(obj)) {
    return false
  }
  return Object.entries(passportValidators).every(([key, validator]) => validator(obj[key]))
}

const day04 = aoc(
  parseLine,
  function day04(parsedLines, partB, finish) {
    const passports = linesToPassportRecords(parsedLines)
    if (!partB) {
      return finish(passports.filter(hasProps).length)
    } else {
      return finish(passports.filter(testProps).length)
    }
  },
  'day04-pre'
)
export default day04
