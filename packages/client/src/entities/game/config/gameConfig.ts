import { Tank } from '../objects/tank'
import { Decoration } from '../objects/decoration'
import tankImg from '../../../assets/images/tank.png'

type Config = {
  frameWidth: number
  frameHeight: number
}

type TankObjects = Record<string, { object: Tank; type: 'player' | 'computer' }>
type DecorationObjects = Record<string, { object: Decoration }>

export const config: Config = {
  frameWidth: 1200,
  frameHeight: 700,
}

export let tankObjects: TankObjects = {}
export let decorationObjects: DecorationObjects = {}

export function initializeTankObjects(context: CanvasRenderingContext2D) {
  tankObjects = {
    tank1: {
      object: new Tank({
        context,
        startPosition: { x: 600, y: 630 },
        direction: 'up',
        speed: 0.15,
        size: { width: 47, height: 60 },
        imageSrc: tankImg,
      }),
      type: 'player',
    },
    tank2: {
      object: new Tank({
        context,
        startPosition: { x: 100, y: 100 },
        direction: 'right',
        speed: 0.15,
        size: { width: 47, height: 60 },
        imageSrc: tankImg,
      }),
      type: 'computer',
    },
    tank3: {
      object: new Tank({
        context,
        startPosition: { x: 900, y: 200 },
        direction: 'left',
        speed: 0.15,
        size: { width: 47, height: 60 },
        imageSrc: tankImg,
      }),
      type: 'computer',
    },
  }
}

export function initializeDecorationObjects(context: CanvasRenderingContext2D) {
  decorationObjects = {
    decoration1: {
      object: new Decoration({
        context,
        position: { x: 100, y: 300 },
        size: { width: 350, height: 50 },
        color: '#46efe9',
      }),
    },
    decoration2: {
      object: new Decoration({
        context,
        position: { x: 750, y: 300 },
        size: { width: 350, height: 50 },
        color: '#0BA5EC',
      }),
    },
    decoration3: {
      object: new Decoration({
        context,
        position: { x: 450, y: 170 },
        size: { width: 50, height: 300 },
        color: '#46efe9',
      }),
    },
    decoration4: {
      object: new Decoration({
        context,
        position: { x: 700, y: 170 },
        size: { width: 50, height: 300 },
        color: '#0BA5EC',
      }),
    },
  }
}
