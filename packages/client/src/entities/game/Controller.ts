import { Keys, KeysCode } from './types'

export class Controller {
  private _keysState = {
    w: false,
    a: false,
    s: false,
    d: false,
    space: false,
  }

  private _mouseState = {
    clicked: false,
  }

  private pageContent: HTMLDivElement

  constructor(pageContext: HTMLDivElement) {
    this.pageContent = pageContext
    window.addEventListener('keydown', this.handleKeyDown.bind(this))
    window.addEventListener('keyup', this.handleKeyUp.bind(this))
    this.pageContent.addEventListener(
      'mousedown',
      this.handleMouseDown.bind(this)
    )
  }

  get keysState() {
    return this._keysState
  }

  get mouseState() {
    return this._mouseState
  }

  public shotClicked(): boolean {
    if (this.mouseState.clicked) {
      this.mouseState.clicked = false
      return true
    }

    if (this.keysState.space) {
      this.keysState.space = false
      return true
    }

    return false
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

  handleMouseDown() {
    this.mouseState.clicked = true
  }

  public destroy() {
    window.removeEventListener('keydown', this.handleKeyDown.bind(this))
    window.removeEventListener('keyup', this.handleKeyUp.bind(this))
    this.pageContent.removeEventListener(
      'mousedown',
      this.handleMouseDown.bind(this)
    )
  }
}
