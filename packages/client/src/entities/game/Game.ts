import { shot, updateAllBullets, updateAllTanks } from './model/updateUtils'
import {
  config,
  initializeDecorationObjects,
  initializeTankObjects,
} from './config/gameConfig'
import { renderAllObjects } from './model/renderUtils'
import { Controller } from './Controller'

export class Game {
  canvas?: HTMLCanvasElement | null
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

    if (this.controller.wasMouseClicked()) {
      shot()
    }

    updateAllTanks(this.controller.keysState, delta)
    updateAllBullets(delta)
    renderAllObjects(this.context)
    this.frameCb = requestAnimationFrame(this.loop.bind(this))
  }

  public start(context: CanvasRenderingContext2D) {
    this.context = context
    initializeTankObjects(context)
    initializeDecorationObjects(context)
    this.frameCb = requestAnimationFrame(this.loop.bind(this))
  }

  public stop() {
    if (this.frameCb) {
      cancelAnimationFrame(this.frameCb)
    }
    this.controller.destroy()
  }
}
