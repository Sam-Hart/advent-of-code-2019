import { EventEmitter } from 'events'

export async function part1 (puzzleInput: string): Promise<string> {
  const intCodes = puzzleInput
    .trim()
    .split(',')
    .map(Number)

  const diagnosticTool = new DiagnosticClient()
  const intCodeComputer = new Computer(intCodes, diagnosticTool)
  await intCodeComputer.executeProgram()
  return Promise.resolve(diagnosticTool.messages.pop() || 'No logged messages')
}

export async function part2 (puzzleInput: string) {
  const intCodes = puzzleInput
    .trim()
    .split(',')
    .map(Number)

  const diagnosticTool = new DiagnosticClient('5')
  const intCodeComputer = new Computer(intCodes, diagnosticTool)
  await intCodeComputer.executeProgram()
  return Promise.resolve(diagnosticTool.messages.pop() || 'No logged messages')
}

export class DiagnosticClient implements Client {
  messages: Array<string> = []
  input: string
  emitter: EventEmitter
  constructor (fakeIn: string = '1') {
    this.input = fakeIn
  }

  prompt = () => Promise.resolve(this.input)

  output = (message: number) => {
    this.messages.push(message.toString())
  }
}

enum Operation {
  Addition = 1,
  Multiplication = 2,
  Write = 3,
  Read = 4,
  TrueJump = 5,
  FalseJump = 6,
  LessThan = 7,
  Equals = 8,
  RelativeBaseChange = 9,
  Halt = 99
}

export class Computer {
  client: Client
  memory: Array<number>
  halted: boolean = false
  relativeBase = 0

  operationsParameterSize: {
    [key in Operation | number]: number
  } = {
    [Operation.Addition]: 3,
    [Operation.Multiplication]: 3,
    [Operation.Read]: 1,
    [Operation.Write]: 1,
    [Operation.TrueJump]: 2,
    [Operation.FalseJump]: 2,
    [Operation.LessThan]: 3,
    [Operation.Equals]: 3,
    [Operation.RelativeBaseChange]: 1,
    [Operation.Halt]: 0
  }

  operations: {
    [key in Operation | number]: (args: number[]) => Promise<number | null>
  } = {
    [Operation.Addition]: this.addition,
    [Operation.Multiplication]: this.multiplication,
    [Operation.Read]: this.read,
    [Operation.Write]: this.write,
    [Operation.TrueJump]: this.jumpTrue,
    [Operation.FalseJump]: this.jumpFalse,
    [Operation.LessThan]: this.lessThan,
    [Operation.Equals]: this.equals,
    [Operation.RelativeBaseChange]: this.baseChange,
    [Operation.Halt]: this.halt
  }

  constructor (p: Array<number>, c: Client) {
    this.memory = p
    this.client = c
  }

  addition (
    [addendLoc, augendLoc, sumLoc]: Array<number>
  ): Promise<null> {
    this.memory[sumLoc] = this.memory[addendLoc] + this.memory[augendLoc]
    return Promise.resolve(null)
  }

  multiplication (
    [multiplicandLoc, multiplierLoc, productLoc]: Array<number>
  ): Promise<null> {
    this.memory[productLoc] = this.memory[multiplicandLoc] *
      this.memory[multiplierLoc]

    return Promise.resolve(null)
  }

  read (
    [readLoc]: Array<number>
  ): Promise<null> {
    this.client.output(this.memory[readLoc])
    return Promise.resolve(null)
  }

  async write (
    [writeLoc]: Array<number>
  ): Promise<null> {
    const c = this
    const input = await this.client.prompt()
    const newValue = Number(input)
    if (isNaN(newValue)) {
      throw new Error()
    }
    c.memory[writeLoc] = newValue
    return null
  }

  jumpTrue (
    [truthLoc, jumpLoc]: Array<number>
  ): Promise<number | null> {
    if (this.memory[truthLoc] !== 0) {
      return Promise.resolve(this.memory[jumpLoc])
    }
    return Promise.resolve(null)
  }

  jumpFalse (
    [truthLoc, jumpLoc]: Array<number>
  ): Promise<number | null> {
    if (this.memory[truthLoc] === 0) {
      return Promise.resolve(this.memory[jumpLoc])
    }
    return Promise.resolve(null)
  }

  lessThan (
    [aCondLoc, bCondLoc, truthLoc]: Array<number>
  ): Promise<null> {
    if (this.memory[aCondLoc] < this.memory[bCondLoc]) {
      this.memory[truthLoc] = 1
    } else {
      this.memory[truthLoc] = 0
    }
    return Promise.resolve(null)
  }

  equals (
    [aCondLoc, bCondLoc, truthLoc]: Array<number>
  ): Promise<null> {
    if (this.memory[aCondLoc] === this.memory[bCondLoc]) {
      this.memory[truthLoc] = 1
    } else {
      this.memory[truthLoc] = 0
    }
    return Promise.resolve(null)
  }

  baseChange (
    [newBaseLoc]: Array<number>
  ): Promise<null> {
    this.relativeBase += (this.memory[newBaseLoc] || 0)
    return Promise.resolve(null)
  }

  halt (): Promise<null> {
    this.halted = true
    return Promise.resolve(null)
  }

  async executeInstruction (stackPointer: number): Promise<number> {
    const intCode = this.memory[stackPointer]
    const op = intCode % 100
    const parameterSize = this.operationsParameterSize[op]
    const parameterModes = Math.floor(intCode / 100)
    const argsStart = stackPointer + 1
    const argsEnd = argsStart + parameterSize
    const args = this.memory.slice(argsStart, argsEnd)

    // FIXME: Parameter mode logic is becoming challenging to test, and
    // adding if statements for every type of parameter mode will become
    // hairy if more are added
    for (
      let i = 1, j = argsStart, k = 0;
      i <= parameterModes;
      i *= 10, j++, k++
    ) {
      const parameterMode = (Math.floor(parameterModes / i)) % 10
      if (parameterMode === 1) {
        args[k] = j
      } else if (parameterMode === 2) {
        args[k] += this.relativeBase
      }
    }

    const operation: (program: number[]) => Promise<number> =
      this.operations[op].bind(this)

    const completed = await operation(args)
    return completed === null ? argsEnd : completed
  }

  async executeProgram (stackPointer = 0): Promise<Array<number>> {
    const updatedStackPointer = await this.executeInstruction(stackPointer)

    if (!this.halted) {
      await this.executeProgram(updatedStackPointer)
    }
    return this.memory
  }
}
