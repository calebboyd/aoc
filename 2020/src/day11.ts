import { aoc } from './runner'

const Directions = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [1, -1],
  [1, 0],
  [1, 1],
  [0, 1],
  [0, -1],
]

class Seat {
  partB = false
  seats: Seat[][] = [[]]
  neighbors = [] as Seat[]
  visible = [] as Seat[]
  pending: Partial<Seat> = {}
  static Unstable = false
  static Stable = true

  constructor(public floor: boolean, public column: number, public row = 0, public empty = true) {}

  commit() {
    Object.assign(this, this.pending)
  }
  occupy(occupiedNeighbors = this.neighbors.filter((x) => !x.empty).length, allowedNeighbors = 3) {
    if (this.floor) {
      return Seat.Stable
    }
    if (this.empty && !occupiedNeighbors) {
      this.pending.empty = false
      return Seat.Unstable
    }
    if (!this.empty && occupiedNeighbors > allowedNeighbors) {
      this.pending.empty = true
      return Seat.Unstable
    }
    return Seat.Stable
  }

  lookAround() {
    let occupied = 0
    const { row, column } = this
    lookingAround: for (const [x, y] of Directions) {
      let vSeat: Seat | null = this.seats?.[row + y]?.[column + x]
      while (vSeat) {
        if (!vSeat.floor) {
          if (!vSeat.empty) occupied++
          continue lookingAround
        }
        vSeat = this.seats?.[vSeat.row + y]?.[vSeat.column + x]
      }
    }
    return this.occupy(occupied, 4)
  }
}

function initSeats(seats: Seat[][], partB: boolean) {
  seats.forEach((row, r) => row.forEach((seat) => (seat.row = r)))
  for (const seat of seats.flat()) {
    seat.partB = partB
    seat.seats = seats
    if (seat.floor) continue
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        const neighbor = seats?.[seat.row + i]?.[seat.column + j]
        if (neighbor && neighbor !== seat) {
          seat.neighbors.push(neighbor)
        }
      }
    }
  }
  return seats
}

function print(seats: Seat[], width: number) {
  console.log(
    seats.reduce((print, x, i) => {
      if (i % width === 0) print += '\n'
      return (print += x.floor ? '.' : x.empty ? 'L' : '#')
    }, '')
  )
}

const day11 = aoc(
  (line) => line.split('').map((x, c) => new Seat(x === '.', c)),
  function day11(rows, partB, finish) {
    const seats = initSeats(rows, partB).flat(),
      checkStability = () =>
        seats.filter((x) => (partB ? x.lookAround() : x.occupy())).length === seats.length
    while (!checkStability()) {
      seats.forEach((x) => x.commit())
      print(seats, rows[0].length)
    }
    return finish(seats.filter((x) => !x.empty).length)
  },
  'day11-pre'
)

export default day11
