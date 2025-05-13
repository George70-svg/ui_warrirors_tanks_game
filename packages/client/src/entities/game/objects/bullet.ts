import { Coordinate, Direction, Size } from '../types'
import { Shape } from './shape'

export type BulletProps = {
  id: string
  tankId: string
  context: CanvasRenderingContext2D
  startPosition: Coordinate
  direction: Direction
  speed: number
  size: Size
  color?: string
}

export class Bullet extends Shape {
  tankId: string
  color = '#ffcf35'
  direction
  speed = 0
  type = 'bullet'

  constructor(props: BulletProps) {
    super({
      id: props.id,
      context: props.context,
      position: props.startPosition,
      size: props.size,
      markForDelete: false,
    })

    this.direction = props.direction
    this.speed = props.speed
    this.tankId = props.tankId
    this.color = props?.color ?? '#ffcf35'
  }

  public updateCoordinate(coordinate: Coordinate) {
    if (this.coordinate) {
      this.coordinate.x += coordinate.x
      this.coordinate.y += coordinate.y
    }
  }

  render() {
    const halfWidth = this.size.width / 2
    const halfHeight = this.size.height / 2

    this.context.fillStyle = this.color
    this.context.fillRect(
      this.coordinate.x - halfWidth,
      this.coordinate.y - halfHeight,
      this.size.width,
      this.size.height
    )
  }
}
