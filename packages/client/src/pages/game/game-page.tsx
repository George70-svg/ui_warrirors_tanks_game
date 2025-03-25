import { useCallback, useEffect, useRef, useState } from 'react'
import { router } from '../../app/ui/routing/router'
import { ROUTES } from '../../shared/config'
import { config } from '../../entities/game/config/gameConfig'
import { Game } from '../../entities/game/Game'
import { EndGame } from './end-game'
import styles from './game-page.module.pcss'
import { GameModal } from './game-modal'
import { StartGame } from './start-game'

type GamePhase = 'start' | 'running' | 'end'
type State = { gamePhase: GamePhase }
type GamePhaseModalProps = { title: string; successText: string }

const getGamePhaseModalProps = (phase: GamePhase): GamePhaseModalProps => {
  if (phase === 'start') {
    return { title: 'Ready to play?', successText: 'Start' }
  } else if (phase === 'end') {
    return { title: 'Game Over', successText: 'Restart' }
  } else {
    return {} as GamePhaseModalProps
  }
}

export function GamePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [state, setState] = useState<State>(() => ({ gamePhase: 'start' }))
  const gameInstance = useRef<Game | null>(null)

  const { gamePhase } = state
  const isModalIOpen = gamePhase === 'start' || gamePhase === 'end'

  const startGame = useCallback(() => {
    gameInstance.current?.start()
    setState((prev) => ({ ...prev, gamePhase: 'running' }))
  }, [])

  const endGame = useCallback(() => {
    setState((prev) => ({ ...prev, gamePhase: 'end' }))
  }, [])

  const exitGame = useCallback(() => {
    router.navigate(ROUTES.HOME)
  }, [])

  useEffect(() => {
    const context = canvasRef.current?.getContext('2d')
    const pageContext = containerRef.current

    if (!context || !pageContext) {
      throw new Error('Not find canvas context or page context')
    }

    gameInstance.current = new Game({
      context: context,
      pageContext: pageContext,
      onGameOver: endGame,
    })

    return () => {
      gameInstance.current?.stop()
    }
  }, [endGame])

  return (
    <div ref={containerRef} className={styles.container}>
      <GameModal
        modalOpen={isModalIOpen}
        cancelText="Exit"
        successAction={startGame}
        cancelAction={exitGame}
        {...getGamePhaseModalProps(gamePhase)}
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
