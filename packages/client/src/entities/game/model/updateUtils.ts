import { config } from '../config/gameConfig'
import { Tank } from '../objects/tank'
import { Direction, KeysState, Offset } from '../types'
import { checkFrameCollision, getCollision } from './collisionUtils'
import { Bullet } from '../objects/bullet'

export function updateAllTanks(keysState: KeysState, delta: number) {
  config.tankObjects.forEach((item) => {
    let offset

    if (item.type === 'player') {
      offset = getTankOffset(keysState, delta, item.speed, item.direction)
    } else {
      // Вражеские танки пока стоят на месте
      offset = { coordinate: { x: 0, y: 0 }, direction: item.direction }
    }

    updateTank(item, offset)
  })
}

function updateTank(tank: Tank, offset: Offset | null) {
  if (!offset) return

  tank.updateCoordinate({ x: offset.coordinate.x, y: offset.coordinate.y }) // Обновляем текущую позицию
  const objectsForCollisionCalculation = [
    ...config.tankObjects.filter((item) => item.id !== tank.id),
    ...config.decorationObjects,
  ]

  if (
    getCollision(tank, objectsForCollisionCalculation) ||
    checkFrameCollision(tank)
  ) {
    tank.updateCoordinate({ x: -offset.coordinate.x, y: -offset.coordinate.y })
  } else {
    tank.setDirection(offset.direction) // Обновляем текущее направление
  }

  // Проверка столкновений с пулями
  const enemyBullets = [
    ...config.bulletObjects.filter((item) => item.tankId !== tank.id),
  ]

  const collisionObjects = getCollision(tank, enemyBullets)

  if (collisionObjects) {
    tank.takeDamage()
    collisionObjects[1].setMarkForDelete(true) // Отмечаем пулю для удаления

    if (tank.healthPoint <= 0) {
      collisionObjects[0].setMarkForDelete(true) // Отмечаем танк для удаления
    }
  }
}

export function updateAllBullets(delta: number) {
  config.bulletObjects.forEach((bullet) => {
    const offset = getBulletOffset(bullet, delta)
    updateBullet(bullet, offset)
  })
}

function updateBullet(bullet: Bullet, offset: Offset) {
  bullet.updateCoordinate(offset.coordinate)
  const objectsForCollisionCalculation = [...config.decorationObjects]

  const collisionObjects = getCollision(bullet, objectsForCollisionCalculation)

  if (collisionObjects || checkFrameCollision(bullet)) {
    bullet.setMarkForDelete(true)
  }
}

export function playerShotHandler() {
  const playerTank = config.tankObjects.find((item) => item.type === 'player')

  if (playerTank) {
    const newBullet = playerTank.shot()
    config.bulletObjects.push(newBullet)
  }
}

export function deleteMarkedObjects() {
  config.tankObjects = config.tankObjects.filter((item) => !item.markForDelete)
  config.bulletObjects = config.bulletObjects.filter(
    (item) => !item.markForDelete
  )
}

function getTankOffset(
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
