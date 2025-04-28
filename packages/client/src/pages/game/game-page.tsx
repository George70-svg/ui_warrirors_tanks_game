import { useCallback, useEffect, useRef, useState } from 'react'
import { ROUTES } from '../../shared/config'
import { config } from '../../entities/game/config/gameConfig'
import { Game } from '../../entities/game/Game'
import { EndGame } from './end-game'
import styles from './game-page.module.pcss'
import { GameModal } from './game-modal'
import { StartGame } from './start-game'
import { Typography } from 'antd'
import { useNavigate } from 'react-router-dom'

type GamePhase = 'start' | 'running' | 'end'
type State = { gamePhase: GamePhase; score: number }
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

const { Title } = Typography

export function GamePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [state, setState] = useState<State>(() => ({
    gamePhase: 'start',
    score: 0,
  }))
  const gameInstance = useRef<Game | null>(null)
  const navigate = useNavigate()

  const { gamePhase } = state
  const isModalIOpen = gamePhase === 'start' || gamePhase === 'end'

  const startGame = useCallback(() => {
    gameInstance.current?.start()
    setState((prev) => ({ ...prev, gamePhase: 'running', score: 0 }))
  }, [])

  const endGame = useCallback(() => {
    setState((prev) => ({ ...prev, gamePhase: 'end' }))
  }, [])

  const exitGame = useCallback(() => {
    navigate(ROUTES.HOME)
  }, [navigate])

  const setScorePoint = useCallback((value: number) => {
    setState((prev) => ({ ...prev, score: prev.score + value }))
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
      setScorePoint: setScorePoint,
    })

    return () => {
      gameInstance.current?.stop()
    }
  }, [setScorePoint, endGame])

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
        {gamePhase === 'end' && <EndGame score={state.score} />}
      </GameModal>

      <Title>Score: {state.score}</Title>

      <canvas
        ref={canvasRef}
        width={config.frameWidth}
        height={config.frameHeight}
      />
    </div>
  )
}
