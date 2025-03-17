import { useEffect, useRef, useState } from 'react'
import styles from './game-page.module.pcss'
import { config } from '../../entities/game/config/gameConfig'
import { Game } from '../../entities/game/Game'

export function GamePage() {
  const [game] = useState(() => new Game())
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
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
    <div className={styles.container}>
      <canvas
        ref={canvasRef}
        width={config.frameWidth}
        height={config.frameHeight}
      />
    </div>
  )
}
