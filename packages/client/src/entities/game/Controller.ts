import { Keys, KeysCode } from './types'

export class Controller {
  private _keysState = {
    w: false,
    a: false,
    s: false,
    d: false,
  }

  constructor() {
    window.addEventListener('keydown', this.handleKeyDown.bind(this))
    window.addEventListener('keyup', this.handleKeyUp.bind(this))
  }

  get keysState() {
    return this._keysState
  }

  handleKeyDown(event: KeyboardEvent) {
    const currentKeyCode = event.code

    if (currentKeyCode in KeysCode) {
      const key = KeysCode[currentKeyCode as keyof typeof KeysCode]

      if (Object.prototype.hasOwnProperty.call(this.keysState, key)) {
        this.keysState[key as Keys] = true
      }
    }
  }

  handleKeyUp(event: KeyboardEvent) {
    const currentKeyCode = event.code

    if (currentKeyCode in KeysCode) {
      const key = KeysCode[currentKeyCode as keyof typeof KeysCode]

      if (Object.prototype.hasOwnProperty.call(this.keysState, key)) {
        this.keysState[key as Keys] = false
      }
    }
  }

  public destroy() {
    window.removeEventListener('keydown', this.handleKeyDown)
    window.removeEventListener('keyup', this.handleKeyUp)
  }
}
