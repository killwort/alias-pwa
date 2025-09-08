import wordlists from '@/wordlists'
import { i18n } from '@/main'

export default class {
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
    const locLists = wordlists[i18n.global.locale.value]
    let wl
    if (this.rules.list.length === 1) {
      wl = await locLists[this.rules.list[0]]
    } else if (!this.rules.alternateWordChoice) {
      return await this.nextWordFromAllLists()
    } else {
      wl = await locLists[this.rules.list[Math.floor(Math.random() * this.rules.list.length)]]
    }
    let candidate
    let t = 5
    do {
      candidate = wl[Math.floor(Math.random() * wl.length)]
    } while (this.parent.usedWords[candidate] && t-- > 0)
    this.parent.usedWords[candidate] = 1
    return candidate
  }

  async nextWordFromAllLists () {
    const allLists = await Promise.all(this.rules.list.map(l => wordlists[i18n.global.locale.value][l]))
    const totalLength = allLists.reduce((sum, l) => sum + l.length, 0)
    let candidate
    let t = 5
    do {
      let num = Math.floor(Math.random() * totalLength)
      let i = 0
      while (num >= allLists[i].length) {
        num -= allLists[i].length
        i++
      }
      candidate = allLists[i][num]
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
      if (this.roundSecondsLeft <= 0) {
        this.state = 'PostRound'
      } else {
        this.currentWord = await this.nextWord()
      }
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
      if (this.rounds[r].length > teamNumber) {
        sum += this.roundScore(this.rounds[r][teamNumber])
      }
    }
    return sum
  }
}
