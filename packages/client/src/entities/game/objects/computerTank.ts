import { v4 as uuidv4 } from 'uuid'
import { Coordinate, Direction, KeysState, Size } from '../types'
import { Tank } from './tank'
import { MOVE_KEYS } from '../constants'

export type TankComputerProps = {
  context: CanvasRenderingContext2D
  startPosition: Coordinate
  direction: Direction
  speed: number
  imageSrc: string
  size: Size
  healthPoint: number
  scorePoint: number
  bulletColor?: string
  setScorePoint: (score: number) => void
}

export class ComputerTank extends Tank {
  timeBeforeChangeDirectionAI = 0
  scorePoint = 50
  keysAI: KeysState = structuredClone(MOVE_KEYS)
  setScorePoint: (score: number) => void

  constructor(props: TankComputerProps) {
    super({
      id: uuidv4(),
      context: props.context,
      startPosition: props.startPosition,
      direction: props.direction,
      speed: props.speed,
      size: props.size,
      healthPoint: props.healthPoint,
      imageSrc: props.imageSrc,
      bulletColor: props?.bulletColor,
    })

    this.type = 'computer'
    this.scorePoint = props.scorePoint
    this.setScorePoint = props.setScorePoint
  }

  public updateScore() {
    this.setScorePoint(this.scorePoint)
  }
}
