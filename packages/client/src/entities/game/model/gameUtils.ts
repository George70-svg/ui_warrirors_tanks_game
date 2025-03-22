import { config } from '../config/gameConfig'

export function isGameOver() {
  const tankPlayer = config.tankObjects.find((tank) => tank.type === 'player')

  if (!tankPlayer) {
    return true
  }
}

export function addScorePoint(score: number) {
  config.score += score
}
