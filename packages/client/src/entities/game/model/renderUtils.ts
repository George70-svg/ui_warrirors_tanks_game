import { config } from '../config/gameConfig'
import { Decoration, DecorationProps } from '../objects/decoration'
import { Coordinate } from '../types'
import { toPixels } from '../utils'

export function createDecorationFigure(
  coords: Coordinate[],
  context: CanvasRenderingContext2D,
  type: NonNullable<DecorationProps['typeDecoration']>,
  hasDeletable?: DecorationProps['markForDelete'],
  imageSrc?: string,
  color?: string
): Decoration[] {
  return coords.map(
    ({ x: coordX, y: coordY }) =>
      new Decoration({
        id: crypto.randomUUID(),
        context,
        position: { x: toPixels(coordX), y: toPixels(coordY) },
        size: { width: toPixels(1), height: toPixels(1) },
        color,
        typeDecoration: type,
        imageSrc,
        hasDeletable,
      })
  )
}

export function renderAllObjects(ctx: CanvasRenderingContext2D | null) {
  if (!ctx) return

  const objects = [
    ...config.bulletObjects,
    ...config.tankObjects,
    ...config.decorationObjects,
  ]

  objects.forEach((item) => {
    item.render()
  })
}
