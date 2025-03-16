import { Coordinate, Direction, Size } from '../types'
import { Shape } from './shape'

export type BulletProps = {
  id: string
  context: CanvasRenderingContext2D
  startPosition: Coordinate
  direction: Direction
  speed: number
  size: Size
}

export class Bullet extends Shape {
  color = '#ffcf35'
  direction
  speed = 0

  constructor(props: BulletProps) {
    super({
      id: props.id,
      context: props.context,
      position: props.startPosition,
      size: props.size,
    })

    this.setId(props.id)
    this.setContext(props.context)
    this.setPosition(props.startPosition)
    this.setSize(props.size)

    this.direction = props.direction
    this.speed = props.speed
  }

  public updateCoordinate(coordinate: Coordinate) {
    if (this.coordinate) {
      this.coordinate.x += coordinate.x
      this.coordinate.y += coordinate.y
    }
  }

  /*public updateCoordinate(direction: Direction, distance: number) {
    this.direction = direction
    
    switch (direction) {
      case 'up':
        this.coordinate.y -= distance
        break
      case 'down':
        this.coordinate.y += distance
        break
      case 'left':
        this.coordinate.x -= distance
        break
      case 'right':
        this.coordinate.x += distance
        break
      default: break
    }
  }*/

  render() {
    this.context.fillStyle = this.color
    this.context.fillRect(
      this.coordinate.x - this.size.width / 2,
      this.coordinate.y - this.size.height / 2,
      this.size.width,
      this.size.height
    )
  }
}
