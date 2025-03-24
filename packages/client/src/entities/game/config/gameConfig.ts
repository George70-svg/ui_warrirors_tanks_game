import { Tank } from '../objects/tank'
import { Decoration, DecorationProps } from '../objects/decoration'
import { Bullet } from '../objects/bullet'
import tankImg from '../../../assets/images/tank.png'
import computerTankImg from '../../../assets/images/computer-tank.png'
import brickImg from '../../../assets/images/brick.png'
import metalImg from '../../../assets/images/metal.png'
import { ComputerTank } from '../objects/computerTank'
import {
  FIGURE1_COORDS,
  FIGURE2_COORDS,
  FIGURE3_COORDS,
  FIGURE4_COORDS,
} from '../constants/decorations'
import { Coordinate } from '../types'

export const CELL_SIZE = 50

type Config = {
  frameWidth: number
  frameHeight: number
  tankObjects: (Tank | ComputerTank)[]
  decorationObjects: Decoration[]
  bulletObjects: Bullet[]
}

export function toPixels(size: number): number {
  return size * CELL_SIZE
}
export type TConfigObjects = Pick<
  Config,
  'tankObjects' | 'bulletObjects' | 'decorationObjects'
>

export const config: Config = {
  frameWidth: toPixels(27),
  frameHeight: toPixels(14),
  tankObjects: [],
  decorationObjects: [],
  bulletObjects: [],
}

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

export function initializeTankObjects(context: CanvasRenderingContext2D) {
  config.tankObjects = [
    new Tank({
      id: crypto.randomUUID(),
      context,
      startPosition: { x: toPixels(13), y: toPixels(7) },
      direction: 'up',
      speed: 0.15,
      size: { width: 50, height: 64 },
      imageSrc: tankImg,
      healthPoint: 150,
    }),
  ]
}

export function initializeDecorationObjects(context: CanvasRenderingContext2D) {
  const hasDeletable = true
  const figure1 = createDecorationFigure(
    FIGURE1_COORDS,
    context,
    'brick',
    hasDeletable,
    brickImg
  )
  const figure2 = createDecorationFigure(
    FIGURE2_COORDS,
    context,
    'brick',
    hasDeletable,
    brickImg
  )
  const figure3 = createDecorationFigure(
    FIGURE3_COORDS,
    context,
    'metal',
    !hasDeletable,
    metalImg
  )
  const figure4 = createDecorationFigure(
    FIGURE4_COORDS,
    context,
    'metal',
    !hasDeletable,
    metalImg
  )

  config.decorationObjects = [
    ...figure1,
    ...figure2,
    ...figure3,
    ...figure4,
    new Decoration({
      id: crypto.randomUUID(),
      context,
      position: { x: toPixels(3), y: toPixels(3) },
      size: { width: toPixels(1), height: toPixels(1) },
      color: '#46efe9',
      hasDeletable: false,
    }),
    new Decoration({
      id: crypto.randomUUID(),
      context,
      position: { x: toPixels(10), y: toPixels(5) },
      size: { width: toPixels(1), height: toPixels(1) },
      color: '#0BA5EC',
      hasDeletable: false,
    }),
    new Decoration({
      id: crypto.randomUUID(),
      context,
      position: { x: toPixels(14), y: toPixels(8) },
      size: { width: toPixels(1), height: toPixels(1) },
      color: '#46efe9',
      hasDeletable: false,
    }),
    new Decoration({
      id: crypto.randomUUID(),
      context,
      position: { x: toPixels(20), y: toPixels(10) },
      size: { width: toPixels(1), height: toPixels(1) },
      color: '#0BA5EC',
      hasDeletable: false,
    }),
  ]
}
