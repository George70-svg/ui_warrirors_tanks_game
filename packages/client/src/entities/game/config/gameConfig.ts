import { v4 as makeUUID } from 'uuid'
import { Tank } from '../objects/tank'
import { Decoration } from '../objects/decoration'
import { Bullet } from '../objects/bullet'
import tankImg from '../../../assets/images/tank.png'
import { ComputerTank } from '../objects/computerTank'

type Config = {
  frameWidth: number
  frameHeight: number
  tankObjects: (Tank | ComputerTank)[]
  decorationObjects: Decoration[]
  bulletObjects: Bullet[]
}

const cellSize = 50 // Можно будет сделать значение относительным от размера экрана

function toPixels(size: number): number {
  return size * cellSize
}

export const config: Config = {
  frameWidth: toPixels(25),
  frameHeight: toPixels(12),
  tankObjects: [],
  decorationObjects: [],
  bulletObjects: [],
}

export function initializeTankObjects(context: CanvasRenderingContext2D) {
  config.tankObjects = [
    new Tank({
      id: makeUUID(),
      context,
      startPosition: { x: toPixels(12), y: toPixels(10) },
      direction: 'up',
      speed: 0.15,
      size: { width: 50, height: 64 },
      imageSrc: tankImg,
      healthPoint: 100,
    }),
    new ComputerTank({
      context,
      startPosition: { x: toPixels(2), y: toPixels(2) },
      direction: 'right',
      speed: 0.15,
      size: { width: 50, height: 65 },
      imageSrc: tankImg,
      healthPoint: 100,
    }),
    new ComputerTank({
      context,
      startPosition: { x: toPixels(20), y: toPixels(4) },
      direction: 'left',
      speed: 0.15,
      size: { width: 50, height: 65 },
      imageSrc: tankImg,
      healthPoint: 100,
    }),
    new ComputerTank({
      context,
      startPosition: { x: toPixels(5), y: toPixels(9) },
      direction: 'left',
      speed: 0.15,
      size: { width: 50, height: 65 },
      imageSrc: tankImg,
      healthPoint: 100,
    }),
    new ComputerTank({
      context,
      startPosition: { x: toPixels(20), y: toPixels(9) },
      direction: 'left',
      speed: 0.15,
      size: { width: 50, height: 65 },
      imageSrc: tankImg,
      healthPoint: 100,
    }),
  ]
}

export function initializeDecorationObjects(context: CanvasRenderingContext2D) {
  config.decorationObjects = [
    new Decoration({
      id: makeUUID(),
      context,
      position: { x: toPixels(3), y: toPixels(6) },
      size: { width: toPixels(6), height: toPixels(1) },
      color: '#46efe9',
    }),
    new Decoration({
      id: makeUUID(),
      context,
      position: { x: toPixels(9), y: toPixels(3) },
      size: { width: toPixels(1), height: toPixels(7) },
      color: '#46efe9',
    }),
    new Decoration({
      id: makeUUID(),
      context,
      position: { x: toPixels(16), y: toPixels(6) },
      size: { width: toPixels(6), height: toPixels(1) },
      color: '#0BA5EC',
    }),
    new Decoration({
      id: makeUUID(),
      context,
      position: { x: toPixels(15), y: toPixels(3) },
      size: { width: toPixels(1), height: toPixels(7) },
      color: '#0BA5EC',
    }),
  ]
}
