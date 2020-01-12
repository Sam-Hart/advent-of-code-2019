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
  const santa = orbitList.find(node => node.name === 'SAN')!
  const you = orbitList.find(node => node.name === 'YOU')!

  return you.parent.distanceFrom(santa.parent)
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


export class Node {
  name: string
  _parent?: Node
  _children: Array<Node> = []
  _indirectChildren: Array<Node> = []

  constructor (name: string) {
    this.name = name
  }

  addChild (child: Node) {
    this._children.push(child)
    child.parent = this
  }

  distanceFrom (target: Node): number {
    let distance = 0
    if (target === this) {
      return distance
    }
    const possibleChild = this.children.find(child => target === child)
    if (possibleChild) {
      distance += 1
      return distance
    }
    if (this.indirectChildren.includes(target)) {
      for (let i = 0; i < this.children.length; i++) {
        const child = this.children[i]
        if (child.children.includes(target) || child.indirectChildren.includes(target)) {
          distance += this.children[i].distanceFrom(target) + 1
          return distance
        }
      }
    }

    if (
      target !== this &&
      !this.children.includes(target) &&
      !this.indirectChildren.includes(target) &&
      this.parent
    ) {
      distance += this.parent.distanceFrom(target) + 1
    }

    return distance
  }

  set parent (parent: Node) {
    this._parent = parent
    if (!this._parent.children.includes(this)) {
      this._parent.addChild(this)
    }
  }

  get tree (): Array<Node> {
    const tree = this.children.reduce((children, child) => {
      return children.concat(child.tree)
    }, new Array<Node>())
    tree.push(this)
    return tree
  }

  get indirectChildren () {
    return this.children.reduce((indirectChildren, child) => {
      return indirectChildren.concat(child.tree)
    }, new Array<Node>())
  }

  get children () {
    return this._children
  }

  get parent () {
    return this._parent!
  }
}
