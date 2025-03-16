import { Coordinate, Size } from '../types'
export type ShapeProps = {
  id: string
  context: CanvasRenderingContext2D
  position: Coordinate
  size: Size
}

export abstract class Shape {
  id: string
  context: CanvasRenderingContext2D
  coordinate: Coordinate = { x: 0, y: 0 }
  size: Size = { width: 0, height: 0 }

  protected constructor(props: ShapeProps) {
    this.context = props.context
    this.coordinate = props.position
    this.size = props.size
    this.id = props.id
  }

  abstract render(): void
}
