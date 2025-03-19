import { useEffect, useRef } from 'react'
import styles from './game-page.module.pcss'
import { config } from '../../entities/game/config/gameConfig'
import { Game } from '../../entities/game/Game'

export function GamePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) {
      return
    }

    // Инициализируем игру
    const newGame = new Game(container)

    const context = canvas.getContext('2d')

    if (!context) {
      throw new Error("Can't find a 2D context for canvas")
    }

    newGame.start(context)

    return () => {
      newGame.stop()
    }
  }, [])

  return (
    <div ref={containerRef} className={styles.container}>
      <canvas
        ref={canvasRef}
        width={config.frameWidth}
        height={config.frameHeight}
      />
    </div>
  )
}
