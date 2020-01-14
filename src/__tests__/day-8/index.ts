import { part1, part2 } from '@app/day-8'
import challengeInput from '@test/day-8/challengeInput.txt'
import compositeImage from '@test/day-8/compositeImage.json'

test('The checksum for the challengeInput is 1452', () => {
  expect(part1(challengeInput)).toEqual(1452)
})

test('The final image looks like this', () => {
  expect(part2(challengeInput)).toEqual(compositeImage)
})
