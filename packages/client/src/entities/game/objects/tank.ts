import { Coordinate, Direction, Size } from '../types'
import { Shape } from './shape'

export type TankProps = {
  context: CanvasRenderingContext2D
  startPosition: Coordinate
  direction: Direction
  speed: number
  imageSrc: string
  size: Size
}

export class Tank extends Shape {
  coordinate: Coordinate = { x: 0, y: 0 }
  direction: Direction = 'up'
  image: HTMLImageElement = new Image()
  speed = 0

  constructor(props: TankProps) {
    super({
      context: props.context,
      position: props.startPosition,
      size: props.size,
    })

    this.setContext(props.context)
    this.setPosition(props.startPosition)
    this.setSize(props.size)

    this.direction = props.direction
    this.speed = props.speed
    this.image.src = props.imageSrc
  }

  public updateCoordinate(coordinate: Coordinate) {
    if (this.coordinate) {
      this.coordinate.x += coordinate.x
      this.coordinate.y += coordinate.y
    }
  }

  public setDirection(direction: Direction) {
    this.direction = direction
  }

  private getRotateAngle() {
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

  public render() {
    this.context.save() // Сохраняем текущее состояние Canvas
    this.context.translate(
      this.coordinate.x + this.size.width / 2,
      this.coordinate.y + this.size.height / 2
    ) // Настраиваем точку вращения (центр объекта)
    this.context.rotate(this.getRotateAngle()) // Поворачиваем систему координат
    this.context.drawImage(
      this.image,
      -this.size.width / 2,
      -this.size.height / 2,
      this.size.width,
      this.size.height
    ) // Рисуем танк
    this.context.restore() // Восстанавливаем состояние (отменяем translate, rotate и т.д.)
  }
}
