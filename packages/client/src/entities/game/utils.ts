import { CELL_SIZE } from './constants'

export function toPixels(size: number): number {
  return size * CELL_SIZE
}
