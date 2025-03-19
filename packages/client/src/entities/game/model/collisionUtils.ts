import { ShapeObject } from '../types'
import { config } from '../config/gameConfig'
import { Shape } from '../objects/shape'

type CollisionFbType = (shape1: ShapeObject, shape2: ShapeObject) => boolean

export function getCollision(
  shapeObject: Shape,
  objectsForCollisionCalculation: Shape[],
  collisionFn: CollisionFbType
): [Shape, Shape] | null {
  let isCollision = false

  const targetShape = {
    coordinate: { x: shapeObject.coordinate.x, y: shapeObject.coordinate.y },
    size: { width: shapeObject.size.width, height: shapeObject.size.height },
  }

  for (const item of [...objectsForCollisionCalculation]) {
    const decorationShape: ShapeObject = {
      coordinate: { x: item.coordinate.x, y: item.coordinate.y },
      size: { width: item.size.width, height: item.size.height },
    }

    isCollision = collisionFn(targetShape, decorationShape)

    if (isCollision) {
      return [shapeObject, item]
    }
  }

  return null
}

export function checkStrictCollision(
  shape1: ShapeObject,
  shape2: ShapeObject
): boolean {
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

export function checkNotStrictCollision(
  shape1: ShapeObject,
  shape2: ShapeObject
): boolean {
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

  // Если есть пересечения по одной из осей
  return hasHorizontalCollision || hasVerticalCollision
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
  const [x1min, x1max] = range1
  const [x2min, x2max] = range2

  // Проверяю, что один интервал пересекается с другим
  return (
    // (range1[0] > range2[0] && range1[0] < range2[1]) || (range1[1] > range2[0] && range1[1] < range2[1]) // version 1
    Math.max(x1min, x2min) < Math.min(x1max, x2max) // version 2
  )
}
