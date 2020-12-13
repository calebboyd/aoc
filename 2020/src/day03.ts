import { aoc } from './runner'

const day3 = aoc(
  (line) => line.split(''),
  function day3(matrix, partB, finish) {
    let partAResult = 0
    const partBResult = [
      [1, 1],
      [3, 1],
      [5, 1],
      [7, 1],
      [1, 2],
    ].reduce((product, [slopeX, slopeY], i) => {
      let x = 0,
        y = 0,
        treeCount = 0
      while (y + slopeY < matrix.length) {
        if (matrix[(y += slopeY)][(x = (x + slopeX) % matrix[y].length)] === '#') {
          treeCount++
        }
      }
      if (i === 1) partAResult = treeCount
      return product * treeCount
    }, 1)
    if (partB) return finish(partBResult)
    return finish(partAResult)
  }
)
export default day3
