export function part1 (puzzleInput: string): number {
  const intCodes = puzzleInput
    .trim()
    .split(',')
    .map(Number)
  intCodes[1] = 12
  intCodes[2] = 2
  const finalState = computeState([...intCodes])

  return finalState[0]
}

export function part2 (puzzleInput: string, targetValue: number): number {
  const intCodes = puzzleInput
    .trim()
    .split(',')
    .map(Number)

  for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 100; j++) {
      try {
        const modifiedIntCodes = [...intCodes]
        modifiedIntCodes[1] = i
        modifiedIntCodes[2] = j
        const computedState = computeState(modifiedIntCodes)
        if (computedState[0] === targetValue) {
          return 100 * i + j
        }
      } catch (e) {
        console.error(e)
        continue
      }
    }
  }
  return 0
}

export function computeState (intCodes: Array<number>): Array<number> {
  for (let i = 0; i < intCodes.length; i += 4) {
    const operation = intCodes[i]
    if (operation === 99) {
      return intCodes
    }
    const leftOperandLocation = intCodes[i + 1]
    const rightOperandLocation = intCodes[i + 2]
    const resultStorageLocation = intCodes[i + 3]
    if (operation === 1) {
      intCodes[resultStorageLocation] =
        intCodes[leftOperandLocation] + intCodes[rightOperandLocation]
    } else if (operation === 2) {
      intCodes[resultStorageLocation] =
        intCodes[leftOperandLocation] * intCodes[rightOperandLocation]
    }
  }
  return intCodes
}
