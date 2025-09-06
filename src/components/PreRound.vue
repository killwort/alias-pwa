<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const props = defineProps({ game: Object })
</script>

<template>
  <h1>{{ t('Round', {round:props.game.currentGame.round}) }}</h1>
  <h2>{{ t('PrepareTeam', {team:props.game.currentGame.rules.teams[props.game.currentGame.playingTeam]}) }}</h2>
  <div v-for="(t,i) in props.game.currentGame.rules.teams" :key="i">
    {{t}}
    {{game.currentGame.gameScore(i)}}
  </div>
  <button @click="game.currentGame.startRound()">{{t('Готовы, начинаем')}}</button>
</template>

<style scoped>

</style>
<i18n>
{
  "ru": {
    "Round": "Раунд {round}",
    "PrepareTeam": "Команда {team} приготовиться!"
  }
}
</i18n>
