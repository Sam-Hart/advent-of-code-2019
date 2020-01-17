import { part1, part2 } from '@app/day-10'
import testInput1 from '@test/day-10/testInput1.txt'
import testInput2 from '@test/day-10/testInput2.txt'
import testInput3 from '@test/day-10/testInput3.txt'
import testInput4 from '@test/day-10/testInput4.txt'
import testInput5 from '@test/day-10/testInput5.txt'
import challengeInput from '@test/day-10/challengeInput.txt'

test('The location that sees the most asteroids for test map 1 is 3, 4', () => {
  const bestLocation = part1(testInput1)
  expect(bestLocation[0].x).toEqual(3)
  expect(bestLocation[0].y).toEqual(4)
})

test('The location that sees the most asteroids for test map 2 is 5, 8', () => {
  const bestLocation = part1(testInput2)
  expect(bestLocation[0].x).toEqual(5)
  expect(bestLocation[0].y).toEqual(8)
})

test('The location that sees the most asteroids for test map 3 is 1, 2 with 35 asteroids seen', () => {
  const bestLocation = part1(testInput3)
  expect(bestLocation[0].x).toEqual(1)
  expect(bestLocation[0].y).toEqual(2)
  expect(bestLocation[1]).toEqual(35)
})

test('The location that sees the most asteroids for test map 4 is 6, 3 with 41 asteroids seen', () => {
  const bestLocation = part1(testInput4)
  expect(bestLocation[0].x).toEqual(6)
  expect(bestLocation[0].y).toEqual(3)
  expect(bestLocation[1]).toEqual(41)
})

test('The location that sees the most asteroids for test map 5 is 11, 13 with 210 asteroids seen', () => {
  const bestLocation = part1(testInput5)
  expect(bestLocation[0].x).toEqual(11)
  expect(bestLocation[0].y).toEqual(13)
  expect(bestLocation[1]).toEqual(210)
})

test('The challenge maps best location is with x asteroids', () => {
  const bestLocation = part1(challengeInput)
  expect(bestLocation[0].x).toEqual(26)
  expect(bestLocation[0].y).toEqual(28)
  expect(bestLocation[1]).toEqual(267)
})
