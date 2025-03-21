import { KeysState, Offset } from '../types'
import { ComputerTank } from '../objects/computerTank'
import { getTankOffset } from './updateUtils'
import { config } from '../config/gameConfig'
import { checkNotStrictCollision, getCollision } from './collisionUtils'
import { Tank } from '../objects/tank'
import { MOVE_KEYS } from '../../../shared/config/constants'

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
