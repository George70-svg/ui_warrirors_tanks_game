import { Tank } from '../objects/tank'
import { Decoration } from '../objects/decoration'
import { Bullet } from '../objects/bullet'
import tankImg from '../../../assets/images/tank.png'
import { ComputerTank } from '../objects/computerTank'
import { addScorePoint } from '../model/gameUtils'
import { Coordinate } from '../types'

type Config = {
  frameWidth: number
  frameHeight: number
  score: number
  computerRespawnPosition: Coordinate[]
  tankObjects: (Tank | ComputerTank)[]
  decorationObjects: Decoration[]
  bulletObjects: Bullet[]
}

const cellSize = 50 // Можно будет сделать значение относительным от размера экрана

export function toPixels(size: number): number {
  return size * cellSize
}

export const config: Config = {
  frameWidth: toPixels(27),
  frameHeight: toPixels(14),
  score: 0,
  computerRespawnPosition: [
    { x: toPixels(2), y: toPixels(2) },
    { x: toPixels(25), y: toPixels(2) },
    { x: toPixels(2), y: toPixels(12) },
    { x: toPixels(25), y: toPixels(12) },
  ],
  tankObjects: [],
  decorationObjects: [],
  bulletObjects: [],
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
      scorePoint: 50,
      addScore: addScorePoint,
    }),
  ]
}

export function initializeDecorationObjects(context: CanvasRenderingContext2D) {
  config.decorationObjects = [
    new Decoration({
      id: crypto.randomUUID(),
      context,
      position: { x: toPixels(3), y: toPixels(7) },
      size: { width: toPixels(6), height: toPixels(1) },
      color: '#46efe9',
    }),
    new Decoration({
      id: crypto.randomUUID(),
      context,
      position: { x: toPixels(9), y: toPixels(4) },
      size: { width: toPixels(1), height: toPixels(7) },
      color: '#46efe9',
    }),
    new Decoration({
      id: crypto.randomUUID(),
      context,
      position: { x: toPixels(18), y: toPixels(7) },
      size: { width: toPixels(6), height: toPixels(1) },
      color: '#0BA5EC',
    }),
    new Decoration({
      id: crypto.randomUUID(),
      context,
      position: { x: toPixels(17), y: toPixels(4) },
      size: { width: toPixels(1), height: toPixels(7) },
      color: '#0BA5EC',
    }),
  ]
}
