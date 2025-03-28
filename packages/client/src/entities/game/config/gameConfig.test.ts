import {
  config,
  toPixels,
  initializeTankObjects,
  initializeDecorationObjects,
  createDecorationFigure,
} from './gameConfig'
import { Tank, TankProps } from '../objects/tank'
import { Decoration } from '../objects/decoration'
import { Coordinate } from '../types'

Object.defineProperty(globalThis, 'crypto', {
  value: {
    randomUUID: () => 'mocked-uuid',
  },
})

// Мокаем зависимости
jest.mock('../../../assets/images/tank.png', () => 'tank-mock')
jest.mock('../../../assets/images/brick.png', () => 'brick-mock')
jest.mock('../../../assets/images/metal.png', () => 'metal-mock')
jest.mock('../objects/tank')
jest.mock('../objects/decoration')

describe('gameConfig', () => {
  let mockTank: Tank
  const mockContext = {
    clearRect: jest.fn(),
  } as unknown as CanvasRenderingContext2D
  const tankProps: TankProps = {
    id: 'mocked-uuid',
    context: mockContext,
    startPosition: { x: 650, y: 350 }, // toPixels(13), toPixels(7)
    direction: 'up',
    speed: 0.15,
    size: { width: 50, height: 64 },
    imageSrc: expect.any(String),
    healthPoint: 150,
    bulletColor: '#00e413',
  }

  beforeEach(() => {
    mockTank = new Tank(tankProps)

    // Очищаем конфиг перед каждым тестом
    config.tankObjects = []
    config.decorationObjects = []
    config.bulletObjects = []
  })

  describe('config', () => {
    it('Должен корректно инициализировать значения конфига', () => {
      expect(config.frameWidth).toBe(50 * 27) // CELL_SIZE * 27
      expect(config.frameHeight).toBe(50 * 14) // CELL_SIZE * 14
      expect(config.tankObjects).toEqual([])
      expect(config.decorationObjects).toEqual([])
      expect(config.bulletObjects).toEqual([])
    })
  })

  describe('toPixels()', () => {
    it('Должен конвертировть ячейки сетки в пиксели', () => {
      expect(toPixels(2)).toBe(100) // 2 * CELL_SIZE
      expect(toPixels(0)).toBe(0)
    })
  })

  describe('initializeTankObjects()', () => {
    it('Должен добавить танк в config.tankObjects', () => {
      initializeTankObjects(mockContext)

      expect(config.tankObjects).toHaveLength(1)
      expect(Tank).toHaveBeenCalledWith({
        id: 'mocked-uuid',
        context: mockContext,
        startPosition: { x: 650, y: 350 }, // toPixels(13), toPixels(7)
        direction: 'up',
        speed: 0.15,
        size: { width: 50, height: 64 },
        imageSrc: expect.any(String),
        healthPoint: 150,
        bulletColor: '#00e413',
      })
    })
  })

  describe('createDecorationFigure()', () => {
    it('Должен создать декорации', () => {
      const coords: Coordinate[] = [{ x: 1, y: 2 }]
      const decorations = createDecorationFigure(
        coords,
        mockContext,
        'brick',
        true,
        'brick-img.png'
      )

      expect(decorations).toHaveLength(1)
      expect(Decoration).toHaveBeenCalledWith({
        id: 'mocked-uuid',
        context: mockContext,
        position: { x: 50, y: 100 }, // toPixels(1), toPixels(2)
        size: { width: 50, height: 50 }, // toPixels(1)
        typeDecoration: 'brick',
        hasDeletable: true,
        imageSrc: 'brick-img.png',
      })
    })
  })

  describe('initializeDecorationObjects()', () => {
    it('Должен заполнить объекты config.decoration правильными параметрами', () => {
      initializeDecorationObjects(mockContext)

      // Проверяем, что все фигуры и отдельные декорации добавлены
      expect(config.decorationObjects.length).toBeGreaterThan(0)

      // Проверяем, что хотя бы один элемент создан с правильными параметрами
      expect(Decoration).toHaveBeenCalledWith(
        expect.objectContaining({
          position: { x: 150, y: 150 }, // toPixels(3), toPixels(3)
          color: '#46efe9',
          hasDeletable: false,
        })
      )
    })
  })
})
