import { Tank } from '../objects/tank'
import { Decoration } from '../objects/decoration'
import tankImg from '../../../assets/images/tank.png'

type Config = {
  frameWidth: number
  frameHeight: number
}

export const config: Config = {
  frameWidth: 1200,
  frameHeight: 700,
}

export const tankObjects = {
  tank1: {
    object: new Tank({
      startPosition: { x: 600, y: 630 },
      direction: 'up',
      speed: 0.15,
      size: { width: 50, height: 60 },
      imageSrc: tankImg,
    }),
    type: 'player',
  },
  tank2: {
    object: new Tank({
      startPosition: { x: 100, y: 100 },
      direction: 'right',
      speed: 0.15,
      size: { width: 50, height: 60 },
      imageSrc: tankImg,
    }),
    type: 'enemy',
  },
  tank3: {
    object: new Tank({
      startPosition: { x: 900, y: 200 },
      direction: 'left',
      speed: 0.15,
      size: { width: 50, height: 60 },
      imageSrc: tankImg,
    }),
    type: 'enemy',
  },
}

export const decorationObjects = {
  decoration1: {
    object: new Decoration({
      position: { x: 100, y: 300 },
      size: { width: 350, height: 50 },
      color: '#46efe9',
    }),
  },
  decoration2: {
    object: new Decoration({
      position: { x: 750, y: 300 },
      size: { width: 350, height: 50 },
      color: '#0BA5EC',
    }),
  },
  decoration3: {
    object: new Decoration({
      position: { x: 450, y: 170 },
      size: { width: 50, height: 300 },
      color: '#46efe9',
    }),
  },
  decoration4: {
    object: new Decoration({
      position: { x: 700, y: 170 },
      size: { width: 50, height: 300 },
      color: '#0BA5EC',
    }),
  },
}
