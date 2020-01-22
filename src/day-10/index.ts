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

function getAsteroidsVisibleFromLocation (
  asteroid: Point,
  knownAsteroids: Set<Point>,
  asteroidsToCheck: Set<Point> = knownAsteroids
): Set<Point> {
  const roids = [...knownAsteroids.values()]
  const visible = new Set<Point>()
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
    visible.add(target)
  })
  return visible
}

function determineAsteroidVisibility (
  asteroids: Set<Point>
): Map<Point, Set<Point>> {
  const asteroidsToCheck = new Set([...asteroids.values()])
  const asteroidVisibility: Map<Point, Set<Point>> = new Map()
  asteroids.forEach((asteroid) => {
    asteroidsToCheck.delete(asteroid)
    const visibleAsteroids = getAsteroidsVisibleFromLocation(
      asteroid,
      asteroids,
      asteroidsToCheck
    )
    const knownToAsteroid = asteroidVisibility.get(asteroid) || new Set()
    asteroidVisibility.set(
      asteroid,
      new Set([...knownToAsteroid, ...visibleAsteroids])
    )
    visibleAsteroids.forEach(known => {
      const knownVisible = asteroidVisibility.get(known) || new Set()
      knownVisible.add(asteroid)
      asteroidVisibility.set(known, knownVisible)
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

function destroyAsteroidsFromBase (
  base: Point,
  knownAsteroids: Set<Point>
): Array<Point> {
  const alreadyDestroyedAsteroids = [] as Array<Point>
  if (knownAsteroids.size === 0) {
    return alreadyDestroyedAsteroids
  } else {
    const asteroidsToDestroy = getAsteroidsVisibleFromLocation(
      base,
      knownAsteroids
    )
    for (const asteroid of asteroidsToDestroy) {
      knownAsteroids.delete(asteroid)
    }
    const sortedAsteroids = Array
      .from(asteroidsToDestroy)
      .map((asteroid): PolarPoint => {
        const x = asteroid.x - base.x
        const y = asteroid.y - base.y
        const h = Math.sqrt(x * x + y * y)
        return {
          distance: h,
          radians: Math.atan2(x, y)
        }
      })
      .sort((a, b) => a.radians < b.radians ? 1 : -1)
      .map(polar => ({
        x: (polar.distance * Math.sin(polar.radians)) + base.x,
        y: (polar.distance * Math.cos(polar.radians)) + base.y
      }))
    const remainingAsteroidsToDestroy = destroyAsteroidsFromBase(
      base,
      knownAsteroids
    )
    return [...sortedAsteroids, ...remainingAsteroidsToDestroy]
  }
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

export function part2 (puzzleInput: string): Array<Point> {
  const knownAsteroids: Set<Point> = findKnownAsteroids(puzzleInput)
  const asteroids = determineAsteroidVisibility(knownAsteroids)
  const base = Array
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
    )[0]
  knownAsteroids.delete(base)
  const destroyedAsteroids = destroyAsteroidsFromBase(base, knownAsteroids)
  return destroyedAsteroids
}
