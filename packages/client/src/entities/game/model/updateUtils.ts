import { Direction, KeysState, Offset } from '../types'
import { tankObjects } from '../config/gameConfig'
import { Tank } from '../objects/tank'
import { checkFrameCollision, getCollision } from './collisionUtils'

export function updateAllTanks(keysState: KeysState, delta: number) {
  Object.values(tankObjects).forEach((item) => {
    let offset

    if (item.type === 'player') {
      offset = getOffset(
        keysState,
        delta,
        item.object.speed,
        item.object.direction
      )
    } else {
      //Вражеские танки пока стоят на месте
      offset = { coordinate: { x: 0, y: 0 }, direction: item.object.direction }
    }

    updateTank(item.object, offset)
  })
}

function updateTank(tank: Tank, offset: Offset | null) {
  if (!offset) return

  tank.updateCoordinate({ x: offset.coordinate.x, y: offset.coordinate.y }) // Обновляем текущую позицию

  if (getCollision(tank) || checkFrameCollision(tank)) {
    tank.updateCoordinate({ x: -offset.coordinate.x, y: -offset.coordinate.y })
  } else {
    tank.setDirection(offset.direction) // Обновляем текущее направление
  }
}

function getOffset(
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
