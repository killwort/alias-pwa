import wordlists from '@/wordlists'
import { i18n } from '@/main.js'
import Game from '@/game'

export default class {
  constructor () {
    const savedState = JSON.parse(localStorage.getItem('gameState')) || {}
    this.currentGame = savedState.currentGame ? new Game(this, false, savedState.currentGame) : null
    this.rules = Object.assign(
      {
        listLanguage: i18n.global.locale.value,
        list: [Object.keys(wordlists[i18n.global.locale.value])[0]],
        alternateWordChoice: true,
        fines: false,
        lastWordUnlimited: true,
        lastWordAllTeams: false,
        time: 120,
        targetScore: 50
      }, savedState.rules || {})
    if (savedState.rules && savedState.rules.listLanguage !== i18n.global.locale.value) {
      this.rules.list = [Object.keys(wordlists[i18n.global.locale.value])[0]]
    }
    if (typeof this.rules.list === 'string') { this.rules.list = [this.rules.list] }
    this.usedWords = savedState.usedWords || []
  }

  resetUsedWords () {
    this.usedWords = []
    this.save()
  }

  save () {
    const cg = this.currentGame ? Object.assign({}, this.currentGame) : null
    if (cg) delete cg.parent
    localStorage.setItem('gameState', JSON.stringify({ currentGame: cg, rules: this.rules, usedWords: this.usedWords }))
  }

  start (rules) {
    this.rules = Object.assign({}, rules)
    delete this.rules.teams
    this.currentGame = new Game(this, true, rules)
    this.save()
  }

  reset () {
    this.currentGame = null
    this.save()
  }
}
