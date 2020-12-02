import { aoc } from './runner'

export const day2 = aoc(
  (line) => {
    const [range, letter, password] = line.split(' '),
      [min, max] = range.split('-'),
      focus = letter.replace(':', '')
    return {
      min: Number(min),
      max: Number(max),
      focus,
      password: password.trim(),
    }
  },
  function day2(lines, partB, finish) {
    if (!partB) {
      let valid = 0
      for (const pw of lines) {
        const occurrences = Array.from(pw.password).filter((x) => x === pw.focus).length
        if (occurrences >= pw.min && occurrences <= pw.max) {
          valid++
        }
      }
      return finish(valid)
    } else {
      let valid = 0
      for (const pw of lines) {
        const count = [
          pw.password[pw.min - 1] === pw.focus,
          pw.password[pw.max - 1] === pw.focus,
        ].filter((x) => x).length
        if (count === 1) {
          valid++
        }
      }
      return finish(valid)
    }
  },
  'day2-pre'
)
