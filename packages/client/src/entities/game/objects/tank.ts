import { Coordinate, Direction, Size } from '../types'
import { Bullet } from './bullet'
import { Shape } from './shape'

export type TankProps = {
  id: string
  context: CanvasRenderingContext2D
  startPosition: Coordinate
  direction: Direction
  speed: number
  imageSrc: string
  size: Size
  healthPoint: number
  bulletColor?: string
}

export class Tank extends Shape {
  direction: Direction
  image: HTMLImageElement = new Image()
  speed = 0
  healthPoint = 100
  damage = 50
  type: 'player' | 'computer'
  bulletColor: string

  constructor(props: TankProps) {
    super({
      id: props.id,
      context: props.context,
      position: props.startPosition,
      size: props.size,
      markForDelete: false,
    })

    this.direction = props.direction
    this.speed = props.speed
    this.image.src = props.imageSrc
    this.healthPoint = props.healthPoint
    this.type = 'player'
    this.bulletColor = props?.bulletColor ?? ''
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

  public shot() {
    return new Bullet({
      id: crypto.randomUUID(),
      tankId: this.id,
      context: this.context,
      startPosition: {
        x: this.coordinate.x + this.size.width / 2,
        y: this.coordinate.y + this.size.height / 2,
      }, // Позиционируем пулю по центру танка
      direction: this.direction,
      speed: 0.4,
      size: { width: 6, height: 6 },
      color: this.bulletColor,
    })
  }

  takeDamage() {
    this.healthPoint -= this.damage
  }

  public render() {
    const halfWidth = this.size.width / 2
    const halfHeight = this.size.height / 2

    this.context.save() // Сохраняем текущее состояние Canvas
    this.context.translate(
      this.coordinate.x + halfWidth,
      this.coordinate.y + halfHeight
    ) // Настраиваем точку вращения (центр объекта)
    this.context.rotate(this.getRotateAngle()) // Поворачиваем систему координат
    this.context.drawImage(
      this.image,
      -halfWidth,
      -halfHeight,
      this.size.width,
      this.size.height
    ) // Рисуем танк
    this.context.restore() // Восстанавливаем состояние (отменяем translate, rotate и т.д.)
  }
}
