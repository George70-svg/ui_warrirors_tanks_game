import React from 'react'
import { useFullscreen } from '../../hooks/useFullscreen'
import { Button } from 'antd'

export const FullscreenButton: React.FC = () => {
  const { isFullscreen, enterFullscreen, exitFullscreen } = useFullscreen()

  const handleFullscreen = () => {
    if (isFullscreen) {
      exitFullscreen()
    } else {
      enterFullscreen(document.documentElement)
    }
  }

  return (
    <Button color="danger" variant="filled" onClick={handleFullscreen}>
      {isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
    </Button>
  )
}
