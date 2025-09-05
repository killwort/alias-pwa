export default class GameState {
  constructor () {
    const savedState = JSON.parse(localStorage.getItem('gameState')) || {}
    this.currentGame = savedState.currentGame
  }

  save () {
    localStorage.setItem('gameState', JSON.stringify({ currentGame: this.currentGame }))
  }
}
const instance = new GameState()
export { instance }
