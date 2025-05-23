import { useEffect, useRef } from 'react'

type ClickOutsideHandler = (event: MouseEvent | TouchEvent) => void

export const useClickOutside = <T extends HTMLElement = HTMLElement>(
  callback: ClickOutsideHandler
) => {
  const ref = useRef<T>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback(event)
      }
    }

    // Добавляем обработчики для mousedown и touchstart (для мобильных устройств)
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)

    return () => {
      // Убираем обработчики при размонтировании
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [callback])

  return ref
}
