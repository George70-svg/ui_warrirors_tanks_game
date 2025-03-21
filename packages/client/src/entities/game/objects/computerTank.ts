import { MOVE_KEYS } from '../constants'
import { Coordinate, Direction, KeysState, Size } from '../types'
import { Tank } from './tank'

export type TankComputerProps = {
  context: CanvasRenderingContext2D
  startPosition: Coordinate
  direction: Direction
  speed: number
  imageSrc: string
  size: Size
  healthPoint: number
}

export class ComputerTank extends Tank {
  timeBeforeChangeDirectionAI = 0
  keysAI: KeysState = structuredClone(MOVE_KEYS)

  constructor(props: TankComputerProps) {
    super({
      id: crypto.randomUUID(),
      context: props.context,
      startPosition: props.startPosition,
      direction: props.direction,
      speed: props.speed,
      size: props.size,
      healthPoint: props.healthPoint,
      imageSrc: props.imageSrc,
    })

    this.type = 'computer'
  }
}
