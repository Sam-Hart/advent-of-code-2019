export function rocketEquationPart1 (moduleMasses: string): number {
    return moduleMasses
        .replace(/\s+$/g, '')
        .split('\n')
        .map((moduleMass) => calculateFuelReq(Number(moduleMass)))
        .reduce((summedFuelReqs, newFuelReq) => summedFuelReqs += newFuelReq)
}

export function rocketEquationPart2 (moduleMasses: string): number {
    return moduleMasses
        .replace(/\s+$/g, '')
        .split('\n')
        .map((moduleMass) => {
            return calculateFuelReqConsideringFuelWeight(Number(moduleMass))
        })
        .reduce((summedFuelReqs, newFuelReq) => summedFuelReqs += newFuelReq)
}

function calculateFuelReq(mass: number): number {
    if (isNaN(mass)) {
        throw new Error("Unable to calculate fuel for module with unparseable mass")
    }
    return Math.max(Math.floor(mass / 3) - 2, 0)
}

function calculateFuelReqConsideringFuelWeight(mass: number): number {
    let loadFuel = calculateFuelReq(mass)
    if (loadFuel > 0) {
        loadFuel += calculateFuelReqConsideringFuelWeight(loadFuel)
    }
    return loadFuel
}
