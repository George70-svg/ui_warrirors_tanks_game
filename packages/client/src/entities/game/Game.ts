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
import { computerShot, computerTankGeneration } from './model/ai'
import { isGameOver } from './model/gameUtils'

type GameProps = {
  context: CanvasRenderingContext2D
  pageContext: HTMLDivElement
  onGameOver: () => void
}

export class Game {
  context: CanvasRenderingContext2D
  frameCb?: number
  lastTimestamp = 0
  private controller
  private boundLoop = this.loop.bind(this)
  onGameOver: () => void

  constructor(props: GameProps) {
    this.context = props.context
    this.controller = new Controller(props.pageContext)
    this.onGameOver = props.onGameOver
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
    computerTankGeneration(this.context) // Генерируем компьютерные танки
    deleteMarkedObjects() // Единожды за кадр удаляем все отмеченные объекты
    renderAllObjects(this.context) // Рендерим все объекты на кадре

    if (isGameOver()) {
      this.stop()
      this.onGameOver()
      return
    }

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
