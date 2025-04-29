import {
  config,
  toPixels,
  initializeTankObjects,
  initializeDecorationObjects,
} from './gameConfig'
import { Tank, TankProps } from '../objects/tank'
import { Decoration, DecorationProps } from '../objects/decoration'
import { getDecorations } from '../constants/decorations'

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
  let mockDecoration: Decoration
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

  const decorationProps: DecorationProps = {
    id: 'mock-decoration-id',
    context: mockContext,
    position: { x: 650, y: 350 },
    size: { width: 50, height: 50 },
    typeDecoration: 'brick',
    color: '#000',
    hasDeletable: true,
    imageSrc: 'brick-img.png',
  }

  beforeEach(() => {
    mockTank = new Tank(tankProps)
    mockDecoration = new Decoration(decorationProps)

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
      const decorations = getDecorations(mockContext)

      expect(decorations.length).toBeGreaterThan(1)
      expect(Decoration).toHaveBeenCalledWith(decorationProps)
    })
  })

  describe('initializeDecorationObjects()', () => {
    it('Должен заполнить объекты config.decoration правильными параметрами', () => {
      initializeDecorationObjects(mockContext)

      // Проверяем, что все фигуры и отдельные декорации добавлены
      expect(config.decorationObjects.length).toBeGreaterThan(0)

      // Проверяем, что хотя бы один элемент создан с правильными параметрами
      expect(Decoration).toHaveBeenCalledWith(
        expect.objectContaining(decorationProps)
      )
    })
  })
})
