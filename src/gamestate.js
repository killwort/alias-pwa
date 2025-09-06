import wordlists from '@/wordlists'
class Game {
  constructor (state, isNew, options) {
    this.parent = state
    if (isNew) {
      this.rules = options
      this.rounds = [[]]
      this.state = 'PreRound'
      this.currentRound = []
    } else {
      Object.assign(this, options)
    }
  }

  get round () {
    return this.rounds.length
  }

  get playingTeam () {
    return this.rounds[this.rounds.length - 1].length
  }

  get roundSecondsLeft () {
    if (this.state === 'InRound') {
      const elapsedSeconds = new Date().getTime() / 1000 - this.roundStart
      if (elapsedSeconds > this.rules.time) return 0
      return this.rules.time - elapsedSeconds
    }
    return 0
  }

  get roundTimeLeft () {
    if (this.state === 'InRound') {
      const leftSeconds = this.roundSecondsLeft
      return Math.floor(leftSeconds / 60).toString().padStart(2, '0') + ':' + (Math.round(leftSeconds) % 60).toString().padStart(2, '0')
    }
    return ''
  }

  async startRound () {
    this.currentRound = []
    this.state = 'InRound'
    this.roundStart = new Date().getTime() / 1000
    this.currentWord = await this.nextWord()
    this.parent.save()
  }

  async nextWord () {
    const wl = await wordlists[this.parent.locale][this.rules.list]
    let candidate
    let t = 5
    do {
      candidate = wl[Math.floor(Math.random() * wl.length)]
    } while (this.parent.usedWords[candidate] && t-- > 0)
    this.parent.usedWords[candidate] = 1
    return candidate
  }

  async record (isCorrect) {
    this.currentRound.push({
      word: this.currentWord,
      isCorrect: isCorrect
    })
    if (this.state === 'InRound') {
      if (this.roundSecondsLeft <= 0) { this.state = 'PostRound' } else { this.currentWord = await this.nextWord() }
    }
    this.parent.save()
  }

  checkTimer () {
    if (this.state === 'InRound' && !this.rules.lastWordUnlimited && this.roundSecondsLeft <= 0) {
      this.state = 'PostRound'
    }
  }

  finalizeRound () {
    const isFullRound = this.playingTeam === this.rules.teams.length - 1
    this.rounds[this.rounds.length - 1].push(this.currentRound)
    if (isFullRound) {
      const teamScores = []
      for (let t = 0; t < this.rules.teams.length; t++) {
        teamScores.push({ team: t, score: this.gameScore(t) })
      }
      teamScores.sort((a, b) => b.score - a.score)
      if (teamScores[0].score >= this.rules.targetScore && teamScores[0].score !== teamScores[1].score) {
        this.state = 'PostGame'
        this.winningTeam = teamScores[0].team
        this.parent.save()
        return
      }
      this.rounds.push([])
    }
    this.state = 'PreRound'
    this.parent.save()
  }

  roundScore (round) {
    let sum = 0
    for (let i = 0; i < round.length; i++) {
      if (round[i].isCorrect) sum++
      else if (this.rules.fines) sum--
    }
    return sum
  }

  gameScore (teamNumber) {
    let sum = 0
    for (let r = 0; r < this.rounds.length; r++) {
      if (this.rounds[r].length > teamNumber) { sum += this.roundScore(this.rounds[r][teamNumber]) }
    }
    return sum
  }
}
export default class GameState {
  constructor (locale) {
    const savedState = JSON.parse(localStorage.getItem('gameState')) || {}
    this.locale = locale
    this.currentGame = savedState.currentGame ? new Game(this, false, savedState.currentGame) : null
    this.rules = Object.assign(
      {
        list: Object.keys(wordlists[locale])[0],
        fines: false,
        lastWordUnlimited: true,
        lastWordAllTeams: false,
        time: 120,
        targetScore: 50
      }, savedState.rules || {})
    this.usedWords = savedState.usedWords || []
  }

  save () {
    const cg = this.currentGame ? Object.assign({}, this.currentGame) : null
    if (cg) delete cg.parent
    localStorage.setItem('gameState', JSON.stringify({ currentGame: cg, rules: this.rules, usedWords: this.usedWords }))
  }

  start (rules) {
    this.rules = Object.assign({}, rules.value)
    delete this.rules.teams
    this.currentGame = new Game(this, true, rules)
    this.save()
  }

  reset () {
    this.currentGame = null
    this.save()
  }
}
