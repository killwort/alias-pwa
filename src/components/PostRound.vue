<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const props = defineProps({ game: Object })
</script>

<template>
  <h1>{{ t('Round', {round: props.game.currentGame.round, team: props.game.currentGame.rules.teams[props.game.currentGame.playingTeam]}) }}</h1>
  <div v-for="word in props.game.currentGame.currentRound" :key="word.word"><label>{{ word.word }} <input type="checkbox" v-model="word.isCorrect"/></label></div>
  <p>{{ t('Total', props.game.currentGame.roundScore(props.game.currentGame.currentRound)) }}</p>
  <button @click="props.game.currentGame.finalizeRound()">{{ t('NextRound') }}</button>
</template>

<style module>

</style>
<i18n>
{
  "ru": {
    "Round": "Итог раунда {round} для команды {team}",
    "NextRound": "Закончить раунд",
    "Total": "Итого {count} очков|Итого {count} очко|Итого {count} очка|Итого {count} очков"
  }
}
</i18n>
