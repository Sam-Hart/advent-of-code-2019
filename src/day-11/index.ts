import { Computer, Client } from '@app/day-5'

export async function part1 (puzzleInput: string): Promise<number> {
  const intCodes = puzzleInput
    .trim()
    .split(',')
    .map(Number)

  const rc = new RobotClient(0)
  const panelPainter = new Computer(intCodes, rc)
  await panelPainter.executeProgram()
  return rc.paintedPanels.size
}

export async function part2 (puzzleInput: string): Promise<string> {
  const intCodes = puzzleInput
    .trim()
    .split(',')
    .map(Number)

  const rc = new RobotClient(1)
  const panelPainter = new Computer(intCodes, rc)
  await panelPainter.executeProgram()
  const image: Array<Array<number>> = []
  let lowestX = 0
  let lowestY = 0
  for (const panel of rc.map.keys()) {
    lowestX = lowestX > panel.x ? panel.x : lowestX
    lowestY = lowestY > panel.y ? panel.y : lowestY
  }
  for (const [panel, color] of rc.map.entries()) {
    if (!image[panel.y - lowestY]) {
      image[panel.y - lowestY] = []
    }
    image[panel.y - lowestY][panel.x - lowestX] = color
  }
  let imageString = ''
  for (let y = image.length; y >= 0; y--) {
    for (let x = 0; x < image[y]?.length || 0; x++) {
      if (image[y][x] === 1) {
        imageString += '#'
      } else {
        imageString += '.'
      }
    }
    imageString += '\n'
  }
  return imageString
}

class RobotClient implements Client {
  messages: Array<string> = []
  map: Map<Point, number> = new Map()
  xVelocity: number = 0
  yVelocity: number = 1
  currentLocation: Point = { x: 0, y: 0 }
  painting: boolean = true
  paintedPanels: Set<Point> = new Set()

  constructor (initialPanelColor: number) {
    if (initialPanelColor) {
      this.map.set(this.currentLocation, initialPanelColor)
    }
  }

  prompt = (): Promise<string> => {
    return Promise.resolve(
      this.map.get(this.currentLocation)?.toString() || '0'
    )
  }

  output = (message: number) => {
    this.messages.push(message.toString())
    if (this.painting) {
      this.map.set(this.currentLocation, message)
      this.paintedPanels.add(this.currentLocation)
      this.painting = false
    } else {
      if (message === 0) {
        const newXVelocity = -this.yVelocity
        const newYVelocity = this.xVelocity
        this.xVelocity = newXVelocity
        this.yVelocity = newYVelocity
      } else if (message === 1) {
        const newXVelocity = this.yVelocity
        const newYVelocity = -this.xVelocity
        this.xVelocity = newXVelocity
        this.yVelocity = newYVelocity
      }
      this.currentLocation = {
        x: this.currentLocation.x + this.xVelocity,
        y: this.currentLocation.y + this.yVelocity
      }
      for (const knownPanel of this.paintedPanels) {
        if (
          knownPanel.x === this.currentLocation.x &&
          knownPanel.y === this.currentLocation.y
        ) {
          this.currentLocation = knownPanel
        }
      }
      this.painting = true
    }
  }
}
