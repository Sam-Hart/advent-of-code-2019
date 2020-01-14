import { part1, part2 } from '@app/day-9'
import challengeInput from '@test/day-9/challengeInput.txt'

test('ChallengeInput should produce a keycode of 3780860499', done => {
  part1(challengeInput)
    .then(testOut => {
      expect(testOut).toBe(3780860499)
      done()
    })
})

test('ChallengeInput should produce a distress signal of 33343', done => {
  part2(challengeInput)
    .then(distressSignal => {
      expect(distressSignal).toEqual(33343)
      done()
    })
})
