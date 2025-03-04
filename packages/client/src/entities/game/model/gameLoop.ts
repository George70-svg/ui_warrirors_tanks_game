import { useRef } from 'react'
import { useController } from './controller'
import { config } from '../config/gameConfig'
import { updateAllTanks } from './updateUtils'
import { renderAllDecoration, renderAllTanks } from './renderUtils'

export function useGameLoop(
  ctxRef: React.RefObject<CanvasRenderingContext2D | null>
) {
  const { keysState } = useController()
  const lastTimeRef = useRef<number>(0)

  function loop(timestamp: number) {
    const ctx = ctxRef.current
    if (!ctx) return

    // Расчёт времени, который прошёл между двумя кадрами анимации (вызовами requestAnimationFrame)
    // Нужен для стабилизации анимации
    const delta = timestamp - lastTimeRef.current
    lastTimeRef.current = timestamp

    ctx.clearRect(0, 0, config.frameWidth, config.frameHeight) // Очистка холста

    updateAllTanks(keysState, delta)
    renderAllTanks(ctx)
    renderAllDecoration(ctx)

    requestAnimationFrame(loop)
  }

  return { loop }
}
