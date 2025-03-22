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
  scorePoint: number
  addScore: (score: number) => void
}

export class ComputerTank extends Tank {
  timeBeforeChangeDirectionAI = 0
  scorePoint = 50
  keysAI?: KeysState
  addScore: (score: number) => void

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
      scorePoint: props.scorePoint,
      addScore: props.addScore,
    })

    this.type = 'computer'
    this.scorePoint = props.scorePoint
    this.addScore = props.addScore
  }
}
