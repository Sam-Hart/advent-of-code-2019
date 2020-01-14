import { part1, part2, Computer } from '@app/day-5'
import testInput from '@test/day-5/testInput.txt'
import challengeInput from '@test/day-5/challengeInput.txt'

class MockClient implements Client {
  messages: Array<string> = []
  input: string
  constructor (fakeIn: string = '1') {
    this.input = fakeIn
  }

  prompt = jest.fn(() => Promise.resolve(this.input))

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

test('Program should output a 1 when given input is 8', async done => {
  const mock = new MockClient('8')
  const comp = new Computer(
    [3, 9, 8, 9, 10, 9, 4, 9, 99, -1, 8],
    mock
  )
  await comp.executeProgram()
  expect(mock.messages).toEqual(['1'])
  done()
})

test('Program should output 0 when given input is 8', async done => {
  const mock = new MockClient('256')
  const comp = new Computer(
    [3, 9, 8, 9, 10, 9, 4, 9, 99, -1, 8],
    mock
  )
  await comp.executeProgram()
  expect(mock.messages).toEqual(['0'])
  done()
})

test('Program should respect immediate mode with equals instruction', async done => {
  const mock = new MockClient('8')
  const comp = new Computer(
    [3, 3, 1108, -1, 8, 3, 4, 3, 99],
    mock
  )
  await comp.executeProgram()
  expect(mock.messages).toEqual(['1'])
  done()
})

test('Program should respect immediate mode with less than instruction', async done => {
  const mock = new MockClient('4')
  const comp = new Computer(
    [3, 3, 1107, -1, 8, 3, 4, 3, 99],
    mock
  )
  await comp.executeProgram()
  expect(mock.messages).toEqual(['1'])
  done()
})

test('Jumps should respect position mode', async done => {
  const program = [3, 12, 6, 12, 15, 1, 13, 14, 13, 4, 13, 99, -1, 0, 1, 9]
  const posMock = new MockClient('15614')
  const posComp = new Computer(
    program,
    posMock
  )
  await posComp.executeProgram()
  expect(posMock.messages).toEqual(['1'])
  done()
})

test('Jumps should respect immediate mode', async done => {
  const program = [3, 3, 1105, -1, 9, 1101, 0, 0, 12, 4, 12, 99, 1]
  const posMock = new MockClient('12')
  const posComp = new Computer(
    program,
    posMock
  )
  await posComp.executeProgram()
  expect(posMock.messages).toEqual(['1'])
  done()
})

test('Test input will produce 999 when singular input is less than 8', async done => {
  const mock = new MockClient('1')
  const comp = new Computer(testInput.trim().split(',').map(Number), mock)
  await comp.executeProgram()
  expect(mock.messages).toEqual(['999'])
  done()
})

test('Test input will produce 1000 when singular input is 8', async done => {
  const mock = new MockClient('8')
  const comp = new Computer(testInput.trim().split(',').map(Number), mock)
  await comp.executeProgram()
  expect(mock.messages).toEqual(['1000'])
  done()
})

test('Test input will produce 1000 when singular input is 8', async done => {
  const mock = new MockClient('15')
  const comp = new Computer(testInput.trim().split(',').map(Number), mock)
  await comp.executeProgram()
  expect(mock.messages).toEqual(['1001'])
  done()
})

test('part1 input should be', async done => {
  expect(await part1(challengeInput)).toEqual('8332629')
  done()
})

test('part2 input should be ', async done => {
  expect(await part2(challengeInput)).toEqual('8805067')
  done()
})

test('Program should output 1125899906842624', async done => {
  const mock = new MockClient()
  const program = [104, 1125899906842624, 99]
  const comp = new Computer(program, mock)
  await comp.executeProgram()
  expect(mock.messages).toEqual(['1125899906842624'])
  done()
})

test('Program should output a 16-digit number', async done => {
  const mock = new MockClient()
  const program = [1102, 34915192, 34915192, 7, 4, 7, 99, 0]
  const comp = new Computer(program, mock)
  await comp.executeProgram()
  expect(mock.messages[0].length).toEqual(16)
  done()
})
