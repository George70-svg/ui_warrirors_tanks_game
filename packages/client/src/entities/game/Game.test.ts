import { Game } from './Game'
import {
  config,
  initializeTankObjects,
  initializeDecorationObjects,
} from './config/gameConfig'
import { Controller } from './Controller'
import { isGameOver } from './model/gameUtils'
import {
  deleteMarkedObjects,
  playerShotHandler,
  updateAllBullets,
  updateAllTanks,
} from './model/updateUtils'
import { renderAllObjects } from './model/renderUtils'
import { computerShot, computerTankGeneration } from './model/ai'

// Мокаем все зависимости
jest.mock('../../assets/images/tank.png', () => 'tank-mock')
jest.mock('../../assets/images/computer-tank.png', () => 'tank-computer-mock')
jest.mock('../../assets/images/brick.png', () => 'brick-mock')
jest.mock('../../assets/images/metal.png', () => 'metal-mock')

jest.mock('./config/gameConfig')
jest.mock('./model/updateUtils')
jest.mock('./model/renderUtils')
jest.mock('./model/ai')
jest.mock('./model/gameUtils')
jest.mock('./Controller')

describe('Game', () => {
  let game: Game
  const mockContext = {
    clearRect: jest.fn(),
  } as unknown as CanvasRenderingContext2D
  const mockPageContext = document.createElement('div')
  const mockOnGameOver = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    game = new Game({
      context: mockContext,
      pageContext: mockPageContext,
      onGameOver: mockOnGameOver,
    })
    ;(isGameOver as jest.Mock).mockReturnValue(false)

    // Мокаем Controller.prototype
    Controller.prototype.destroy as jest.Mock
    ;(Controller.prototype.shotClicked as jest.Mock).mockReturnValue(false)

    // Мокаем animationFrame
    jest.useFakeTimers()

    let callbacks: FrameRequestCallback[] = []
    let lastId = 0

    global.requestAnimationFrame = jest.fn((cb) => {
      callbacks.push(cb)
      return ++lastId
    })

    global.cancelAnimationFrame = jest.fn((id) => {
      callbacks = callbacks.filter((_, index) => index + 1 !== id)
    })
  })

  describe('start()', () => {
    it('Должны инициализироваться танки и декорации', () => {
      game.start()
      expect(initializeTankObjects).toHaveBeenCalledWith(mockContext)
      expect(initializeDecorationObjects).toHaveBeenCalledWith(mockContext)
      expect(requestAnimationFrame).toHaveBeenCalled()
      expect(requestAnimationFrame).toHaveBeenCalledWith(expect.any(Function))
    })
  })

  describe('loop()', () => {
    it('Должны обновляться и рендериться игровые объекты', () => {
      game.start()
      game.loop(3000)

      expect(mockContext.clearRect).toHaveBeenCalledWith(
        0,
        0,
        config.frameWidth,
        config.frameHeight
      )
      expect(updateAllTanks).toHaveBeenCalled()
      expect(updateAllBullets).toHaveBeenCalled()
      expect(computerTankGeneration).toHaveBeenCalledWith(mockContext)
      expect(deleteMarkedObjects).toHaveBeenCalled()
      expect(renderAllObjects).toHaveBeenCalledWith(mockContext)
    })

    it('Должен стрелять танк врага', () => {
      game.start()
      game.loop(1000)

      expect(computerShot).toHaveBeenCalled()
    })

    it('Не должен выстрелить танк игрока', () => {
      game.start()
      game.loop(1000)

      expect(playerShotHandler).not.toHaveBeenCalled()
    })

    it('Должен выстрелить танк игрока', () => {
      game.start()
      ;(Controller.prototype.shotClicked as jest.Mock)
        .mockReturnValueOnce(true)
        .mockReturnValueOnce(false)

      game.loop(1000)
      expect(playerShotHandler).toHaveBeenCalledTimes(1)

      game.loop(3000)
      expect(playerShotHandler).toHaveBeenCalledTimes(1)
    })

    it('Должна остановиться игра, если игра окончена', () => {
      ;(isGameOver as jest.Mock).mockReturnValue(true)
      game.start()
      game.loop(1000)

      expect(mockOnGameOver).toHaveBeenCalled()
      expect(cancelAnimationFrame).toHaveBeenCalled()
    })
  })

  describe('stop()', () => {
    it('Должен сброситься AnimationFrame и удалиться controller', () => {
      game.start()
      game.stop()

      expect(cancelAnimationFrame).toHaveBeenCalled()
      expect(Controller.prototype.destroy).toHaveBeenCalled()
    })
  })
})
