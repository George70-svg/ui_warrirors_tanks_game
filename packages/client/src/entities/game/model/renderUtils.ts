import { config } from '../config/gameConfig'

export function renderAllObjects(ctx: CanvasRenderingContext2D | null) {
  if (!ctx) return

  const objects = [
    ...config.bulletObjects,
    ...config.tankObjects,
    ...config.decorationObjects,
  ]

  objects.forEach((item) => {
    item.render()
  })
}
