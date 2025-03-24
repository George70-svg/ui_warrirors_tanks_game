export type Direction = 'up' | 'down' | 'left' | 'right'

export type Coordinate = { x: number; y: number }

export type Size = { width: number; height: number }

export type Keys = 'w' | 's' | 'a' | 'd' | 'space'

export type KeysState = Record<Keys, boolean>

export type Offset = {
  coordinate: { x: number; y: number }
  direction: Direction
}

export type ShapeObject = {
  coordinate: { x: number; y: number }
  size: Size
}

export enum KeysCode {
  KeyW = 'w',
  KeyA = 'a',
  KeyS = 's',
  KeyD = 'd',
  Space = 'space',
}
