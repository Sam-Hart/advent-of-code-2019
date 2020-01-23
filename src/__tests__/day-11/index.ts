import { part1, part2 } from '@app/day-11'
import challengeInput from '@test/day-11/challengeInput.txt'
import part2Solution from '@test/day-11/part2Solution.txt'

test('The number of painted panels should be 1681', async done => {
  const panelsPainted = await part1(challengeInput)
  expect(panelsPainted).toBe(1681)
  done()
})

test('The message produced by the painted panels is ', async done => {
  const message = await part2(challengeInput)
  expect(message.trim()).toEqual(part2Solution.trim())
  done()
})
