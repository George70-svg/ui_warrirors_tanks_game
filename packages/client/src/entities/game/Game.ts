import {
  deleteMarkedObjects,
  playerShotHandler,
  updateAllBullets,
  updateAllTanks,
} from './model/updateUtils'
import {
  config,
  initializeDecorationObjects,
  initializeTankObjects,
} from './config/gameConfig'
import { renderAllObjects } from './model/renderUtils'
import { Controller } from './Controller'
import { computerShot } from './model/ai'

export class Game {
  pageContext: HTMLDivElement
  context?: CanvasRenderingContext2D
  frameCb?: number
  lastTimestamp = 0
  private controller
  private boundLoop = this.loop.bind(this)

  constructor(pageContext: HTMLDivElement) {
    this.pageContext = pageContext
    this.controller = new Controller(this.pageContext)
  }

  public loop(timestamp: number) {
    if (!this.context) {
      throw new Error("Can't find a context")
    }

    const delta = timestamp - this.lastTimestamp
    this.lastTimestamp = timestamp

    this.context.clearRect(0, 0, config.frameWidth, config.frameHeight) // Очистка холста

    if (this.controller.shotClicked()) {
      playerShotHandler() // Обработка выстрелов игрока
    }
    computerShot() // Обработка выстрелов компьютера

    updateAllTanks(this.controller.keysState, delta) // Обновляем данные танков
    updateAllBullets(delta) // Обновляем данные пуль
    deleteMarkedObjects() // Единожды за кадр удаляем все отмеченные объекты
    renderAllObjects(this.context) // Рендерим все объекты на кадре

    this.frameCb = requestAnimationFrame(this.boundLoop)
  }

  public start(context: CanvasRenderingContext2D) {
    this.context = context
    initializeTankObjects(context)
    initializeDecorationObjects(context)
    this.frameCb = requestAnimationFrame(this.boundLoop)
  }

  public stop() {
    if (this.frameCb) {
      cancelAnimationFrame(this.frameCb)
    }
    this.controller.destroy()
  }
}
