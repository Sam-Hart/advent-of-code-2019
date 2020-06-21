interface Moon {
  velocity: Vector
  position: Vector
}

interface Vector {
  [plane: string]: number
}

export function moonParse (moonDescriptions: string): Array<Moon> {
  return moonDescriptions
    .trim()
    .split('\n')
    .map(moon => {
      return moon
        // Cut off the angle brackets
        .slice(1, moon.length - 1)
        .split(', ')
        .reduce((moon, coordinates) => {
          const [plane, coord] = coordinates.split('=')
          moon.position[plane] = Number(coord) || 0
          moon.velocity[plane] = 0
          return moon
        }, { velocity: {}, position: {} } as Moon)
    })
}

export function traverseMoons (moons: Array<Moon>, time: number): Array<Moon> {
  const iteratedMoons = moons.map(moon => {
    const newMoon = Object.assign({}, moon)
    newMoon.velocity = Object.assign({}, moon.velocity)
    newMoon.position = Object.assign({}, moon.position)
    return newMoon
  })
  if (time < 1) {
    return iteratedMoons
  }
  // apply gravity
  for (let i = 0; i < moons.length; i++) {
    const attractor = moons[i]
    const dimensions = Object.keys(attractor.position)
    for (let j = i + 1; j < moons.length; j++) {
      const attractee = moons[j]
      for (let k = 0; k < dimensions.length; k++) {
        const dimension = dimensions[k]
        if (attractor.position[dimension] === attractee.position[dimension]) {
          continue
        }
        iteratedMoons[i].velocity[dimension] +=
          attractor.position[dimension] < attractee.position[dimension]
            ? 1
            : -1

        iteratedMoons[j].velocity[dimension] +=
          attractor.position[dimension] > attractee.position[dimension]
            ? 1
            : -1
      }
    }
  }

  // apply velocity
  for (let i = 0; i < iteratedMoons.length; i++) {
    const dimensions = Object.keys(iteratedMoons[i].velocity)
    for (let j = 0; j < dimensions.length; j++) {
      iteratedMoons[i].position[dimensions[j]] +=
        iteratedMoons[i].velocity[dimensions[j]]
    }
  }
  if (time === 1) {
    return iteratedMoons
  }
  return traverseMoons(iteratedMoons, time - 1)
}

export function calculateSystemEnergy (moons: Array<Moon>): number {
  return moons
    .reduce((summedEnergy, moon) => {
      const dimensions = Object.keys(moon.position)
      return summedEnergy +
        dimensions
          .reduce((potential, dimension) => {
            return potential + Math.abs(moon.position[dimension])
          }, 0) *
        dimensions
          .reduce((kinetic, dimension) => {
            return kinetic + Math.abs(moon.velocity[dimension])
          }, 0)
    }, 0)
}

export function periodicityOfAxes (moons: Array<Moon>): Array<number> {
  const singleVectorMoonsByPlane: Array<Array<Moon>> = moons
    .reduce((moons, moon) => {
      Object.keys(moon.position).map((dimension, i) => {
        const moonsDim = [...(moons[i] ?? [])]
        const zeroedMoon: Moon = {
          position: {},
          velocity: {}
        }
        zeroedMoon.position[dimension] = moon.position[dimension]
        zeroedMoon.velocity[dimension] = moon.velocity[dimension]
        moonsDim.push(zeroedMoon)
        moons[i] = moonsDim
        return zeroedMoon
      })
      return moons
    }, [] as Array<Array<Moon>>)
  const planePeriods = singleVectorMoonsByPlane.reduce(
    (planePeriods, plane) => {
      let cycles = 1
      let matchedState = false
      let nextState: Array<Moon> = traverseMoons(plane, 0)
      moonTraversal: do {
        nextState = traverseMoons(nextState, 1)
        for (let i = 0; i < nextState.length; i++) {
          const leftMoon = nextState[i]
          const rightMoon = plane[i]
          const dimensions = Object.keys(leftMoon.position)
          for (let k = 0; k < dimensions.length; k++) {
            const kthDim = dimensions[k]
            if (
              (leftMoon.position[kthDim] !== rightMoon.position[kthDim]) ||
              (leftMoon.velocity[kthDim] !== rightMoon.velocity[kthDim])
            ) {
              cycles++
              continue moonTraversal
            }
          }
        }
        matchedState = true
        // console.log(nextState)
        // console.log(plane)
      } while (!matchedState)
      planePeriods.push(cycles)
      return planePeriods
    },
    [] as Array<number>
  )
  return planePeriods
}

function gcd (a: number, b: number): number {
  return b ? gcd(b, a % b) : a
}

export function findGcd (...nums: Array<number>) {
  let result = nums[0]
  for (let i = 0; i < nums.length; i++) {
    result = gcd(result, nums[i])
  }
  return result
}

export function part1 (puzzleInput: string) {
  const moons = moonParse(puzzleInput)
  const traversedMoons = traverseMoons(moons, 1000)
  return calculateSystemEnergy(traversedMoons)
}

export function part2 (puzzleInput: string): number {
  const moons = moonParse(puzzleInput)
  const axesPeriods = periodicityOfAxes(moons)
  const axesGcd = findGcd(...axesPeriods)

  return axesPeriods
    .reduce((periodProduct, axisPeriod) => periodProduct * (axisPeriod / axesGcd))
}
