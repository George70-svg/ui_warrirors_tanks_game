import { v4 as makeUUID } from 'uuid'
import { Tank } from '../objects/tank'
import { Decoration } from '../objects/decoration'
import { Bullet } from '../objects/bullet'
import tankImg from '../../../assets/images/tank.png'

export type TankObject = { object: Tank; type: 'player' | 'computer' }
export type DecorationObject = { object: Decoration }
export type BulletObject = { object: Bullet; tankId: string }

type Config = {
  frameWidth: number
  frameHeight: number
  tankObjects: TankObject[]
  decorationObjects: DecorationObject[]
  bulletObjects: BulletObject[]
}

const cellSize = 50

export function toPixels(size: number): number {
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
    {
      object: new Tank({
        id: makeUUID(),
        context,
        startPosition: { x: toPixels(12), y: toPixels(10) },
        direction: 'up',
        speed: 0.15,
        size: { width: 50, height: 64 },
        imageSrc: tankImg,
      }),
      type: 'player',
    },
    {
      object: new Tank({
        id: makeUUID(),
        context,
        startPosition: { x: toPixels(2), y: toPixels(2) },
        direction: 'right',
        speed: 0.15,
        size: { width: 50, height: 65 },
        imageSrc: tankImg,
      }),
      type: 'computer',
    },
    {
      object: new Tank({
        id: makeUUID(),
        context,
        startPosition: { x: toPixels(20), y: toPixels(4) },
        direction: 'left',
        speed: 0.15,
        size: { width: 50, height: 65 },
        imageSrc: tankImg,
      }),
      type: 'computer',
    },
  ]
}

export function initializeDecorationObjects(context: CanvasRenderingContext2D) {
  config.decorationObjects = [
    {
      object: new Decoration({
        id: makeUUID(),
        context,
        position: { x: toPixels(2), y: toPixels(6) },
        size: { width: toPixels(7), height: toPixels(1) },
        color: '#46efe9',
      }),
    },
    {
      object: new Decoration({
        id: makeUUID(),
        context,
        position: { x: toPixels(9), y: toPixels(3) },
        size: { width: toPixels(1), height: toPixels(7) },
        color: '#46efe9',
      }),
    },
    {
      object: new Decoration({
        id: makeUUID(),
        context,
        position: { x: toPixels(16), y: toPixels(6) },
        size: { width: toPixels(7), height: toPixels(1) },
        color: '#0BA5EC',
      }),
    },
    {
      object: new Decoration({
        id: makeUUID(),
        context,
        position: { x: toPixels(15), y: toPixels(3) },
        size: { width: toPixels(1), height: toPixels(7) },
        color: '#0BA5EC',
      }),
    },
    {
      object: new Decoration({
        id: makeUUID(),
        context,
        position: { x: toPixels(10), y: toPixels(0.5) },
        size: { width: toPixels(5), height: toPixels(0.5) },
        color: '#0BA5EC',
      }),
    },
  ]
}
