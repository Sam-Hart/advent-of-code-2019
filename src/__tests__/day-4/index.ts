import {
  part1,
  part2,
  candidateContainsNoPairNotPartOfARun
} from '@app/day-4'
import challengeInput from '@test/day-4/challengeInput.txt'

test('candidateContainsNoPairNotPartOfARun should pass strings with repetitions of characters 3 or more', () => {
  expect(candidateContainsNoPairNotPartOfARun('111234')).toBe(true)
})

test('candidateContainsNoPairNotPartOfARun should fail strings with repetitions of characters 2 or less', () => {
  expect(candidateContainsNoPairNotPartOfARun('1122233444')).toBe(false)
  expect(candidateContainsNoPairNotPartOfARun('11223344')).toBe(false)
  expect(candidateContainsNoPairNotPartOfARun('1234556611')).toBe(false)
  expect(candidateContainsNoPairNotPartOfARun('111122')).toBe(false)
})

test('part1 should return the number of passwords in the challenge range that match part2\'s validation rules', () => {
  expect(part1(challengeInput)).toBe(1919)
})

test('part2 should return the number of passwords in the challenge range that match part2\'s validation rules', () => {
  expect(part2(challengeInput)).toBe(1291)
})
