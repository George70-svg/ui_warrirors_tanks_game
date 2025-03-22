import { useEffect, useRef, useState } from 'react'
import { router } from '../../app/ui/routing/router'
import { ROUTES } from '../../shared/config'
import { config } from '../../entities/game/config/gameConfig'
import { Game } from '../../entities/game/Game'
import { GameModal } from './game-modal'
import { StartGame } from './start-game'
import { EndGame } from './end-game'
import styles from './game-page.module.pcss'

export function GamePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [gamePhase, setGamePhase] = useState<'start' | 'running' | 'end'>(
    'start'
  )
  const [gameInstance, setGameInstance] = useState<Game | null>(null)
  let modalContent = null
  let isModalIOpen = false

  function startGame() {
    const container = containerRef.current

    if (container) {
      setGameInstance(new Game({ pageContext: container, onGameOver: endGame }))
      setGamePhase('running')
    }
  }

  function endGame() {
    console.log('endGame')
    setGamePhase('end')
  }

  function restartGame() {
    if (gameInstance) gameInstance.stop()
    startGame()
  }

  function exitGame() {
    if (gameInstance) gameInstance.stop()
    isModalIOpen = false
    router.navigate(ROUTES.HOME)
  }

  if (gamePhase === 'start') {
    isModalIOpen = true
    modalContent = (
      <StartGame startGameHandler={startGame} exitGame={exitGame} />
    )
  } else if (gamePhase === 'end') {
    isModalIOpen = true
    modalContent = <EndGame restartGame={restartGame} exitGame={exitGame} />
  }

  useEffect(() => {
    const context = canvasRef.current?.getContext('2d')

    if (gameInstance && context) {
      gameInstance.start(context)
    }

    return () => {
      if (gameInstance) {
        console.log('stop')
        gameInstance.stop()
      }
    }
  }, [gameInstance])

  return (
    <div ref={containerRef} className={styles.container}>
      <GameModal modalOpen={isModalIOpen}>{modalContent}</GameModal>

      <canvas
        ref={canvasRef}
        width={config.frameWidth}
        height={config.frameHeight}
      />
    </div>
  )
}
