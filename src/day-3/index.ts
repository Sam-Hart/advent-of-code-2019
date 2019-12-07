export class Point {
  x: number
  y: number

  constructor (x: number, y: number) {
    this.x = x
    this.y = y
  }

  clone (): Point {
    return new Point(this.x, this.y)
  }

  movePoint (move: string): Point {
    const direction = move[0]
    const magnitude = Number(move.substring(1, move.length))
    switch (direction) {
      case 'R':
        this.x += magnitude
        break
      case 'L':
        this.x -= magnitude
        break
      case 'U':
        this.y += magnitude
        break
      case 'D':
        this.y -= magnitude
        break
      default:
        throw new Error('Unknown direction')
    }

    return this.clone()
  }

  distanceFrom (p: Point): number {
    return Math.sqrt(
      ((this.x - p.x) ** 2) + ((this.y - p.y) ** 2)
    )
  }

  manhattanDistanceFrom (p: Point): number {
    return Math.abs(p.x + this.x) + Math.abs(p.y + this.y)
  }
}

export class Line {
  p: Point
  q: Point

  constructor (startPoint: Point, endPoint: Point) {
    this.p = startPoint
    this.q = endPoint
  }

  length (): number {
    return this.p.distanceFrom(this.q)
  }

  pointRestsOnLine (p: Point): boolean {
    const lengthToPoint = p.distanceFrom(this.p) + p.distanceFrom(this.q)
    return lengthToPoint.toFixed(10) === this.length().toFixed(10)
  }

  intersection (other: Line): Point | undefined {
    const a1 = this.q.y - this.p.y
    const b1 = this.p.x - this.q.x
    const c1 = a1 * this.p.x + b1 * this.p.y

    const a2 = other.q.y - other.p.y
    const b2 = other.p.x - other.q.x
    const c2 = a2 * other.p.x + b2 * other.p.y

    const delta = a1 * b2 - a2 * b1

    if (delta === 0) {
      return
    }
    const potentialIntersection = new Point(
      (b2 * c1 - b1 * c2) / delta,
      (a1 * c2 - a2 * c1) / delta
    )

    if (
      this.pointRestsOnLine(potentialIntersection) &&
      other.pointRestsOnLine(potentialIntersection)
    ) {
      return potentialIntersection
    }
  }
}

function wireIntersections (wireSchematics: Array<Array<Line>>): Array<Point> {
  const intersections: Array<Point> = []

  for (let i = 0; i < wireSchematics.length; i++) {
    const schematic = wireSchematics[i]
    wireSchematics.slice(i + 1).forEach((intersectingSchematic) => {
      schematic.forEach((line) => {
        intersectingSchematic.forEach((intersectingLine) => {
          const potentialIntersection = line.intersection(intersectingLine)
          if (potentialIntersection) {
            intersections.push(potentialIntersection)
          }
        })
      })
    })
  }
  return intersections
}

function generateWireSchematics (wires: Array<Array<string>>): Array<Array<Line>> {
  return wires.map((wireDirections) => {
    const wireLines: Array<Line> = []
    const currentPosition = new Point(0, 0)
    for (let i = 0; i < wireDirections.length; i++) {
      const startPoint = currentPosition.clone()
      const endPoint = currentPosition.movePoint(wireDirections[i])
      wireLines.push(new Line(startPoint, endPoint))
    }
    return wireLines
  })
}

export function part1 (puzzleInput: string): number {
  const wires = puzzleInput
    .trim()
    .split('\n')
    .map(wire => wire.split(','))

  const wireSchematics = generateWireSchematics(wires)

  const intersections = wireIntersections(wireSchematics)
  const origin = new Point(0, 0)
  const distances = intersections
    .filter(p => p.x !== 0 && p.y !== 0)
    .map(p => origin.manhattanDistanceFrom(p))

  return Math.min(...distances)
}

export function part2 (puzzleInput: string): number {
  const wires = puzzleInput
    .trim()
    .split('\n')
    .map(wire => wire.split(','))

  const wireSchematics = generateWireSchematics(wires)

  const intersections = wireIntersections(wireSchematics)

  const pathingToIntersectionDistances = intersections
    .filter(p => p.x !== 0 && p.y !== 0)
    .map(intersection => {
      const summedDistance = wireSchematics.map(schematic => {
        let combinedDistances = 0
        for (let i = 0; i < schematic.length; i++) {
          const path = schematic[i]
          if (path.pointRestsOnLine(intersection)) {
            combinedDistances += path.p.distanceFrom(intersection)
            break
          } else {
            combinedDistances += path.length()
          }
        }
        return combinedDistances
        // return schematic.map(path => {
        //   if (path.pointRestsOnLine(intersection)) {
        //     return path.p.distanceFrom(intersection)
        //   } else {
        //     return path.length()
        //   }
        // }).reduce((totalDistance, l) => totalDistance + l)
      }).reduce((combinedDistances, schematicDistanceToPoint) => {
        return combinedDistances + schematicDistanceToPoint
      })
      return summedDistance
    })
  return Math.min(...pathingToIntersectionDistances)
}
