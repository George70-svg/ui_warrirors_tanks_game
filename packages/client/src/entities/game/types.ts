export type Direction = 'up' | 'down' | 'left' | 'right'

export type Keys = 'w' | 's' | 'a' | 'd'

export type Coordinate = { x: number; y: number }

export type Size = { width: number; height: number }

export type KeysState = Record<Keys, boolean>

export type MoveKeys = keyof KeysState

export type Offset = {
  coordinate: { x: number; y: number }
  direction: Direction
}

export type ShapeObject = {
  coordinate: { x: number; y: number }
  size: Size
}
