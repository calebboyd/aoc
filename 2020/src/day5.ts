import { aoc } from './runner'

function parseSeatId(binSeat: string) {
  binSeat = binSeat.replace(/L|F/g, '0').replace(/R|B/g, '1')
  const row = Number('0b' + binSeat.slice(0, 7)),
    column = Number('0b' + binSeat.slice(7, 10))
  return row * 8 + column
}

const day5 = aoc(parseSeatId, function day5(seats, partB, finish) {
  const max = seats.reduce((max, id) => Math.max(max, id), 0),
    sparse = Array.from(Array(max), (_, i) => seats.find((id) => id === i)),
    id = Number(sparse.toString().match(/,(\d+),,\d+,/)?.[1]) + 1
  return finish(partB ? id : max)
})

export default day5
