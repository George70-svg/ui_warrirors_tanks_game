import { useEffect, useRef } from 'react'
import './game-page.pcss'
import { useGameLoop } from '../../entities/game/model/gameLoop'
import { config } from '../../entities/game/config/gameConfig'

export function GamePage() {
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const { loop } = useGameLoop(ctxRef)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    ctxRef.current = canvas.getContext('2d')
    const id = requestAnimationFrame(loop)

    // Cleaner после unmount
    return () => {
      cancelAnimationFrame(id)
    }
  }, [loop])

  return (
    <div className="canvas-container">
      <canvas
        ref={canvasRef}
        width={config.frameWidth}
        height={config.frameHeight}
      />
    </div>
  )
}
