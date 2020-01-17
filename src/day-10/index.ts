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

export function part1 (puzzleInput: string): [Point, number] {
  const asteroids: Map<Point, Set<Point>> = puzzleInput
    .trim()
    .split('\n')
    .reduce(
      (knownAsteroidLocations, horizontalSpace, y) => {
        const newAsteroidLocations = horizontalSpace
          .split('')
          .reduce(
            (lineAsteroids, locationFill, x) => {
              if (locationFill === '#') {
                lineAsteroids.set({ x, y }, new Set())
              }
              return lineAsteroids
            },
            new Map<Point, Set<Point>>()
          )
        return new Map([
          ...knownAsteroidLocations,
          ...newAsteroidLocations
        ])
      },
      new Map<Point, Set<Point>>()
    )

  const asteroidsToCheck = new Set([...asteroids.keys()])
  asteroids.forEach((_, asteroid) => {
    asteroidsToCheck.delete(asteroid)
    const roids = [...asteroids.keys()]
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
      const targetSeen = asteroids.get(target) || new Set()
      targetSeen.add(asteroid)
      const sourceSeen = asteroids.get(asteroid) || new Set()
      sourceSeen.add(target)
    })
  })

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

export function part2 () {}
