import { KeysState, Offset } from '../types'
import { ComputerTank } from '../objects/computerTank'
import { getTankOffset } from './updateUtils'
import { config, toPixels } from '../config/gameConfig'
import { checkNotStrictCollision, getCollision } from './collisionUtils'
import { Tank } from '../objects/tank'
import tankImg from '../../../assets/images/tank.png'
import { MOVE_KEYS } from '../constants'

let generationTime = 0

// Логика движения противников
export function getComputerTankOffset(
  tank: ComputerTank,
  delta: number
): Offset {
  const now = performance.now()

  if (now > tank.timeBeforeChangeDirectionAI) {
    tank.timeBeforeChangeDirectionAI = now + getRandomNumber(500, 2000)
    tank.keysAI = getRandomControlKeys()
  }

  const keys = tank.keysAI

  return getTankOffset(keys, delta, tank.speed, tank.direction)
}

// Логика стрельбы противников
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
  // const respawnCoordinate: Coordinate = [...computerRespawnPosition][(getRandomNumber(0, 1))]
  /*const randomDirection: Direction = ['right', 'left', 'up', 'down'][
    getRandomNumber(0, 3)
  ] as Direction*/

  if (now > generationTime && computerTankNumber < 10) {
    const newTank = new ComputerTank({
      context,
      startPosition:
        Math.floor(Math.random() * 2) > 0
          ? { x: toPixels(4), y: toPixels(4) }
          : { x: toPixels(24), y: toPixels(4) },
      direction: 'up',
      speed: 0.15,
      size: { width: 50, height: 65 },
      imageSrc: tankImg,
      healthPoint: 100,
    })

    config.tankObjects = [...config.tankObjects, newTank]

    generationTime = now + 5000 // Добавляем следующую генерацию через 5 секунд
  }
}

function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function getRandomControlKeys(): KeysState {
  const newKeysState: KeysState = structuredClone(MOVE_KEYS)

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
