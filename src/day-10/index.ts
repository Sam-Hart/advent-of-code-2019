function fractionReduce (
  numerator: number,
  denominator: number
): Array<number> {
  function gcd (a: number, b: number): number {
    return b ? gcd(b, a % b) : a
  }
  const greatestCommonDenominator = gcd(numerator, denominator)
  return [
    numerator / Math.abs(greatestCommonDenominator),
    denominator / Math.abs(greatestCommonDenominator)
  ]
}

function determineAsteroidVisibility (
  asteroids: Set<Point>
): Map<Point, Set<Point>> {
  const asteroidsToCheck = new Set([...asteroids.keys()])
  const asteroidVisibility: Map<Point, Set<Point>> = new Map()
  asteroids.forEach((asteroid) => {
    asteroidsToCheck.delete(asteroid)
    const roids = [...asteroids.values()]
    asteroidsToCheck.forEach(checkAsteroid => {
      const run = checkAsteroid.x - asteroid.x
      const rise = checkAsteroid.y - asteroid.y
      const [reducedRise, reducedRun] = fractionReduce(rise, run)
      const inlineLocation: Point = {
        x: asteroid.x,
        y: asteroid.y
      }
      let target: Point | undefined

      do {
        inlineLocation.x += reducedRun
        inlineLocation.y += reducedRise
        target = roids.find(potentialAsteroid => {
          if (
            potentialAsteroid.x === inlineLocation.x &&
            potentialAsteroid.y === inlineLocation.y
          ) {
            return potentialAsteroid
          }
        })
      } while (target === undefined)
      const targetSeen: Set<Point> = asteroidVisibility.get(target) ||
        asteroidVisibility.set(target, new Set()).get(target) ||
        new Set()
      targetSeen.add(asteroid)
      const sourceSeen: Set<Point> = asteroidVisibility.get(asteroid) ||
        asteroidVisibility.set(asteroid, new Set()).get(asteroid) ||
        new Set()
      sourceSeen.add(target)
    })
  })

  return asteroidVisibility
}

function findKnownAsteroids (map: string): Set<Point> {
  return map
    .trim()
    .split('\n')
    .reduce(
      (knownAsteroidLocations, horizontalSpace, y) => {
        const newAsteroidLocations = horizontalSpace
          .split('')
          .reduce(
            (lineAsteroids, locationFill, x) => {
              if (locationFill === '#') {
                lineAsteroids.add({ x, y })
              }
              return lineAsteroids
            },
            new Set<Point>()
          )
        return new Set([
          ...knownAsteroidLocations,
          ...newAsteroidLocations
        ])
      },
      new Set<Point>()
    )
}

export function part1 (puzzleInput: string): [Point, number] {
  const knownAsteroids: Set<Point> = findKnownAsteroids(puzzleInput)
  const asteroids = determineAsteroidVisibility(knownAsteroids)
  return Array
    .from(asteroids.entries())
    .reduce(
      (
        [mostSeenAsteroid, mostTimes]: [Point, number],
        [asteroid, seen]: [Point, Set<Point>]
      ): [Point, number] => (seen.size > mostTimes
        ? [asteroid, seen.size]
        : [mostSeenAsteroid, mostTimes]
      ),
      [{ x: 0, y: 0 }, 0]
    )
}

export function part2 (puzzleInput: string): Point {
  const base = part1(puzzleInput)[0]

  return { x: 0, y: 0 }
}
