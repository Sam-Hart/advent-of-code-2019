import { part1, part2, Computer } from '@app/day-5'
import testInput from '@test/day-5/testInput.txt'
import challengeInput from '@test/day-5/challengeInput.txt'

class MockClient implements Client {
  messages: Array<string> = []

  prompt = jest.fn(() => Promise.resolve('1'))

  output = jest.fn((message: number) => {
    this.messages.push(message.toString())
  })
}

test('Simple addition should work', async done => {
  const mock = new MockClient()
  const comp = new Computer([1, 0, 0, 0, 99], mock)
  const result = await comp.executeProgram()
  expect(result).toEqual([2, 0, 0, 0, 99])
  done()
})

test('Simple multiplication should work', async done => {
  const mock = new MockClient()
  const comp = new Computer([2, 0, 0, 0, 99], mock)
  const result = await comp.executeProgram()
  expect(result).toEqual([4, 0, 0, 0, 99])
  done()
})

test('Simple write should work', async done => {
  const mock = new MockClient()
  const comp = new Computer([3, 3, 99, 0], mock)
  const result = await comp.executeProgram()
  expect(result).toEqual([3, 3, 99, 1])
  done()
})

test('Simple read should work', async done => {
  const mock = new MockClient()
  const comp = new Computer([4, 3, 99, 1564849], mock)
  await comp.executeProgram()
  expect(mock.messages[0]).toBe('1564849')
  done()
})

test('immediate mode params should work', async done => {
  const mock = new MockClient()
  const comp = new Computer([1101, 16, 16, 5, 99], mock)
  const result = await comp.executeProgram()
  expect(result).toEqual([1101, 16, 16, 5, 99, 32])
  done()
})

test('more immediate mode params should work', async done => {
  const mock = new MockClient()
  const comp = new Computer([102, 16, 5, 6, 99, 7], mock)
  const result = await comp.executeProgram()
  expect(result).toEqual([102, 16, 5, 6, 99, 7, 112])
  done()
})

test('non-leading immediate mode params should work', async done => {
  const mock = new MockClient()
  const comp = new Computer([1002, 5, 16, 6, 99, 7], mock)
  const result = await comp.executeProgram()
  expect(result).toEqual([1002, 5, 16, 6, 99, 7, 112])
  done()
})

test('negative values are handled correctly', async done => {
  const mock = new MockClient()
  const comp = new Computer([1101, 100, -1, 4, 0], mock)
  const result = await comp.executeProgram()
  expect(result).toEqual([1101, 100, -1, 4, 99])
  done()
})

test('Test program reads out what it receives as input', async done => {
  expect(await part1('3,0,4,0,99')).toBe('1')
  done()
})

test('part1 input should be', async done => {
  expect(await part1(challengeInput)).toEqual('8332629')
  done()
})
