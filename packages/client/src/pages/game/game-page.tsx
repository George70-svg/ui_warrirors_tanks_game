import { useEffect, useRef, useState } from 'react'
import styles from './game-page.module.pcss'
import { config } from '../../entities/game/config/gameConfig'
import { Game } from '../../entities/game/Game'
import { router } from '../../app/ui/routing/router'
import { ROUTES } from '../../shared/config'
import { GameModal } from './game-modal'
import { StartGame } from './start-game'
import { EndGame } from './end-game'

type GamePhase = 'start' | 'running' | 'end'

type State = {
  gamePhase: GamePhase
}

export function GamePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const gameInstance = useRef<Game | null>(null)
  const [state, setState] = useState<State>(() => ({ gamePhase: 'start' }))

  const { gamePhase } = state
  const isModalIOpen = gamePhase === 'start' || gamePhase === 'end'

  const startGame = () => {
    gameInstance.current?.start()
    setState((prev) => ({ ...prev, gamePhase: 'start' }))
  }

  const exitGame = () => {
    router.navigate(ROUTES.HOME)
  }

  useEffect(() => {
    const context = canvasRef.current?.getContext('2d')
    const container = containerRef.current

    if (!context || !container) {
      throw new Error('Error')
    }

    gameInstance.current = new Game({
      pageContext: container,
      context,
      onGameOver: () => {
        setState((prev) => ({ ...prev, gamePhase: 'end' }))
      },
    })

    return () => {
      gameInstance.current?.stop()
    }
  }, [])

  return (
    <div ref={containerRef} className={styles.container}>
      <GameModal
        open={isModalIOpen}
        onAccept={startGame}
        onDismiss={exitGame}
        acceptText={gamePhase === 'end' ? 'Restart' : 'Start'}
        dismissText="Exit"
        header={gamePhase === 'end' ? 'Game Over' : 'Start playing'}
      >
        {gamePhase === 'start' && <StartGame />}
        {gamePhase === 'end' && <EndGame />}
      </GameModal>

      <canvas
        ref={canvasRef}
        width={config.frameWidth}
        height={config.frameHeight}
      />
    </div>
  )
}
