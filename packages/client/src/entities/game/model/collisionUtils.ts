import { ShapeObject } from '../types'
import { config, decorationObjects, tankObjects } from '../config/gameConfig'

export function getCollision(shapeObject: ShapeObject): boolean {
  let isCollision = false

  for (const item of [
    ...Object.values(decorationObjects),
    ...Object.values(tankObjects),
  ]) {
    const decorationShape: ShapeObject = {
      coordinate: { x: item.object.coordinate.x, y: item.object.coordinate.y },
      size: { width: item.object.size.width, height: item.object.size.height },
    }

    isCollision = checkCollision(shapeObject, decorationShape)

    if (isCollision) {
      return isCollision
    }
  }

  return isCollision
}

export function checkCollision(shape1: ShapeObject, shape2: ShapeObject) {
  const shape1Coordinates = getShapeCoordinates(shape1)
  const shape2Coordinates = getShapeCoordinates(shape2)

  // Проверяю есть ли горизантольное пересечение
  const hasHorizontalCollision = isIntervalsIntersect(
    [shape1Coordinates.xMin, shape1Coordinates.xMax],
    [shape2Coordinates.xMin, shape2Coordinates.xMax]
  )

  // Проверяю есть ли вертикальное пересечение
  const hasVerticalCollision = isIntervalsIntersect(
    [shape1Coordinates.yMin, shape1Coordinates.yMax],
    [shape2Coordinates.yMin, shape2Coordinates.yMax]
  )

  // Если есть пересечения по обоим осям, то фигуры пересекаются
  return hasHorizontalCollision && hasVerticalCollision
}

export function checkFrameCollision(shape: ShapeObject) {
  const frameWidth = config.frameWidth
  const frameHeight = config.frameHeight

  const shapeCoordinates = getShapeCoordinates(shape)

  const hasOutOfHorizontalRange =
    shapeCoordinates.xMin <= 0 || shapeCoordinates.xMax >= frameWidth
  const hasOutOfVerticalRange =
    shapeCoordinates.yMin <= 0 || shapeCoordinates.yMax >= frameHeight

  return hasOutOfHorizontalRange || hasOutOfVerticalRange
}

function getShapeCoordinates(shape: ShapeObject) {
  return {
    xMin: shape.coordinate.x,
    xMax: shape.coordinate.x + shape.size.width,
    yMin: shape.coordinate.y,
    yMax: shape.coordinate.y + shape.size.height,
  }
}

const isIntervalsIntersect = (
  range1: [number, number],
  range2: [number, number]
): boolean => {
  // Проверяю, что один интервал пересекается с другим
  return (
    (range1[0] > range2[0] && range1[0] < range2[1]) ||
    (range1[1] > range2[0] && range1[1] < range2[1])
  )
}
