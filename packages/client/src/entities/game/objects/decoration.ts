import { Coordinate, Size } from '../types'
import { Shape } from './shape'

export type DecorationProps = {
  position: Coordinate
  size: Size
  color: string
}

export class Decoration extends Shape {
  color = '#FFF'

  constructor(props: DecorationProps) {
    super({
      position: props.position,
      size: props.size,
    })

    this.setPosition(props.position)
    this.setSize(props.size)
    this.color = props.color
  }
}
