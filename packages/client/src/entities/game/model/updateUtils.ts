import { config } from '../config/gameConfig'
import { Tank } from '../objects/tank'
import { Direction, KeysState, Offset } from '../types'
import {
  checkFrameCollision,
  checkStrictCollision,
  getCollision,
} from './collisionUtils'
import { Bullet } from '../objects/bullet'
import { getComputerTankOffset } from './ai'
import { ComputerTank } from '../objects/computerTank'
import { Decoration } from '../objects/decoration'
import { Shape } from '../objects/shape'

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

  handleBulletCollisionWithTank(tank)
}

// Обновление движения пули с учётом коллизий
function updateBullet(bullet: Bullet, offset: Offset) {
  const playerTank = config.tankObjects.find(
    (item) => item.type === 'player'
  ) as Tank
  const objectsForCollisionCalculation = [...config.decorationObjects]

  bullet.updateCoordinate(offset.coordinate)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, shapeObject] = getCollision(
    bullet,
    objectsForCollisionCalculation,
    checkStrictCollision
  ) || [null, null]

  if (shapeObject || checkFrameCollision(bullet)) {
    bullet.setMarkForDelete(true)
  }

  // Если пуля игрока попадает в декорацию
  if (
    shapeObject &&
    (shapeObject as Decoration).hasDeletable &&
    bullet.tankId === playerTank.id
  ) {
    shapeObject.setMarkForDelete(true)
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
function handleBulletCollisionWithTank(tank: Tank) {
  const enemyBullets = [
    ...config.bulletObjects.filter((item) => item.tankId !== tank.id),
  ]

  const [tankObject, bulletObject] = getCollision(
    tank,
    enemyBullets,
    checkStrictCollision
  ) || [null, null]

  if (tankObject && bulletObject) {
    const currentBullet = enemyBullets.find(
      (item) => item.id === bulletObject.id
    )

    if (currentBullet) {
      handleDamage(tank, currentBullet)
    }

    bulletObject.setMarkForDelete(true) // Отмечаем пулю для удаления

    if (tank.healthPoint <= 0) {
      tankObject.setMarkForDelete(true) // Отмечаем танк для удаления

      if (tank instanceof ComputerTank) {
        tank.updateScore()
      }
    }
  }
}

// Обработка получения урона
function handleDamage(tank: Tank, bullet: Bullet): void {
  // Если это танк игрока, то он получает урон от всех пуль, кроме своих
  if (tank.type === 'player') {
    if (tank.id !== bullet.tankId) {
      tank.takeDamage()
    }
  } else if (tank.type === 'computer') {
    // Если танк компьютера, то он получает урон только от выстрелов игрока
    const playerTank = config.tankObjects.find((tank) => tank.type === 'player')

    if (playerTank && playerTank.id === bullet.tankId) {
      tank.takeDamage()
    }
  }
}

// Обработка выстрела танка игрока (клик мышью)
export function playerShotHandler() {
  const playerTank = config.tankObjects.find((item) => item.type === 'player')

  // Стреляем только если есть танк игрока и нет его пуль, находящихся в движении
  if (playerTank && !hasTankBullet(playerTank)) {
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
  config.decorationObjects = config.decorationObjects.filter(
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

export function hasTankBullet(tank: Tank): boolean {
  const tankBullet = config.bulletObjects.find(
    (item) => item.tankId === tank.id
  )
  return !!tankBullet
}
