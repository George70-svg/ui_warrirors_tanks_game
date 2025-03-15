import { Coordinate, Size } from '../types'
import { Shape } from './shape'

export type DecorationProps = {
  context: CanvasRenderingContext2D
  position: Coordinate
  size: Size
  color: string
}

export class Decoration extends Shape {
  color = '#FFF'

  constructor(props: DecorationProps) {
    super({
      context: props.context,
      position: props.position,
      size: props.size,
    })

    this.setContext(props.context)
    this.setPosition(props.position)
    this.setSize(props.size)
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
