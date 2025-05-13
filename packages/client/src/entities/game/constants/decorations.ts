import brickImg from '../../../assets/images/brick.png'
import metalImg from '../../../assets/images/metal.png'
import { Coordinate } from '../types'
import { Decoration, DecorationProps } from '../objects/decoration'
import { toPixels } from '../config/gameConfig'

const BRICK_BLOCK_1_COORDS = [
  { x: 10, y: 10 },
  { x: 10, y: 11 },
  { x: 10, y: 12 },
  { x: 10, y: 13 },
  { x: 10, y: 14 },
  { x: 9, y: 9 },
  { x: 9, y: 10 },
  { x: 9, y: 11 },
  { x: 9, y: 12 },
  { x: 9, y: 13 },
  { x: 9, y: 14 },
]

const BRICK_BLOCK_2_COORDS = [
  { x: 16, y: 10 },
  { x: 16, y: 11 },
  { x: 16, y: 12 },
  { x: 16, y: 13 },
  { x: 16, y: 14 },
  { x: 17, y: 9 },
  { x: 17, y: 10 },
  { x: 17, y: 11 },
  { x: 17, y: 12 },
  { x: 17, y: 13 },
  { x: 17, y: 14 },
]

const BRICK_BLOCK_3_COORDS = [
  { x: 11, y: 0 },
  { x: 12, y: 0 },
  { x: 13, y: 0 },
  { x: 14, y: 0 },
  { x: 15, y: 0 },
  { x: 11, y: 1 },
  { x: 12, y: 1 },
  { x: 13, y: 1 },
  { x: 14, y: 1 },
  { x: 15, y: 1 },
  { x: 11, y: 2 },
  { x: 12, y: 2 },
  { x: 13, y: 2 },
  { x: 14, y: 2 },
  { x: 15, y: 2 },
  { x: 11, y: 3 },
  { x: 12, y: 3 },
  { x: 13, y: 3 },
  { x: 14, y: 3 },
  { x: 15, y: 3 },
]

const BRICK_BLOCK_4_COORDS = [
  { x: 6, y: 5 },
  { x: 6, y: 6 },
  { x: 6, y: 7 },
  { x: 6, y: 8 },
  { x: 6, y: 8 },
  { x: 7, y: 8 },
  { x: 8, y: 8 },
  { x: 9, y: 8 },
]

const BRICK_BLOCK_5_COORDS = [
  { x: 20, y: 5 },
  { x: 20, y: 6 },
  { x: 20, y: 7 },
  { x: 20, y: 8 },
  { x: 19, y: 8 },
  { x: 18, y: 8 },
  { x: 17, y: 8 },
]

const METAL_BLOCK_1_COORDS = [
  { x: 10, y: 9 },
  { x: 11, y: 9 },
  { x: 12, y: 9 },
  { x: 13, y: 9 },
  { x: 14, y: 9 },
  { x: 15, y: 9 },
  { x: 16, y: 9 },
]

const METAL_BLOCK_2_COORDS = [
  { x: 6, y: 4 },
  { x: 7, y: 4 },
  { x: 8, y: 4 },
  { x: 9, y: 4 },
  { x: 10, y: 4 },
]

const METAL_BLOCK_3_COORDS = [
  { x: 16, y: 4 },
  { x: 17, y: 4 },
  { x: 18, y: 4 },
  { x: 19, y: 4 },
  { x: 20, y: 4 },
]

const LAKE_COORDS = [
  { x: 11, y: 6 },
  { x: 12, y: 6 },
  { x: 13, y: 6 },
  { x: 14, y: 6 },
  { x: 15, y: 6 },
  { x: 11, y: 5 },
  { x: 12, y: 5 },
  { x: 13, y: 5 },
  { x: 14, y: 5 },
  { x: 15, y: 5 },
  { x: 11, y: 4 },
  { x: 12, y: 4 },
  { x: 13, y: 4 },
  { x: 14, y: 4 },
  { x: 15, y: 4 },
]

function createDecorationFigure(
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

export function getDecorations(
  context: CanvasRenderingContext2D
): Decoration[] {
  return [
    ...createDecorationFigure(
      BRICK_BLOCK_1_COORDS,
      context,
      'brick',
      true,
      brickImg
    ),
    ...createDecorationFigure(
      BRICK_BLOCK_2_COORDS,
      context,
      'brick',
      true,
      brickImg
    ),
    ...createDecorationFigure(
      BRICK_BLOCK_3_COORDS,
      context,
      'brick',
      true,
      brickImg
    ),
    ...createDecorationFigure(
      BRICK_BLOCK_4_COORDS,
      context,
      'brick',
      true,
      brickImg
    ),
    ...createDecorationFigure(
      BRICK_BLOCK_5_COORDS,
      context,
      'brick',
      true,
      brickImg
    ),
    ...createDecorationFigure(
      METAL_BLOCK_1_COORDS,
      context,
      'metal',
      false,
      metalImg
    ),
    ...createDecorationFigure(
      METAL_BLOCK_2_COORDS,
      context,
      'metal',
      false,
      metalImg
    ),
    ...createDecorationFigure(
      METAL_BLOCK_3_COORDS,
      context,
      'metal',
      false,
      metalImg
    ),
    ...createDecorationFigure(
      LAKE_COORDS,
      context,
      'metal',
      false,
      undefined,
      '#0BA5EC'
    ),
  ]
}
