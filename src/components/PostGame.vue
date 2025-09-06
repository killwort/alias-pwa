<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const props = defineProps({ game: Object })
</script>

<template>
  <h1>{{t('Title')}}</h1>
  <h2>{{t('FinalScores')}}</h2>
  <div v-for="(t,i) in props.game.currentGame.rules.teams" :key="i">
    {{t}}
    {{game.currentGame.gameScore(i)}}
  </div>
  <h2>{{t('Winner')}}</h2>
  <h2>{{ game.currentGame.rules.teams[game.currentGame.winningTeam] }}</h2>
  <div>
    <button @click="game.start(game.currentGame.rules)">{{t('NewGameLikeThis')}}</button>
  </div>
  <div>
    <button @click="game.reset()">{{t('NewGameSetup')}}</button>
  </div>
</template>

<style module>

</style>
<i18n>
{
  "ru": {
    "Title": "Конец игры",
    "FinalScores": "Финальный счёт",
    "Winner": "Победитель",
    "NewGameLikeThis": "Ещё игра с теми же командами",
    "NewGameSetup": "Вернуться в меню"
  }
}
</i18n>
