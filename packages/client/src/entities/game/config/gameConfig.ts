import { Tank } from '../objects/tank'
import { Decoration } from '../objects/decoration'
import { Bullet } from '../objects/bullet'
import tankImg from '../../../../public/images/tank.png'
import { ComputerTank } from '../objects/computerTank'
import { getDecorations } from '../constants/decorations'

export const CELL_SIZE = 50

type Config = {
  frameWidth: number
  frameHeight: number
  tankObjects: (Tank | ComputerTank)[]
  decorationObjects: Decoration[]
  bulletObjects: Bullet[]
  score: number
}

export function toPixels(size: number): number {
  return size * CELL_SIZE
}

export const config: Config = {
  frameWidth: toPixels(27),
  frameHeight: toPixels(14),
  tankObjects: [],
  decorationObjects: [],
  bulletObjects: [],
  score: 0,
}

export function initializeTankObjects(context: CanvasRenderingContext2D) {
  config.tankObjects = [
    new Tank({
      id: crypto.randomUUID(),
      context,
      startPosition: { x: toPixels(13), y: toPixels(12) },
      direction: 'up',
      speed: 0.16,
      size: { width: 50, height: 64 },
      imageSrc: tankImg,
      healthPoint: 150,
      bulletColor: '#00e413',
    }),
  ]
}

export function initializeDecorationObjects(context: CanvasRenderingContext2D) {
  config.decorationObjects = getDecorations(context)
}
