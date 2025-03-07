import { updateAllTanks } from './model/updateUtils'
import { config } from './config/gameConfig'
import { renderAllDecoration, renderAllTanks } from './model/renderUtils'
import { Controller } from './Controller'

export class Game {
  context?: CanvasRenderingContext2D
  frameCb?: number
  lastTimestamp = 0
  private controller = new Controller()

  public loop(timestamp: number) {
    if (!this.context) {
      throw new Error("Can't find a context")
    }

    const delta = timestamp - this.lastTimestamp
    this.lastTimestamp = timestamp

    this.context.clearRect(0, 0, config.frameWidth, config.frameHeight) // Очистка холста

    updateAllTanks(this.controller.keysState, delta)
    renderAllTanks(this.context)
    renderAllDecoration(this.context)
    requestAnimationFrame(this.loop.bind(this))
  }

  public start(context: CanvasRenderingContext2D) {
    this.context = context
    this.frameCb = requestAnimationFrame(this.loop.bind(this))
  }

  public stop() {
    if (this.frameCb) {
      cancelAnimationFrame(this.frameCb)
    }
    this.controller.destroy()
  }
}
