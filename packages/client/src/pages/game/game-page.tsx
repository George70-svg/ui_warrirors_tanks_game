import { useEffect, useRef, useState } from 'react'
import styles from './game-page.module.pcss'
import { config } from '../../entities/game/config/gameConfig'
import { Game } from '../../entities/game/Game'

export function GamePage() {
  const gamePage = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [game, setGame] = useState<Game | null>(null)

  useEffect(() => {
    if (!gamePage.current) return

    // Инициализирую игру с привязкой к странице
    const newGame = new Game(gamePage.current)
    setGame(newGame)

    return () => {
      newGame.stop()
    }
  }, [])

  useEffect(() => {
    if (!game || !canvasRef.current) {
      return
    }

    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')

    if (!canvas || !context) {
      throw new Error("Can't find a canvas context")
    }

    game.start(context)

    // Cleaner после unmount
    return () => {
      game.stop()
    }
  }, [game])

  return (
    <div ref={gamePage} className={styles.container}>
      <canvas
        ref={canvasRef}
        width={config.frameWidth}
        height={config.frameHeight}
      />
    </div>
  )
}
