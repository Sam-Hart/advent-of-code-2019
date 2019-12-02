import {
  rocketEquationPart1 as part1,
  rocketEquationPart2 as part2
} from '@app/day-1'

import testInput from '@test/day-1/testInput.txt'
import challengeInput from '@test/day-1/challengeInput.txt'

test('Test case for part 1 should result in 34241', () => {
  expect(part1(testInput)).toBe(34241)
})

test('part 1 input ', () => {
  expect(part1(challengeInput)).toBe(3391707)
})

test('A module with mass 1969 will require fuel of 966', () => {
  expect(part2('1969')).toBe(966)
})

test('The fuel required by a module of mass 12 is 2', () => {
  expect(part2('12')).toBe(2)
})

test('The fuel required by a module of mass 14 is 2', () => {
  expect(part2('14')).toBe(2)
})

test('The fuel required by 2 modules with masses 14 and 12 should be 4', () => {
  expect(part2('14\n12\n')).toBe(4)
})

test('The fuel required by 2 modules with masses 14 and 12 and 1969 should be 970', () => {
  expect(part2('14\n12\n1969\n')).toBe(970)
})

test('The fuel required by a module of mass 100756 is 50346', () => {
  expect(part2('100756')).toBe(50346)
})

test('The collection of test modules will require fuel of 51316', () => {
  expect(part2(testInput)).toBe(51316)
})

test('part 2 input', () => {
  expect(part2(challengeInput)).toBe(5084676)
})
