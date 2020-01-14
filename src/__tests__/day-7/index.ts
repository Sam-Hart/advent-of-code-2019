import { part1, part2 } from '@app/day-7'
import testInput1 from '@test/day-7/testInput1.txt'
import testInput2 from '@test/day-7/testInput2.txt'
import testInput3 from '@test/day-7/testInput3.txt'
import testInput4 from '@test/day-7/testInput4.txt'
import testInput5 from '@test/day-7/testInput5.txt'
import challengeInput from '@test/day-7/challengeInput.txt'

test('Max thruster output from testInput1 is 43210', async done => {
  part1(testInput1)
    .then(output => {
      expect(output).toEqual(43210)
      done()
    })
})

test('Max thruster output from testInput2 is 54321', async done => {
  part1(testInput2)
    .then(output => {
      expect(output).toEqual(54321)
      done()
    })
})

test('Max thruster output from testInput3 is 65210', async done => {
  part1(testInput3)
    .then(output => {
      expect(output).toEqual(65210)
      done()
    })
})

test('Max thruster output from challengeInput is 437860', async done => {
  part1(challengeInput)
    .then(output => {
      expect(output).toEqual(437860)
      done()
    })
})

test('Max thruster using a feedback loop output from testInput4 is 139629729', async done => {
  part2(testInput4)
    .then(output => {
      expect(output).toEqual(139629729)
      done()
    })
})

test('Max thruster using a feedback loop output from testInput5 is 18216', async done => {
  part2(testInput5)
    .then(output => {
      expect(output).toEqual(18216)
      done()
    })
})

test('Max thruster using a feedback loop output from challenge input is 49810599', async done => {
  part2(challengeInput)
    .then(output => {
      expect(output).toEqual(49810599)
      done()
    })
})
