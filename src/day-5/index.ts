export async function part1 (puzzleInput: string): Promise<string> {
  const intCodes = puzzleInput
    .trim()
    .split(',')
    .map(Number)

  const diagnosticTool = new DiagnosticClient()
  const intCodeComputer = new Computer(intCodes, diagnosticTool)
  await intCodeComputer.executeProgram()
  console.log(diagnosticTool.messages)
  return Promise.resolve(diagnosticTool.messages.pop() || 'No logged messages')
}

export function part2 (puzzleInput: string) {}

export class DiagnosticClient implements Client {
  messages: Array<string> = []

  prompt = () => Promise.resolve('1')

  output = (message: number) => {
    this.messages.push(message.toString())
  }
}

enum Operation {
  Addition = 1,
  Multiplication = 2,
  Write = 3,
  Read = 4,
  Halt = 99
}

export class Computer {
  client: Client
  memory: Array<number>
  halted: boolean = false

  operationsParameterSize: {
    [key in Operation | number]: number
  } = {
    [Operation.Addition]: 3,
    [Operation.Multiplication]: 3,
    [Operation.Read]: 1,
    [Operation.Write]: 1,
    [Operation.Halt]: 0
  }

  operations: {
    [key in Operation | number]: (args: number[]) => Promise<number>
  } = {
    [Operation.Addition]: this.addition,
    [Operation.Multiplication]: this.multiplication,
    [Operation.Read]: this.read,
    [Operation.Write]: this.write,
    [Operation.Halt]: this.halt
  }

  constructor (p: Array<number>, c: Client) {
    this.client = c
    this.memory = p
  }

  addition ([addendLoc, augendLoc, sumLoc]: Array<number>): Promise<number> {
    this.memory[sumLoc] = this.memory[addendLoc] + this.memory[augendLoc]
    return Promise.resolve(0)
  }

  multiplication (
    [multiplicandLoc, multiplierLoc, productLoc]: Array<number>
  ): Promise<number> {
    this.memory[productLoc] = this.memory[multiplicandLoc] *
      this.memory[multiplierLoc]

    return Promise.resolve(0)
  }

  read ([readLoc]: Array<number>): Promise<number> {
    this.client.output(this.memory[readLoc])
    return Promise.resolve(0)
  }

  write ([writeLoc]: Array<number>): Promise<number> {
    return new Promise((resolve, reject) => {
      this.client.prompt()
        .then(input => {
          const newValue = Number(input)
          if (!isNaN(newValue)) {
            this.memory[writeLoc] = newValue
            resolve(0)
          } else {
            throw new Error()
          }
        })
        .catch(reject)
    })
  }

  halt (): Promise<number> {
    this.halted = true
    return Promise.resolve(0)
  }

  async executeInstruction (stackPointer: number): Promise<number> {
    const intCode = this.memory[stackPointer]
    const op = intCode % 100
    const parameterSize = this.operationsParameterSize[op]
    const parameterModes = Math.floor(intCode / 100)
    const argsStart = stackPointer + 1
    const argsEnd = argsStart + parameterSize
    const args = this.memory.slice(argsStart, argsEnd)
    for (
      let i = 1, j = argsStart, k = 0;
      i <= parameterModes;
      i *= 10, j++, k++
    ) {
      const parameterMode = (Math.floor(parameterModes / i)) % 10
      if (parameterMode === 1) {
        args[k] = j
      }
    }

    const operation: (program: number[]) => Promise<number> =
      this.operations[op].bind(this)

    await operation(args)
    return argsEnd
  }

  async executeProgram (stackPointer = 0): Promise<Array<number>> {
    const updatedStackPointer = await this.executeInstruction(stackPointer)
    if (!this.halted) {
      await this.executeProgram(updatedStackPointer)
    }
    return this.memory
  }
}
