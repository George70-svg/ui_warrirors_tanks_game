import { Coordinate, Direction, Size } from '../types'
import { Shape } from './shape'

export type TankProps = {
  startPosition: Coordinate
  direction: Direction
  speed: number
  imageSrc: string
  size: Size
}

export class Tank extends Shape {
  coordinate: Coordinate = { x: 0, y: 0 }
  size: Size = { width: 0, height: 0 }
  direction: Direction = 'up'
  image: HTMLImageElement = new Image()
  speed = 0

  constructor(props: TankProps) {
    super({
      position: props.startPosition,
      size: props.size,
    })

    this.setPosition(props.startPosition)
    this.setSize(props.size)

    this.direction = props.direction
    this.speed = props.speed
    this.size = props.size
    this.image.src = props.imageSrc
  }

  updateCoordinate(coordinate: Coordinate) {
    if (this.coordinate) {
      this.coordinate.x += coordinate.x
      this.coordinate.y += coordinate.y
    }
  }

  setDirection(direction: Direction) {
    this.direction = direction
  }

  getRotateAngle() {
    let angle = 0

    if (this.direction === 'up') {
      angle = 0 // 0°
    } else if (this.direction === 'right') {
      angle = Math.PI / 2 // 90°
    } else if (this.direction === 'down') {
      angle = Math.PI // 180°
    } else if (this.direction === 'left') {
      angle = (3 * Math.PI) / 2 // 270°
    }

    return angle
  }
}
