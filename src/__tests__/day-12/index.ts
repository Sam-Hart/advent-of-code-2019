import {
  moonParse,
  traverseMoons,
  calculateSystemEnergy,
  part1,
  part2,
  findGcd
} from '@app/day-12'
import testInput1 from '@test/day-12/testInput1.txt'
import testInput2 from '@test/day-12/testInput2.txt'
import challengeInput from '@test/day-12/challengeInput.txt'

test('moonParse should parse moons from input', () => {
  const moons = moonParse(testInput1)
  expect(moons.length).toBe(4)
})

test('moonParse should parse moons from input with a given set of coordinates', () => {
  const moons = moonParse(testInput1)
  const checkMoon = moons[0]
  expect(checkMoon.position.x).toBe(-1)
  expect(checkMoon.position.y).toBe(0)
  expect(checkMoon.position.z).toBe(2)
})

test('traverseMoons should return a new array of moon objects', () => {
  const moons = moonParse(testInput1)
  const newMoons = traverseMoons(moons, 1)
  expect(moons[0]).not.toBe(newMoons[0])
})

test('traverseMoons should apply gravity by 1 timestep', () => {
  const moons = moonParse(testInput1)
  const newMoons = traverseMoons(moons, 1)
  expect(newMoons[0].velocity.x).toBe(3)
  expect(newMoons[0].velocity.y).toBe(-1)
  expect(newMoons[0].velocity.z).toBe(-1)
})

test('traverseMoons should apply gravity by 1 timestep', () => {
  const moons = moonParse(testInput1)
  const newMoons = traverseMoons(moons, 1)
  expect(newMoons[0].position.x).toBe(2)
  expect(newMoons[0].position.y).toBe(-1)
  expect(newMoons[0].position.z).toBe(1)
})

test('traverseMoons should apply gravity by 2 timesteps', () => {
  const moons = moonParse(testInput1)
  const newMoons = traverseMoons(moons, 2)
  expect(newMoons[0].velocity.x).toBe(3)
  expect(newMoons[0].velocity.y).toBe(-2)
  expect(newMoons[0].velocity.z).toBe(-2)
})

test('Total energy in the system after 10 steps should be 179 for testInput1', () => {
  const moons = moonParse(testInput1)
  const newMoons = traverseMoons(moons, 10)
  const energy = calculateSystemEnergy(newMoons)
  expect(energy).toBe(179)
})

test('Part 1 should calculate 12351 total energy for challengeInput', () => {
  const energy = part1(challengeInput)
  expect(energy).toBe(12351)
})

test('gindGcd should find 3 for 9, 3, and 12', () => {
  const gcd = findGcd(9, 3, 12)
  expect(gcd).toBe(3)
})

test('gindGcd should find 2', () => {
  const gcd = findGcd(16, 8, 12, 2)
  expect(gcd).toBe(2)
})

test.skip('Part 2 should calculate a period of 2772 of the system for the test input', () => {
  const systemPeriod = part2(testInput1)
  expect(systemPeriod).toBe(2772)
})

test.skip('Part 2 should calculate a period of 4686774924 of the system for test input 2', () => {
  const systemPeriod = part2(testInput2)
  expect(systemPeriod).toBe(4686774924)
})

test('Part 2 should calculate 380635029877596 for challengeInput', () => {
  const systemPeriod = part2(challengeInput)
  expect(systemPeriod).toBe(380635029877596)
})
