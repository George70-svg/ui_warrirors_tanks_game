import { Coordinate, Size } from '../types'
import { Shape } from './shape'

export type DecorationProps = {
  id: string
  context: CanvasRenderingContext2D
  position: Coordinate
  size: Size
  color?: string
  typeDecoration?: 'brick' | 'metal'
  imageSrc?: string
  markForDelete?: boolean
  hasDeletable?: boolean
}

export class Decoration extends Shape {
  type = 'decoration'
  typeDecoration: 'brick' | 'metal' = 'brick'
  image: HTMLImageElement = new Image()
  color = '#0ff'
  imageSrc = ''
  hasDeletable = false

  constructor(props: DecorationProps) {
    super({
      id: props.id,
      context: props.context,
      position: props.position,
      size: props.size,
      markForDelete: props?.markForDelete ?? false,
    })

    this.typeDecoration = props?.typeDecoration ?? 'brick'
    this.imageSrc = props?.imageSrc ?? ''
    this.image.src = props?.imageSrc ?? ''
    this.color = props?.color ?? '#0ff'
    this.hasDeletable = props?.hasDeletable ?? false
  }

  render() {
    if (this.imageSrc) {
      this.context.drawImage(
        this.image,
        this.coordinate.x,
        this.coordinate.y,
        this.size.width,
        this.size.height
      )
    } else {
      this.context.fillStyle = this.color
      this.context.fillRect(
        this.coordinate.x,
        this.coordinate.y,
        this.size.width,
        this.size.height
      )
    }
  }
}
