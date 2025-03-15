import { Coordinate, Size } from '../types'
export type ShapeProps = {
  context: CanvasRenderingContext2D
  position: Coordinate
  size: Size
}

export abstract class Shape {
  context: CanvasRenderingContext2D
  coordinate: Coordinate = { x: 0, y: 0 }
  size: Size = { width: 0, height: 0 }

  protected constructor(props: ShapeProps) {
    this.context = props.context
    this.coordinate = props.position
    this.size = props.size
  }

  protected setContext(context: CanvasRenderingContext2D) {
    this.context = context
  }

  protected setPosition(position: Coordinate) {
    this.coordinate = position
  }

  protected setSize(size: Size) {
    this.size = size
  }

  abstract render(): void
}
