import { config } from '../config/gameConfig'

export function isGameOver() {
  const tankPlayer = config.tankObjects.find((tank) => tank.type === 'player')

  if (!tankPlayer) {
    return true
  }
}
