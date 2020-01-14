import { Computer, DiagnosticClient } from '@app/day-5'

export async function part1 (puzzleInput: string): Promise<number> {
  const client = new DiagnosticClient('1')
  const computer = new Computer(
    puzzleInput.trim().split(',').map(Number),
    client
  )
  await computer.executeProgram()
  return Number(client.messages[client.messages.length - 1])
}

export async function part2 (puzzleInput: string): Promise<number> {
  const client = new DiagnosticClient('2')
  const computer = new Computer(
    puzzleInput.trim().split(',').map(Number),
    client
  )
  await computer.executeProgram()
  return Number(client.messages[client.messages.length - 1])
}
