export function rocketEquationPart1 (moduleMasses: string): number {
  return moduleMasses
    .replace(/\s+$/g, '')
    .split('\n')
    .map((moduleMass) => calculateFuelReq(Number(moduleMass)))
    .reduce((summedFuelReqs, newFuelReq) => {
      summedFuelReqs += newFuelReq
      return summedFuelReqs
    })
}

export function rocketEquationPart2 (moduleMasses: string): number {
  return moduleMasses
    .replace(/\s+$/g, '')
    .split('\n')
    .map((moduleMass) => {
      return calculateFuelReqConsideringFuelWeight(Number(moduleMass))
    })
    .reduce((summedFuelReqs, newFuelReq) => {
      summedFuelReqs += newFuelReq
      return summedFuelReqs
    })
}

function calculateFuelReq (mass: number): number {
  return Math.max(Math.floor(mass / 3) - 2, 0)
}

function calculateFuelReqConsideringFuelWeight (mass: number): number {
  let loadFuel = calculateFuelReq(mass)
  if (loadFuel > 0) {
    loadFuel += calculateFuelReqConsideringFuelWeight(loadFuel)
  }
  return loadFuel
}
