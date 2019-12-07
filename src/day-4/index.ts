function numbersDecrease (candidate: string): boolean {
  for (let i = 1; i < candidate.length; i++) {
    const prev = candidate[i - 1]
    const curr = candidate[i]
    if (Number(prev) > Number(curr)) {
      return true
    }
  }
  return false
}

function candidateContainsNoPairs (candidate: string): boolean {
  const s = new Set(candidate)
  return candidate.length - s.size === 0
}

export function candidateContainsNoPairNotPartOfARun (candidate: string): boolean {
  let currentChar: string = ''
  let currentCharRepeated = 0
  for (let i = 0; i < candidate.length; i++) {
    if (candidate[i] !== currentChar) {
      if (currentCharRepeated === 2) {
        return false
      }
      currentChar = candidate[i]
      currentCharRepeated = 0
    }
    currentCharRepeated++
  }

  // Catch the case where the final two characters were the same and different
  // from the third to last character
  if (currentCharRepeated === 2) {
    return false
  }
  return true
}

function isValidCandidate (
  candidate: string, invalidators: Array<(c: string) => boolean>
): boolean {
  for (let i = 0; i < invalidators.length; i++) {
    if (invalidators[i](candidate)) {
      return false
    }
  }
  return true
}

export function part1 (puzzleInput: string): number {
  const passwordRange = puzzleInput
    .trim()
    .split('-')
    .map(Number)

  const invalidators = [
    (c: string) => isNaN(Number(c)),
    candidateContainsNoPairs,
    numbersDecrease
  ]
  const candidates = []
  for (let cand = passwordRange[0]; cand <= passwordRange[1]; cand++) {
    if (isValidCandidate(cand.toString(), invalidators)) {
      candidates.push(cand)
    }
  }
  return candidates.length
}

export function part2 (puzzleInput: string): number {
  const passwordRange = puzzleInput
    .trim()
    .split('-')
    .map(Number)

  const invalidators = [
    (c: string) => isNaN(Number(c)),
    candidateContainsNoPairs,
    numbersDecrease,
    candidateContainsNoPairNotPartOfARun
  ]

  const candidates = []
  for (let cand = passwordRange[0]; cand <= passwordRange[1]; cand++) {
    if (isValidCandidate(cand.toString(), invalidators)) {
      candidates.push(cand)
    }
  }

  return candidates.length
}
