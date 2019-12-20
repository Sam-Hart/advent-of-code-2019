import { part1, part2, Node } from '@app/day-6'
import testInput from '@test/day-6/testInput.txt'
import sanInput from '@test/day-6/sanInput.txt'
import challengeInput from '@test/day-6/challengeInput.txt'

test('Basic input should have 42 orbits', () => {
  expect(part1(testInput)).toEqual(42)
})

test('Challenge input should have 270768 orbits', () => {
  expect(part1(challengeInput)).toEqual(270768)
})

test('Distance between a parent and child node should be 1', () => {
  const a = new Node('A')
  const b = new Node('B')
  a.addChild(b)
  expect(a.distanceFrom(b)).toBe(1)
})

test('Distance between a child node and parent should be 1', () => {
  const a = new Node('A')
  const b = new Node('B')
  a.addChild(b)
  expect(b.distanceFrom(a)).toEqual(1)
})

test('Distance from a parent node to an indirect child node with 2 intermediary nodes should be 3', () => {
  const a = new Node('A')
  const b = new Node('B')
  const c = new Node('C')
  const d = new Node('D')
  a.addChild(b)
  b.addChild(c)
  c.addChild(d)
  expect(a.distanceFrom(d)).toEqual(3)
  expect(d.distanceFrom(a)).toEqual(3)
  expect(d.distanceFrom(c)).toEqual(1)
})

test('Distance between two disparate nodes with a common ancestor should be calculated correctly', () => {
  const a = new Node('A')
  const b = new Node('B')
  const c = new Node('C')
  const d = new Node('D')
  const e = new Node('E')
  const f = new Node('F')
  const g = new Node('G')
  const h = new Node('H')
  const i = new Node('I')
  a.addChild(b)
  b.addChild(c)
  c.addChild(d)
  b.addChild(e)
  c.addChild(f)
  f.addChild(g)
  c.addChild(h)
  h.addChild(i)
  expect(g.distanceFrom(e)).toEqual(4)
  expect(g.distanceFrom(i)).toEqual(4)
})

test('Distance from Santa with test input should be 4', () => {
  expect(part2(sanInput)).toEqual(4)
})

test('Distance from santa with challenge input is', () => {
  expect(part2(challengeInput)).toEqual(451)
})
