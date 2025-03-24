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
import { Controller } from './Controller'
import { computerShot } from './model/ai'
import { renderAllObjects } from './model/renderUtils'

type GameProps = {
  pageContext: HTMLDivElement
  context: CanvasRenderingContext2D
  onGameOver: () => void
}

export class Game {
  context: CanvasRenderingContext2D
  frameCb?: number
  lastTimestamp = 0
  private controller
  private boundLoop = this.loop.bind(this)
  private onGameOver

  constructor({ context, pageContext, onGameOver }: GameProps) {
    this.controller = new Controller(pageContext)
    this.onGameOver = onGameOver
    this.context = context
  }

  public loop(timestamp: number) {
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

  public start() {
    initializeTankObjects(this.context)
    initializeDecorationObjects(this.context)
    this.frameCb = requestAnimationFrame(this.boundLoop)
  }

  public stop() {
    if (this.frameCb) {
      cancelAnimationFrame(this.frameCb)
    }
    this.controller.destroy()
  }
}
