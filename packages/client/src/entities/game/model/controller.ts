import { useEffect, useMemo } from 'react'
import { KeysState, MoveKeys } from '../types'

export function useController() {
  const keysState = useMemo<KeysState>(
    () => ({
      w: false,
      s: false,
      a: false,
      d: false,
    }),
    []
  )

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const currentKey = event.key.toLowerCase()
      const controlKeys = Object.keys(keysState)

      if (controlKeys.includes(currentKey)) {
        keysState[currentKey as MoveKeys] = true
      }
    }

    function handleKeyUp(event: KeyboardEvent) {
      const currentKey = event.key.toLowerCase()
      const controlKeys = Object.keys(keysState)

      if (controlKeys.includes(currentKey)) {
        keysState[currentKey as MoveKeys] = false
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    // Очистка при размонтировании
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [keysState])

  return { keysState }
}
