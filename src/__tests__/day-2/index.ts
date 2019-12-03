import { part1, part2, computeState } from '@app/day-2'
import testInput from '@test/day-2/testInput.txt'
import challengeInput from '@test/day-2/challengeInput.txt'

test('Compute state should add from and store in correct locations', () => {
  expect(computeState([1, 0, 0, 0, 99])).toEqual([2, 0, 0, 0, 99])
})

test('computeState should multiply from and store in correct locations', () => {
  expect(computeState([2, 3, 0, 3, 99])).toEqual([2, 3, 0, 6, 99])
})

test('computeState should handle multiple operations', () => {
  expect(computeState([1, 1, 1, 4, 99, 5, 6, 0, 99]))
    .toEqual([30, 1, 1, 4, 2, 5, 6, 0, 99])
})

test('The calculated value from the test input for part 1 should be 3500', () => {
  expect(computeState(testInput.trim().split(',').map(Number))[0]).toBe(3500)
})

test('The calculated value from the challenge input for part 1 should be 3562672', () => {
  expect(part1(challengeInput)).toBe(3562672)
})

test('The calculated value from the challenge input for part 2 should be 8250', () => {
  expect(part2(challengeInput, 19690720)).toBe(8250)
})
