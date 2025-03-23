import { Coordinate, Direction, KeysState, Offset } from '../types'
import { ComputerTank } from '../objects/computerTank'
import { getTankOffset } from './updateUtils'
import { config, toPixels } from '../config/gameConfig'
import { checkNotStrictCollision, getCollision } from './collisionUtils'
import { Tank } from '../objects/tank'
import tankImg from '../../../assets/images/tank.png'
import { addScorePoint } from './gameUtils'

let generationTime = 0

export function getComputerTankOffset(
  tank: ComputerTank,
  delta: number
): Offset {
  const now = performance.now()

  if (now > tank.timeBeforeChangeDirectionAI) {
    tank.timeBeforeChangeDirectionAI = now + getRandomNumber(500, 2000)
    tank.keysAI = getRandomControlKeys()
  }

  const keys = tank.keysAI ?? {
    w: false,
    s: false,
    a: false,
    d: false,
    space: false,
  }

  return getTankOffset(keys, delta, tank.speed, tank.direction)
}

export function computerShot() {
  const playerTank = config.tankObjects.find((item) => item.type === 'player')
  const computerTanks = config.tankObjects.filter(
    (item) => item.type === 'computer'
  )

  if (!playerTank || computerTanks.length === 0) {
    return
  }

  computerTanks.forEach((item) => {
    const collisionObjects = getCollision(
      playerTank,
      computerTanks,
      checkNotStrictCollision
    )

    // Если Танк уже выстрелил и пуля ещё есть, то пока он стрелять не может
    if (hasTankBullet(item)) {
      return
    }

    if (collisionObjects) {
      const newBullet = item.shot()
      config.bulletObjects.push(newBullet)
    }
  })
}

export function computerTankGeneration(context: CanvasRenderingContext2D) {
  const now = performance.now()
  const computerTankNumber = config.tankObjects.length
  const respawnCoordinate: Coordinate = {
    x: toPixels(getRandomNumber(1, 26)),
    y: toPixels(getRandomNumber(1, 13)),
  }
  const randomDirection: Direction = ['right', 'left', 'up', 'down'][
    getRandomNumber(0, 3)
  ] as Direction

  if (now > generationTime && computerTankNumber < 10) {
    const newTank = new ComputerTank({
      context,
      startPosition: respawnCoordinate,
      direction: randomDirection,
      speed: 0.15,
      size: { width: 50, height: 65 },
      imageSrc: tankImg,
      healthPoint: 100,
      scorePoint: 50,
      addScore: addScorePoint,
    })

    config.tankObjects = [...config.tankObjects, newTank]

    generationTime = now + 5000 // Добавляем следующую генерацию через 5 секунд
  }
}

function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function getRandomControlKeys(): KeysState {
  const newKeysState: KeysState = {
    w: false,
    s: false,
    a: false,
    d: false,
    space: false,
  }

  const keyNumber = getRandomNumber(0, 3)
  const randomKey = Object.keys(newKeysState)[keyNumber] as keyof KeysState
  newKeysState[randomKey] = true

  return newKeysState
}

function hasTankBullet(tank: Tank): boolean {
  const tankBullet = config.bulletObjects.find(
    (item) => item.tankId === tank.id
  )
  return !!tankBullet
}
