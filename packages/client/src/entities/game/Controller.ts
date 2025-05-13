import { KeysCode, KeysCodeKeys, KeysCodeValues } from './types'

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
    const isDown = true
    window.addEventListener('keydown', this.toggleKeyState.bind(this, isDown))
    window.addEventListener('keyup', this.toggleKeyState.bind(this, !isDown))
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

  toggleKeyState(isDownKey = false, evt: KeyboardEvent) {
    const currentKeyCode = evt.code as KeysCodeKeys

    if (currentKeyCode in KeysCode) {
      const key: KeysCodeValues = KeysCode[currentKeyCode]

      if (Object.prototype.hasOwnProperty.call(this.keysState, key)) {
        this.keysState[key] = isDownKey
      }
    }
  }

  handleMouseDown() {
    this.mouseState.clicked = true
  }

  public destroy() {
    const isDownKey = false
    window.removeEventListener(
      'keydown',
      this.toggleKeyState.bind(this, isDownKey)
    )
    window.removeEventListener(
      'keyup',
      this.toggleKeyState.bind(this, isDownKey)
    )
    this.pageContent.removeEventListener(
      'mousedown',
      this.handleMouseDown.bind(this)
    )
  }
}
