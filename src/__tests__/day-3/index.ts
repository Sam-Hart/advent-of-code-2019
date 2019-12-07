import { part1, part2, Line, Point } from '@app/day-3'
import basicInput from '@test/day-3/basicInput.txt'
import testInput1 from '@test/day-3/testInput.txt'
import testInput2 from '@test/day-3/testInput2.txt'
import challengeInput from '@test/day-3/challengeInput.txt'

test('testInput1 should intersect 159 units away in manhattan distance', () => {
  expect(part1(testInput1)).toBe(159)
})

test('A line can tell where another line intersects itself at ', () => {
  const l1 = new Line(
    new Point(-5, -5),
    new Point(5, 5)
  )

  const l2 = new Line(
    new Point(-2, 1),
    new Point(0, -1)
  )

  const intersection = l1.intersection(l2)

  expect(intersection!.x).toBe(-0.5)
  expect(intersection!.y).toBe(-0.5)
})

test('A line can tell when another line does not intersect itself', () => {
  const l1 = new Line(
    new Point(-5, -5),
    new Point(5, 5)
  )

  const l2 = new Line(
    new Point(-10, 10),
    new Point(-10, 11)
  )
  const intersection = l1.intersection(l2)
  expect(intersection).toBeUndefined()
})

test('basic input closest intersection is 6 units away in manhattan distance', () => {
  expect(part1(basicInput)).toBe(6)
})

test('testInput1 closest intersection is 135 units away in manhattan distance', () => {
  expect(part1(testInput1)).toBe(159)
})

test('testInput2 closest intersection is 159 units away in manhattan distance', () => {
  expect(part1(testInput2)).toBe(135)
})

test('challengeInput closest intersection is 293 units away in manhattan distance', () => {
  expect(part1(challengeInput)).toBe(293)
})

test('Basic input shortest combined path is after 30 steps', () => {
  expect(part2(basicInput)).toBe(30)
})

test('Test input 1 shortest combined path is after 610 steps', () => {
  expect(part2(testInput1)).toBe(610)
})

test('Test input 2 shortest combined path is after 410 steps', () => {
  expect(part2(testInput2)).toBe(410)
})

test('Challenge input shortest combined path is 27306 steps between both wires', () => {
  expect(part2(challengeInput)).toBe(27306)
})
