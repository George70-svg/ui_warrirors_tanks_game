import { config } from '../config/gameConfig'
import { Tank } from '../objects/tank'
import { Direction, KeysState, Offset } from '../types'
import {
  checkFrameCollision,
  checkStrictCollision,
  getCollision,
} from './collisionUtils'
import { Bullet } from '../objects/bullet'
import { Shape } from '../objects/shape'
import { getComputerTankOffset } from './ai'
import { ComputerTank } from '../objects/computerTank'

export function updateAllTanks(keysState: KeysState, delta: number) {
  config.tankObjects.forEach((item) => {
    let offset

    // Обработка движения танка игрока
    if (item.type === 'player') {
      offset = getTankOffset(keysState, delta, item.speed, item.direction)
    }

    // Обработка движения компьютерных танков
    if (item instanceof ComputerTank) {
      offset = getComputerTankOffset(item, delta)
    }

    if (offset) {
      updateTank(item, offset)
    }
  })
}

export function updateAllBullets(delta: number) {
  config.bulletObjects.forEach((bullet) => {
    const offset = getBulletOffset(bullet, delta)
    updateBullet(bullet, offset)
  })
}

// Обновление движения танка с учётом коллизий
function updateTank(tank: Tank | ComputerTank, offset: Offset | null) {
  if (!offset) return

  tank.updateCoordinate({ x: offset.coordinate.x, y: offset.coordinate.y }) // Обновляем текущую позицию

  if (checkEnvironmentCollision(tank)) {
    tank.updateCoordinate({ x: -offset.coordinate.x, y: -offset.coordinate.y })
  } else {
    tank.setDirection(offset.direction) // Обновляем текущее направление
  }

  handleBulletCollision(tank)
}

// Обновление движения пули с учётом коллизий
function updateBullet(bullet: Bullet, offset: Offset) {
  bullet.updateCoordinate(offset.coordinate)
  const objectsForCollisionCalculation = [...config.decorationObjects]

  const collisionObjects = getCollision(
    bullet,
    objectsForCollisionCalculation,
    checkStrictCollision
  )

  if (collisionObjects || checkFrameCollision(bullet)) {
    bullet.setMarkForDelete(true)
  }
}

// Метод для проверки коллизий с рамками карты, танками и декорациями
function checkEnvironmentCollision(shape: Shape) {
  const objectsForCollisionCalculation = [
    ...config.tankObjects.filter((obj) => obj.id !== shape.id),
    ...config.decorationObjects,
  ]

  const hasObjectsCollision = !!getCollision(
    shape,
    objectsForCollisionCalculation,
    checkStrictCollision
  )
  const hasFrameCollision = checkFrameCollision(shape)

  return hasObjectsCollision || hasFrameCollision
}

// Обработка столкновений танков и пуль
function handleBulletCollision(tank: Tank) {
  const enemyBullets = [
    ...config.bulletObjects.filter((item) => item.tankId !== tank.id),
  ]

  const collisionObjects = getCollision(
    tank,
    enemyBullets,
    checkStrictCollision
  )

  if (collisionObjects) {
    tank.takeDamage()
    collisionObjects[1].setMarkForDelete(true) // Отмечаем пулю для удаления

    if (tank.healthPoint <= 0) {
      collisionObjects[0].setMarkForDelete(true) // Отмечаем танк для удаления
    }
  }
}

// Обработка выстрела танка игрока (клик мышью)
export function playerShotHandler() {
  const playerTank = config.tankObjects.find((item) => item.type === 'player')

  if (playerTank) {
    const newBullet = playerTank.shot()
    config.bulletObjects.push(newBullet)
  }
}

// Общий метод удаления объектов
export function deleteMarkedObjects() {
  config.tankObjects = config.tankObjects.filter((item) => !item.markForDelete)
  config.bulletObjects = config.bulletObjects.filter(
    (item) => !item.markForDelete
  )
}

export function getTankOffset(
  keys: KeysState,
  delta: number,
  speed: number,
  startDirection: Direction
): Offset {
  let newOffset: Offset = {
    coordinate: { x: 0, y: 0 },
    direction: startDirection,
  }

  const distance = delta * speed

  if (keys.w) {
    newOffset = { coordinate: { x: 0, y: -distance }, direction: 'up' }
  } else if (keys.s) {
    newOffset = { coordinate: { x: 0, y: distance }, direction: 'down' }
  } else if (keys.a) {
    newOffset = { coordinate: { x: -distance, y: 0 }, direction: 'left' }
  } else if (keys.d) {
    newOffset = { coordinate: { x: distance, y: 0 }, direction: 'right' }
  }

  return newOffset
}

function getBulletOffset(bullet: Bullet, delta: number) {
  let newOffset: Offset = {
    coordinate: { x: 0, y: 0 },
    direction: bullet.direction,
  }

  const distance = delta * bullet.speed

  if (bullet.direction === 'up') {
    newOffset = { coordinate: { x: 0, y: -distance }, direction: 'up' }
  } else if (bullet.direction === 'down') {
    newOffset = { coordinate: { x: 0, y: distance }, direction: 'down' }
  } else if (bullet.direction === 'left') {
    newOffset = { coordinate: { x: -distance, y: 0 }, direction: 'left' }
  } else if (bullet.direction === 'right') {
    newOffset = { coordinate: { x: distance, y: 0 }, direction: 'right' }
  }

  return newOffset
}
