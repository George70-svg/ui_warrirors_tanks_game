import { Coordinate, Size } from '../types'
export type ShapeProps = {
  position: Coordinate
  size: Size
}

export abstract class Shape {
  coordinate: Coordinate = { x: 0, y: 0 }
  size: Size = { width: 0, height: 0 }

  constructor(props: ShapeProps) {
    this.coordinate = props.position
    this.size = props.size
  }

  setPosition(position: Coordinate) {
    this.coordinate = position
  }

  setSize(size: Size) {
    this.size = size
  }
}
