import { decorationObjects, tankObjects } from '../config/gameConfig'
import { Tank } from '../objects/tank'
import { Decoration } from '../objects/decoration'

export function renderAllTanks(ctx: CanvasRenderingContext2D | null) {
  if (!ctx) return

  Object.values(tankObjects).forEach((item) => {
    renderTank(ctx, item.object)
  })
}

function renderTank(ctx: CanvasRenderingContext2D, tank: Tank) {
  ctx.save() // Сохраняем текущее состояние Canvas
  ctx.translate(
    tank.coordinate.x + tank.size.width / 2,
    tank.coordinate.y + tank.size.height / 2
  ) // Настраиваем точку вращения (центр объекта)
  ctx.rotate(tank.getRotateAngle()) // Поворачиваем систему координат
  ctx.drawImage(
    tank.image,
    -tank.size.width / 2,
    -tank.size.height / 2,
    tank.size.width,
    tank.size.height
  ) // Рисуем танк
  ctx.restore() // Восстанавливаем состояние (отменяем translate, rotate и т.д.)
}

export function renderAllDecoration(ctx: CanvasRenderingContext2D | null) {
  if (!ctx) return

  Object.values(decorationObjects).forEach((item) => {
    renderDecoration(ctx, item.object)
  })
}

export function renderDecoration(
  ctx: CanvasRenderingContext2D,
  decoration: Decoration
) {
  ctx.fillStyle = decoration.color
  ctx.fillRect(
    decoration.coordinate.x,
    decoration.coordinate.y,
    decoration.size.width,
    decoration.size.height
  )
}
