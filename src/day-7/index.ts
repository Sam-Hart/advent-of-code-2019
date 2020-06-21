import { Computer, Client } from '@app/day-5'
import { EventEmitter } from 'events'
import { range } from 'lodash'

export async function part1 (puzzleInput: string): Promise<number> {
  const intCodes = puzzleInput
    .trim()
    .split(',')
    .map(Number)
  const phaseSettings = range(5)
  const phaseSettingPermutations = heapPermutation(phaseSettings)
  const amplifierOutputs: Array<number> = []
  for (const settings of phaseSettingPermutations) {
    let previousOut = 0
    for (const setting of settings.map(String)) {
      const client = new AmplifierClient([setting, previousOut.toString()])
      const amp = new Computer([...intCodes], client)
      await amp.executeProgram()
      previousOut = Number(client.messages[client.messages.length - 1])
    }
    amplifierOutputs.push(previousOut)
  }
  return Promise.resolve(Math.max(...amplifierOutputs))
}

export async function part2 (puzzleInput: string): Promise<number> {
  const intCodes = puzzleInput
    .trim()
    .split(',')
    .map(Number)
  const phaseSettings = range(5, 10)
  const phaseSettingPermutations = heapPermutation(phaseSettings)
  const executionThrusterOuts: Array<number> = []
  for (const settings of phaseSettingPermutations) {
    const clients: Array<LinkedAmplifierClient> = []
    for (const setting of settings) {
      clients.push(new LinkedAmplifierClient(setting))
    }
    const amps: Array<Computer> = []
    for (let i = 0; i < clients.length; i++) {
      if (i === 0) clients[i].initialValue = 0
      const linkedClient = clients[(clients.length + i + 1) % clients.length]
      const amp = new Computer([...intCodes], clients[i])
      linkedClient.setLinkedComputer(amp)
      amps.push(amp)
    }
    const executions = []
    for (let i = 0; i < amps.length; i++) {
      executions.push(amps[i].executeProgram())
    }
    await Promise.all(executions)
    const thrusterE = clients[clients.length - 1]
    executionThrusterOuts.push(
      Number(thrusterE.messages[thrusterE.messages.length - 1])
    )
  }
  return Promise.resolve(Math.max(...executionThrusterOuts))
}

class LinkedAmplifierClient implements Client {
  messages: Array<string> = []
  phaseSetting: number
  linkedComputer!: Computer
  inputs: any // shame
  emitter: EventEmitter
  initialValue: number | undefined

  constructor (phaseSetting: number) {
    this.phaseSetting = phaseSetting
    this.inputs = this.getInputs()
    this.emitter = new EventEmitter()
  }

  * getInputs () {
    const linkedOut = this.linkedComputer.client.messages
    yield this.phaseSetting
    if (this.initialValue === 0) {
      yield 0
    }

    let nextOut = 0
    for (;;) {
      if (linkedOut[nextOut]) {
        nextOut += 1
        yield linkedOut[nextOut - 1]
      } else {
        yield
      }
    }
  }

  setLinkedComputer (c: Computer) {
    this.linkedComputer = c
  }

  prompt = (): Promise<string> => {
    return new Promise(resolve => {
      const retrievedInput = this.inputs.next().value
      if (retrievedInput === undefined) {
        const linkedClient = <LinkedAmplifierClient> this.linkedComputer.client
        linkedClient.emitter.once('newMessage', () => {
          resolve(this.inputs.next().value)
        })
      } else {
        resolve(retrievedInput)
      }
    })
  }

  output (message: number) {
    this.messages.push(message.toString())
    this.emitter.emit('newMessage')
  }
}

class AmplifierClient implements Client {
  messages: Array<string> = []
  inputs: any // Shame
  constructor (inputs: Array<string>) {
    this.inputs = this.getInput(inputs)
  }

  * getInput (inputs: Array<string>) {
    for (let i = 0; i < inputs.length; i++) {
      yield inputs[i]
    }
  }

  prompt = () => Promise.resolve(this.inputs.next().value)

  output = (message: number) => {
    this.messages.push(message.toString())
  }
}

function heapPermutation (
  list: Array<number>, size = list.length, n: number = list.length
): Array<Array<number>> {
  let newList: Array<Array<number>> = []
  if (size === 1) {
    newList.push([...list])
    return newList
  }
  for (let i = 0; i < size; i++) {
    newList = newList.concat(heapPermutation(list, size - 1, n))
    if (size & 1) {
      ;[list[0], list[size - 1]] = [list[size - 1], list[0]]
    } else {
      ;[list[i], list[size - 1]] = [list[size - 1], list[i]]
    }
  }
  return newList
}
