import { part1, part2 } from '@app/day-6'
import testInput from '@test/day-6/testInput.txt'
import sanInput from '@test/day-6/sanInput.txt'
import challengeInput from '@test/day-6/challengeInput.txt'

test('Basic input should have 42 orbits', () => {
  expect(part1(testInput)).toEqual(42)
})

test('Challenge input should have 270768 orbits', () => {
  expect(part1(challengeInput)).toEqual(270768)
})

test('Distance from Santa with test input should be 4', () => {
  expect(part2(sanInput)).toEqual(4)
})
