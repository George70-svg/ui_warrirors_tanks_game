import { Coordinate, Size } from '../types'
import { Shape } from './shape'

export type DecorationProps = {
  id: string
  context: CanvasRenderingContext2D
  position: Coordinate
  size: Size
  color: string
}

export class Decoration extends Shape {
  color = '#FFF'

  constructor(props: DecorationProps) {
    super({
      id: props.id,
      context: props.context,
      position: props.position,
      size: props.size,
      markForDelete: false,
    })

    this.color = props.color
  }

  render() {
    this.context.fillStyle = this.color
    this.context.fillRect(
      this.coordinate.x,
      this.coordinate.y,
      this.size.width,
      this.size.height
    )
  }
}
