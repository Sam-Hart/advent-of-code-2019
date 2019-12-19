export function part1 (puzzleInput: string): number {
  const orbits = puzzleInput
    .trim()
    .split('\n')
    .map(orbitDescription => orbitDescription.split(')'))

  const orbitList: Array<Node> = generateOrbitList(orbits)

  let orbitTotal = 0
  for (let i = 0; i < orbitList.length; i++) {
    const orbit = orbitList[i]
    orbitTotal += calculateOrbits(orbit)
  }
  return orbitTotal
}

export function part2 (puzzleInput: string): number {
  const orbits = puzzleInput
    .trim()
    .split('\n')
    .map(orbitDescription => orbitDescription.split(')'))

  const orbitList: Array<Node> = generateOrbitList(orbits)
  console.log(orbitList)
  return 0
}

function generateOrbitList (orbits: Array<Array<string>>): Array<Node> {
  const orbitList: Array<Node> = []

  for (let i = 0; i < orbits.length; i++) {
    const [parentName, childName] = orbits[i]
    const parent: Node =
      orbitList.find(node => node.name === parentName) ||
      orbitList[orbitList.push(new Node(parentName)) - 1]

    const child: Node =
      orbitList.find(node => node.name === childName) ||
      orbitList[orbitList.push(new Node(childName)) - 1]

    child.parent = parent
  }
  return orbitList
}

function calculateOrbits (orbit: Node): number {
  if (!orbit.parent) {
    return 0
  } else {
    return calculateOrbits(orbit.parent) + 1
  }
}


class Node {
  name: string
  _parent: Node
  _children: Array<Node> = []
  _indirectChildren: Array<Node> = []

  constructor (name: string) {
    this.name = name
  }

  addChild (child: Node) {
    this._children.push(child)
  }

  set parent (parent: Node) {
    this._parent = parent
    this._parent.addChild(this)
  }

  get children () {
    return this._children
  }

  get parent () {
    return this._parent
  }
}
