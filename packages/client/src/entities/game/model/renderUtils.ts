import { decorationObjects, tankObjects } from '../config/gameConfig'

export function renderAllObjects(ctx: CanvasRenderingContext2D | null) {
  if (!ctx) return

  Object.values(decorationObjects).forEach((item) => {
    item.object.render()
  })

  Object.values(tankObjects).forEach((item) => {
    item.object.render()
  })
}
